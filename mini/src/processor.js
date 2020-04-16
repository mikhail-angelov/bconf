const VIDEO_CONSTRAINS = {
  low: {
    width: { ideal: 320 },
    aspectRatio: 1.334,
  },
  medium: {
    width: { ideal: 640 },
    aspectRatio: 1.334,
  },
  high: {
    width: { ideal: 1280 },
    aspectRatio: 1.334,
  },
  veryhigh: {
    width: { ideal: 1920 },
    aspectRatio: 1.334,
  },
  ultra: {
    width: { ideal: 3840 },
    aspectRatio: 1.334,
  },
}

export const processor = (store) => {
  let localStream = null
  let clientId = null
  let device = null
  let producerTransport = null
  let videoProducer = null
  let audioProducer = null
  let consumerTransport = null
  let videoConsumers = {}
  let audioConsumers = {}
  let audioDevices = {}
  let webcams = {}
  let muted = false

  store.onStart = async () => {
    await startMedia()
    connect()
  }
  store.onStop = () => {
    stopMedia()
    disconnect()
  }
  store.toggleMute = () => {
    if (muted) {
      unmuteMic()
      muted = false
    } else {
      muteMic()
      muted = true
    }
  }
  store.toggleCamera = () => {
    if (videoProducer) {
      disableWebcam()
    } else {
      enableWebcam()
    }
  }

  // ---- TODO ----
  //  DONE - audio track
  //  - multiple rooms
  //    - server prepareroom, use room, cleanup, newproducer
  //    - client roomID, prepareroom

  // =========== socket.io ==========
  let socket = null

  // return Promise
  function connectSocket() {
    if (socket) {
      socket.close()
      socket = null
      clientId = null
    }

    return new Promise((resolve, reject) => {
      socket = io.connect('/')

      socket.on('connect', async function (evt) {
        //console.log('socket.io connected()');

        // --- prepare room ---
        const roomName = getRoomName()
        console.log('socket.io connected(). prepare room=%s', roomName)
        await sendRequest('prepare_room', { roomId: roomName })
      })
      socket.on('error', function (err) {
        console.error('socket.io ERROR:', err)
        reject(err)
      })
      socket.on('disconnect', function (evt) {
        console.log('socket.io disconnect:', evt)
      })
      socket.on('message', function (message) {
        console.log('socket.io message:', message)
        if (message.type === 'welcome') {
          if (socket.id !== message.id) {
            console.error('WARN: something wrong with clientID', socket.io, message.id)
          }

          clientId = message.id
          console.log('connected to server. clientId=' + clientId)

          resolve()
        } else {
          console.error('UNKNOWN message from server:', message)
        }
      })
      socket.on('newProducer', function (message) {
        console.log('socket.io newProducer:', message)
        const remoteId = message.socketId
        const prdId = message.producerId
        const kind = message.kind
        if (kind === 'video') {
          console.log('--try consumeAdd remoteId=' + remoteId + ', prdId=' + prdId + ', kind=' + kind)
          consumeAdd(consumerTransport, remoteId, prdId, kind)
        } else if (kind === 'audio') {
          //console.error('-- audio NOT SUPPORTED YET. skip remoteId=' + remoteId + ', prdId=' + prdId + ', kind=' + kind);
          console.log('--try consumeAdd remoteId=' + remoteId + ', prdId=' + prdId + ', kind=' + kind)
          consumeAdd(consumerTransport, remoteId, prdId, kind)
        }
      })

      socket.on('producerClosed', function (message) {
        console.log('socket.io producerClosed:', message)
        const localId = message.localId
        const remoteId = message.remoteId
        const kind = message.kind
        console.log('--try removeConsumer remoteId=%s, localId=%s, track=%s', remoteId, localId, kind)
        removeConsumer(remoteId, kind)
        if (kind === 'video') {
          removeRemoteVideo(remoteId)
        }
      })
    })
  }

  function disconnectSocket() {
    if (socket) {
      socket.close()
      socket = null
      clientId = null
      console.log('socket.io closed..')
    }
  }

  function isSocketConnected() {
    if (socket) {
      return true
    } else {
      return false
    }
  }

  function timeoutCallback(callback) {
    let called = false

    const interval = setTimeout(() => {
      if (called) return
      called = true
      callback(new Error('Request timeout.'))
    }, 300000)

    return (...args) => {
      if (called) return
      called = true
      clearTimeout(interval)

      callback(...args)
    }
  }

  function sendRequest(type, data) {
    return new Promise((resolve, reject) => {
      socket.emit(
        type,
        data,
        timeoutCallback((err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      )
    })
  }

  // =========== media handling ==========
  function stopLocalStream(stream) {
    let tracks = stream.getTracks()
    if (!tracks) {
      console.error('NO tracks')
      return
    }

    tracks.forEach((track) => track.stop())
  }

  // return Promise
  function playVideo(element, stream) {
    if (element.srcObject) {
      console.error('element ALREADY playing, so ignore')
      return
    }
    element.srcObject = stream
    element.volume = 0
    return element.play()
  }

  function pauseVideo(element) {
    element.pause()
    element.srcObject = null
  }

  function addRemoteTrack(id, track) {
    let video = findRemoteVideo(id)
    if (!video) {
      video = addRemoteVideo(id)
      video.controls = '1'
    }

    if (video.srcObject) {
      video.srcObject.addTrack(track)
      return
    }

    const newStream = new MediaStream()
    newStream.addTrack(track)
    playVideo(video, newStream)
      .then(() => {
        video.volume = 1.0
      })
      .catch((err) => {
        console.error('media ERROR:', err)
      })
  }

  function addRemoteVideo(id) {
    let existElement = findRemoteVideo(id)
    if (existElement) {
      console.error('remoteVideo element ALREADY exist for id=' + id)
      return existElement
    }

    let element = document.createElement('video')
    const remoteContainer = document.getElementById('remote_container')
    remoteContainer.appendChild(element)
    element.id = 'remote_' + id
    element.width = 240
    element.height = 180
    element.volume = 0
    //element.controls = true;
    element.style = 'border: solid black 1px;'
    return element
  }

  function findRemoteVideo(id) {
    let element = document.getElementById('remote_' + id)
    return element
  }

  function removeRemoteVideo(id) {
    console.log(' ---- removeRemoteVideo() id=' + id)
    let element = document.getElementById('remote_' + id)
    if (element) {
      element.pause()
      element.srcObject = null
      const remoteContainer = document.getElementById('remote_container')
      remoteContainer.removeChild(element)
    } else {
      console.log('child element NOT FOUND')
    }
  }

  function removeAllRemoteVideo() {
    const remoteContainer = document.getElementById('remote_container')
    while (remoteContainer.firstChild) {
      remoteContainer.firstChild.pause()
      remoteContainer.firstChild.srcObject = null
      remoteContainer.removeChild(remoteContainer.firstChild)
    }
  }

  // ============ UI button ==========

  function checkUseVideo() {
    // const useVideo = document.getElementById('use_video').checked;
    return true
  }

  function checkUseAudio() {
    // const useAudio = document.getElementById('use_audio').checked;
    return true
  }

  async function startMedia() {
    if (localStream) {
      console.error('WARN: local media ALREADY started')
      return
    }

    const useVideo = checkUseVideo()
    const useAudio = checkUseAudio()

    try {
      localStream = await navigator.mediaDevices.getUserMedia({ audio: useAudio, video: useVideo })
      const localVideo = document.getElementById('local_video')
      playVideo(localVideo, localStream)
    } catch (err) {
      console.error('media ERROR:', err)
    }
  }

  function stopMedia() {
    if (localStream) {
      const localVideo = document.getElementById('local_video')
      pauseVideo(localVideo)
      stopLocalStream(localStream)
      localStream = null
    }
  }

  function getRoomName() {
    return store.data.roomId || '_default_room'
  }

  function getRoomFromUrl() {
    const search = window.location.search
    const re = new RegExp('room=([^&=]+)')
    const results = re.exec(search)
    let room = ''
    if (results) {
      room = results[1]
    }
    return room
  }

  function isRoomSpecifiedByUrl() {
    let room = getRoomFromUrl()
    if (room && room !== '') {
      return true
    } else {
      return false
    }
  }

  async function connect() {
    if (!localStream) {
      console.error('WARN: local media NOT READY')
      return
    }

    // --- connect socket.io ---
    await connectSocket().catch((err) => {
      console.error(err)
      return
    })

    // --- get capabilities --
    const data = await sendRequest('getRouterRtpCapabilities', {})
    console.log('getRouterRtpCapabilities:', data)
    await loadDevice(data)

    // --- get transport info ---
    console.log('--- createProducerTransport --')
    const params = await sendRequest('createProducerTransport', {})
    console.log('transport params:', params)
    producerTransport = device.createSendTransport(params)
    console.log('createSendTransport:', producerTransport)

    // --- join & start publish --
    producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      console.log('--trasnport connect')
      sendRequest('connectProducerTransport', { dtlsParameters: dtlsParameters }).then(callback).catch(errback)
    })

    producerTransport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
      console.log('--trasnport produce')
      try {
        const { id } = await sendRequest('produce', {
          transportId: producerTransport.id,
          kind,
          rtpParameters,
        })
        callback({ id })
        console.log('--produce requested, then subscribe ---')
        subscribe()
      } catch (err) {
        errback(err)
      }
    })

    producerTransport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connecting':
          console.log('publishing...')
          break

        case 'connected':
          console.log('published')
          break

        case 'failed':
          console.log('failed')
          producerTransport.close()
          break

        default:
          break
      }
    })

    const useVideo = checkUseVideo()
    const useAudio = checkUseAudio()
    if (useVideo) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        const trackParams = { track: videoTrack }
        videoProducer = await producerTransport.produce(trackParams)
      }
    }
    if (useAudio) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        const trackParams = { track: audioTrack }
        audioProducer = await producerTransport.produce(trackParams)
      }
    }
  }

  async function subscribe() {
    if (!isSocketConnected()) {
      await connectSocket().catch((err) => {
        console.error(err)
        return
      })

      // --- get capabilities --
      const data = await sendRequest('getRouterRtpCapabilities', {})
      console.log('getRouterRtpCapabilities:', data)
      await loadDevice(data)
    }

    // --- prepare transport ---
    console.log('--- createConsumerTransport --')
    if (!consumerTransport) {
      const params = await sendRequest('createConsumerTransport', {})
      console.log('transport params:', params)
      consumerTransport = device.createRecvTransport(params)
      console.log('createConsumerTransport:', consumerTransport)

      // --- join & start publish --
      consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        console.log('--consumer trasnport connect')
        sendRequest('connectConsumerTransport', { dtlsParameters: dtlsParameters }).then(callback).catch(errback)
      })

      consumerTransport.on('connectionstatechange', (state) => {
        switch (state) {
          case 'connecting':
            console.log('subscribing...')
            break

          case 'connected':
            console.log('subscribed')
            //consumeCurrentProducers(clientId);
            break

          case 'failed':
            console.log('failed')
            producerTransport.close()
            break

          default:
            break
        }
      })

      consumeCurrentProducers(clientId)
    }
  }

  async function consumeCurrentProducers(clientId) {
    console.log('-- try consuleAll() --')
    const remoteInfo = await sendRequest('getCurrentProducers', { localId: clientId }).catch((err) => {
      console.error('getCurrentProducers ERROR:', err)
      return
    })
    //console.log('remoteInfo.producerIds:', remoteInfo.producerIds);
    console.log('remoteInfo.remoteVideoIds:', remoteInfo.remoteVideoIds)
    console.log('remoteInfo.remoteAudioIds:', remoteInfo.remoteAudioIds)
    consumeAll(consumerTransport, remoteInfo.remoteVideoIds, remoteInfo.remoteAudioIds)
  }

  function disconnect() {
    if (localStream) {
      const localVideo = document.getElementById('local_video')
      pauseVideo(localVideo)
      stopLocalStream(localStream)
      localStream = null
    }
    if (videoProducer) {
      videoProducer.close() // localStream will stop
      videoProducer = null
    }
    if (audioProducer) {
      audioProducer.close() // localStream will stop
      audioProducer = null
    }
    if (producerTransport) {
      producerTransport.close() // localStream will stop
      producerTransport = null
    }

    for (const key in videoConsumers) {
      const consumer = videoConsumers[key]
      consumer.close()
      delete videoConsumers[key]
    }
    for (const key in audioConsumers) {
      const consumer = audioConsumers[key]
      consumer.close()
      delete audioConsumers[key]
    }

    if (consumerTransport) {
      consumerTransport.close()
      consumerTransport = null
    }

    removeAllRemoteVideo()

    disconnectSocket()
  }

  async function loadDevice(routerRtpCapabilities) {
    try {
      device = new MediasoupClient.Device()
    } catch (error) {
      if (error.name === 'UnsupportedError') {
        console.error('browser not supported')
      }
    }
    await device.load({ routerRtpCapabilities })
  }

  /*--
  async function consume(transport) {
    console.log('--start of consume --');
    const { rtpCapabilities } = device;
    //const data = await socket.request('consume', { rtpCapabilities });
    const data = await sendRequest('consume', { rtpCapabilities })
      .catch(err => {
        console.error('consume ERROR:', err);
      });
    const {
      producerId,
      id,
      kind,
      rtpParameters,
    } = data;

    let codecOptions = {};
    const consumer = await transport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions,
    });
    //const stream = new MediaStream();
    //stream.addTrack(consumer.track);

    addRemoteTrack(clientId, consumer.track);

    console.log('--end of consume');
    //return stream;
  }
  --*/

  function consumeAll(transport, remoteVideoIds, remotAudioIds) {
    console.log('----- consumeAll() -----')
    remoteVideoIds.forEach((rId) => {
      consumeAdd(transport, rId, null, 'video')
    })
    remotAudioIds.forEach((rId) => {
      consumeAdd(transport, rId, null, 'audio')
    })
  }

  async function consumeAdd(transport, remoteSocketId, prdId, trackKind) {
    console.log('--start of consumeAdd -- kind=%s', trackKind)
    const { rtpCapabilities } = device
    //const data = await socket.request('consume', { rtpCapabilities });
    const data = await sendRequest('consumeAdd', {
      rtpCapabilities: rtpCapabilities,
      remoteId: remoteSocketId,
      kind: trackKind,
    }).catch((err) => {
      console.error('consumeAdd ERROR:', err)
    })
    const { producerId, id, kind, rtpParameters } = data
    if (prdId && prdId !== producerId) {
      console.error('producerID NOT MATCH')
    }

    let codecOptions = {}
    const consumer = await transport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions,
    })
    //const stream = new MediaStream();
    //stream.addTrack(consumer.track);

    addRemoteTrack(remoteSocketId, consumer.track)
    addConsumer(remoteSocketId, consumer, kind)
    consumer.remoteId = remoteSocketId
    consumer.on('transportclose', () => {
      console.log('--consumer transport closed. remoteId=' + consumer.remoteId)
      //consumer.close();
      //removeConsumer(remoteId);
      //removeRemoteVideo(consumer.remoteId);
    })
    consumer.on('producerclose', () => {
      console.log('--consumer producer closed. remoteId=' + consumer.remoteId)
      consumer.close()
      removeConsumer(remoteId, kind)
      if (kind === 'video') {
        removeRemoteVideo(consumer.remoteId)
      }
    })
    consumer.on('trackended', () => {
      console.log('--consumer trackended. remoteId=' + consumer.remoteId)
      //consumer.close();
      //removeConsumer(remoteId);
      //removeRemoteVideo(consumer.remoteId);
    })

    console.log('--end of consumeAdd')
    //return stream;

    if (kind === 'video') {
      console.log('--try resumeAdd --')
      sendRequest('resumeAdd', { remoteId: remoteSocketId, kind: kind })
        .then(() => {
          console.log('resumeAdd OK')
        })
        .catch((err) => {
          console.error('resumeAdd ERROR:', err)
        })
    }
  }

  function getConsumer(id, kind) {
    if (kind === 'video') {
      return videoConsumers[id]
    } else if (kind === 'audio') {
      return audioConsumers[id]
    } else {
      console.error('UNKNOWN consumer kind=' + kind)
    }
  }

  function addConsumer(id, consumer, kind) {
    if (kind === 'video') {
      videoConsumers[id] = consumer
      console.log('videoConsumers count=' + Object.keys(videoConsumers).length)
    } else if (kind === 'audio') {
      audioConsumers[id] = consumer
      console.log('audioConsumers count=' + Object.keys(audioConsumers).length)
    } else {
      console.error('UNKNOWN consumer kind=' + kind)
    }
  }

  function removeConsumer(id, kind) {
    if (kind === 'video') {
      delete videoConsumers[id]
      console.log('videoConsumers count=' + Object.keys(videoConsumers).length)
    } else if (kind === 'audio') {
      delete audioConsumers[id]
      console.log('audioConsumers count=' + Object.keys(audioConsumers).length)
    } else {
      console.error('UNKNOWN consumer kind=' + kind)
    }
  }

  async function updateAudioDevices() {
    console.log('_updateAudioDevices()')

    // Reset the list.
    audioDevices = {}

    try {
      console.log('_updateAudioDevices() | calling enumerateDevices()')

      const devices = await navigator.mediaDevices.enumerateDevices()

      for (const device of devices) {
        if (device.kind !== 'audioinput') continue

        audioDevices[device.deviceId] = device
      }
    } catch (error) {
      console.error('_updateAudioDevices() failed:%o', error)
    }
  }

  async function getAudioDevice() {
    console.log('_getAudioDeviceId()')

    try {
      console.log('_getAudioDeviceId() | calling _updateAudioDeviceId()')

      await updateAudioDevices()

      // const { selectedAudioDevice } = store.getState().settings;

      // if (selectedAudioDevice && audioDevices[selectedAudioDevice])
      // 	return selectedAudioDevice;
      // else
      // {
      const ad = Object.values(audioDevices)

      return ad[0]
      // }
    } catch (error) {
      console.error('_getAudioDeviceId() failed:%o', error)
    }
  }

  async function muteMic() {
    console.log('muteMic()')

    audioProducer.pause()

    try {
      await sendRequest('pauseProducer', { kind: 'audio' })

      // store.dispatch(
      // 	producerActions.setProducerPaused(this._micProducer.id));
    } catch (error) {
      console.error('muteMic() | failed: %o', error)

      // store.dispatch(requestActions.notify(
      // 	{
      // 		type : 'error',
      // 		text : intl.formatMessage({
      // 			id             : 'devices.microphoneMuteError',
      // 			defaultMessage : 'Unable to mute your microphone'
      // 		})
      // 	}));
    }
  }

  async function unmuteMic() {
    console.log('unmuteMic()')

    if (!audioProducer) {
      enableMic()
    } else {
      audioProducer.resume()

      try {
        sendRequest('resumeProducer', { kind: 'audio' })

        // store.dispatch(
        // 	producerActions.setProducerResumed(this._micProducer.id));
      } catch (error) {
        console.error('unmuteMic() | failed: %o', error)

        // store.dispatch(requestActions.notify(
        // 	{
        // 		type : 'error',
        // 		text : intl.formatMessage({
        // 			id             : 'devices.microphoneUnMuteError',
        // 			defaultMessage : 'Unable to unmute your microphone'
        // 		})
        // 	}));
      }
    }
  }

  async function enableMic() {
    if (audioProducer) return

    if (device && !device.canProduce('audio')) {
      console.error('enableMic() | cannot produce audio')

      return
    }

    let track

    try {
      const device = await getAudioDevice()

      if (!device) throw new Error('no audio devices')

      console.log('enableMic() | new selected audio device [device:%o]', device)

      console.log('enableMic() | calling getUserMedia()')

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: device.deviceId },
        },
      })

      track = stream.getAudioTracks()[0]

      audioProducer = await producerTransport.produce({
        track,
        codecOptions: {
          opusStereo: 1,
          opusDtx: 1,
        },
        appData: { source: 'mic' },
      })

      await updateAudioDevices()

      audioProducer.on('transportclose', () => {
        audioProducer = null
      })

      audioProducer.on('trackended', () => {
        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: intl.formatMessage({
        //       id: 'devices.microphoneDisconnected',
        //       defaultMessage: 'Microphone disconnected',
        //     }),
        //   })
        // )

        disableMic().catch(() => {})
      })

      audioProducer.volume = 0

      const harkStream = new MediaStream()

      harkStream.addTrack(track)

      if (!harkStream.getAudioTracks()[0]) throw new Error('enableMic(): given stream has no audio track')

      // if (this._hark != null) this._hark.stop()

      // this._hark = hark(harkStream, { play: false })

      // // eslint-disable-next-line no-unused-vars
      // this._hark.on('volume_change', (dBs, threshold) => {
      //   // The exact formula to convert from dBs (-100..0) to linear (0..1) is:
      //   //   Math.pow(10, dBs / 20)
      //   // However it does not produce a visually useful output, so let exagerate
      //   // it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
      //   // minimize component renderings.
      //   let volume = Math.round(Math.pow(10, dBs / 85) * 10)

      //   if (volume === 1) volume = 0

      //   volume = Math.round(volume)

      //   if (this._micProducer && volume !== this._micProducer.volume) {
      //     this._micProducer.volume = volume

      //     store.dispatch(peerVolumeActions.setPeerVolume(this._peerId, volume))
      //   }
      // })
    } catch (error) {
      console.error('enableMic() failed:%o', error)

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: intl.formatMessage({
      //       id: 'devices.microphoneError',
      //       defaultMessage: 'An error occured while accessing your microphone',
      //     }),
      //   })
      // )

      if (track) track.stop()
    }
  }

  async function disableMic() {
    console.log('disableMic()')

    if (!audioProducer) return

    audioProducer.close()

    try {
      await sendRequest('closeProducer', { kind: 'audio' })
    } catch (error) {
      console.error('disableMic() [error:"%o"]', error)
    }

    audioProducer = null
  }

  async function updateWebcams() {
    console.log('_updateWebcams()')

    // Reset the list.
    webcams = {}

    try {
      console.log('_updateWebcams() | calling enumerateDevices()')

      const devices = await navigator.mediaDevices.enumerateDevices()

      for (const device of devices) {
        if (device.kind !== 'videoinput') continue

        webcams[device.deviceId] = device
      }
    } catch (error) {
      console.error('_updateWebcams() failed:%o', error)
    }
  }

  async function getWebcamDevice() {
    console.log('_getWebcamDeviceId()')

    try {
      console.log('_getWebcamDeviceId() | calling _updateWebcams()')

      await updateWebcams()

      // const { selectedWebcam } = store.getState().settings;

      // if (selectedWebcam && this._webcams[selectedWebcam])
      // 	return selectedWebcam;
      // else
      // {
      const list = Object.values(webcams)

      return list[0]
      // }
    } catch (error) {
      console.error('_getWebcamDeviceId() failed:%o', error)
    }
  }

  async function enableWebcam() {
    if (videoProducer) return

    if (!device.canProduce('video')) {
      console.error('enableWebcam() | cannot produce video')

      return
    }

    let track

    try {
      const device = await getWebcamDevice()

      // const resolution = store.getState().settings.resolution;

      if (!device) throw new Error('no webcam devices')

      console.log('_setWebcamProducer() | new selected webcam [device:%o]', device)

      console.log('_setWebcamProducer() | calling getUserMedia()')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: device.deviceId },
          ...VIDEO_CONSTRAINS['medium'],
        },
      })

      track = stream.getVideoTracks()[0]

      // if (this._useSimulcast)
      // {
      // 	// If VP9 is the only available video codec then use SVC.
      // 	const firstVideoCodec = this._mediasoupDevice
      // 		.rtpCapabilities
      // 		.codecs
      // 		.find((c) => c.kind === 'video');

      // 	let encodings;

      // 	if (firstVideoCodec.mimeType.toLowerCase() === 'video/vp9')
      // 		encodings = VIDEO_KSVC_ENCODINGS;
      // 	else
      // 	{
      // 		if ('simulcastEncodings' in window.config)
      // 			encodings = window.config.simulcastEncodings;
      // 		else
      // 			encodings = VIDEO_SIMULCAST_ENCODINGS;
      // 	}

      // 	this._webcamProducer = await this._sendTransport.produce(
      // 		{
      // 			track,
      // 			encodings,
      // 			codecOptions :
      // 			{
      // 				videoGoogleStartBitrate : 1000
      // 			},
      // 			appData :
      // 			{
      // 				source : 'webcam'
      // 			}
      // 		});
      // }
      // else
      // {
      videoProducer = await producerTransport.produce({
        track,
        appData: {
          source: 'webcam',
        },
      })
      // }

      // store.dispatch(producerActions.addProducer(
      // 	{
      // 		id            : this._webcamProducer.id,
      // 		deviceLabel   : device.label,
      // 		source        : 'webcam',
      // 		paused        : this._webcamProducer.paused,
      // 		track         : this._webcamProducer.track,
      // 		rtpParameters : this._webcamProducer.rtpParameters,
      // 		codec         : this._webcamProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
      // 	}));

      // store.dispatch(settingsActions.setSelectedWebcamDevice(deviceId));
      const localVideo = document.getElementById('local_video')
      playVideo(localVideo, stream)

      await updateWebcams()

      videoProducer.on('transportclose', () => {
        videoProducer = null
      })

      videoProducer.on('trackended', () => {
        // store.dispatch(requestActions.notify(
        // 	{
        // 		type : 'error',
        // 		text : intl.formatMessage({
        // 			id             : 'devices.cameraDisconnected',
        // 			defaultMessage : 'Camera disconnected'
        // 		})
        // 	}));

        disableWebcam().catch(() => {})
      })

      console.log('_setWebcamProducer() succeeded')
    } catch (error) {
      console.error('_setWebcamProducer() failed:%o', error)

      // store.dispatch(requestActions.notify(
      // 	{
      // 		type : 'error',
      // 		text : intl.formatMessage({
      // 			id             : 'devices.cameraError',
      // 			defaultMessage : 'An error occured while accessing your camera'
      // 		})
      // 	}));

      if (track) track.stop()
    }
  }

  async function disableWebcam() {
    console.log('disableWebcam()')

    if (!videoProducer) return

    videoProducer.close()

    const localVideo = document.getElementById('local_video')
    pauseVideo(localVideo)

    // store.dispatch(
    // 	producerActions.removeProducer(this._webcamProducer.id));

    try {
      await sendRequest('closeProducer', { kind: 'video' })
    } catch (error) {
      console.error('disableWebcam() [error:"%o"]', error)
    }

    videoProducer = null
  }

  console.log('=== ready ===')
}
