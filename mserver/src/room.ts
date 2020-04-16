import {listenIps} from './config'

export const webRtcTransport= {
    listenIps,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    maxIncomingBitrate: 1500000,
    initialAvailableOutgoingBitrate: 1000000,
  }

export class Room {
    name: string
    producerTransports: {}
    videoProducers:{}
    audioProducers: {}
  
    consumerTransports:{}
    videoConsumerSets: {}
    audioConsumerSets: {}
  
    router: any
    static rooms: any
    static defaultRoom = null
  
    constructor(name) {
      this.name = name
      this.producerTransports = {}
      this.videoProducers = {}
      this.audioProducers = {}
  
      this.consumerTransports = {}
      this.videoConsumerSets = {}
      this.audioConsumerSets = {}
  
      this.router = null
    }
  
    getProducerTransport(id) {
      return this.producerTransports[id]
    }
  
    addProducerTransport(id, transport) {
      this.producerTransports[id] = transport
      console.log('room=%s producerTransports count=%d', this.name, Object.keys(this.producerTransports).length)
    }
  
    removeProducerTransport(id) {
      delete this.producerTransports[id]
      console.log('room=%s producerTransports count=%d', this.name, Object.keys(this.producerTransports).length)
    }
  
    getProducer(id, kind) {
      if (kind === 'video') {
        return this.videoProducers[id]
      } else if (kind === 'audio') {
        return this.audioProducers[id]
      } else {
        console.warn('UNKNOWN producer kind=' + kind)
      }
    }
  
    getRemoteIds(clientId, kind) {
      let remoteIds = []
      if (kind === 'video') {
        for (const key in this.videoProducers) {
          if (key !== clientId) {
            remoteIds.push(key)
          }
        }
      } else if (kind === 'audio') {
        for (const key in this.audioProducers) {
          if (key !== clientId) {
            remoteIds.push(key)
          }
        }
      }
      return remoteIds
    }
  
    addProducer(id, producer, kind) {
      if (kind === 'video') {
        this.videoProducers[id] = producer
        console.log('room=%s videoProducers count=%d', this.name, Object.keys(this.videoProducers).length, id)
      } else if (kind === 'audio') {
        this.audioProducers[id] = producer
        console.log('room=%s audioProducers count=%d', this.name, Object.keys(this.audioProducers).length, id)
      } else {
        console.warn('UNKNOWN producer kind=' + kind)
      }
    }
  
    removeProducer(id, kind) {
      if (kind === 'video') {
        delete this.videoProducers[id]
        console.log('videoProducers count=' + Object.keys(this.videoProducers).length, id)
      } else if (kind === 'audio') {
        delete this.audioProducers[id]
        console.log('audioProducers count=' + Object.keys(this.audioProducers).length, id)
      } else {
        console.warn('UNKNOWN producer kind=' + kind)
      }
    }
  
    getConsumerTransport(id) {
      return this.consumerTransports[id]
    }
  
    addConsumerTransport(id, transport) {
      this.consumerTransports[id] = transport
      console.log('room=%s add consumerTransports count=%d', this.name, Object.keys(this.consumerTransports).length)
    }
  
    removeConsumerTransport(id) {
      delete this.consumerTransports[id]
      console.log('room=%s remove consumerTransports count=%d', this.name, Object.keys(this.consumerTransports).length)
    }
  
    getConsumerSet(localId, kind) {
      if (kind === 'video') {
        return this.videoConsumerSets[localId]
      } else if (kind === 'audio') {
        return this.audioConsumerSets[localId]
      } else {
        console.warn('WARN: getConsumerSet() UNKNWON kind=%s', kind)
      }
    }
  
    addConsumerSet(localId, set, kind) {
      if (kind === 'video') {
        this.videoConsumerSets[localId] = set
      } else if (kind === 'audio') {
        this.audioConsumerSets[localId] = set
      } else {
        console.warn('WARN: addConsumerSet() UNKNWON kind=%s', kind)
      }
    }
  
    removeConsumerSetDeep(localId) {
      const videoSet = this.getConsumerSet(localId, 'video')
      delete this.videoConsumerSets[localId]
      if (videoSet) {
        for (const key in videoSet) {
          const consumer = videoSet[key]
          consumer.close()
          delete videoSet[key]
        }
  
        console.log('room=%s removeConsumerSetDeep video consumers count=%d', this.name, Object.keys(videoSet).length)
      }
  
      const audioSet = this.getConsumerSet(localId, 'audio')
      delete this.audioConsumerSets[localId]
      if (audioSet) {
        for (const key in audioSet) {
          const consumer = audioSet[key]
          consumer.close()
          delete audioSet[key]
        }
  
        console.log('room=%s removeConsumerSetDeep audio consumers count=%d', this.name, Object.keys(audioSet).length)
      }
    }
  
    getConsumer(localId, remoteId, kind) {
      const set = this.getConsumerSet(localId, kind)
      if (set) {
        return set[remoteId]
      } else {
        return null
      }
    }
  
    addConsumer(localId, remoteId, consumer, kind) {
      const set = this.getConsumerSet(localId, kind)
      if (set) {
        set[remoteId] = consumer
        console.log('room=%s consumers kind=%s count=%d', this.name, kind, Object.keys(set).length)
      } else {
        console.log('room=%s new set for kind=%s, localId=%s', this.name, kind, localId)
        const newSet = {}
        newSet[remoteId] = consumer
        this.addConsumerSet(localId, newSet, kind)
        console.log('room=%s consumers kind=%s count=%d', this.name, kind, Object.keys(newSet).length)
      }
    }
  
    removeConsumer(localId, remoteId, kind) {
      const set = this.getConsumerSet(localId, kind)
      if (set) {
        delete set[remoteId]
        console.log('room=%s consumers kind=%s count=%d', this.name, kind, Object.keys(set).length)
      } else {
        console.log('NO set for room=%s kind=%s, localId=%s', this.name, kind, localId)
      }
    }
  
    // --- static methtod ---
    static staticInit() {
      Room.rooms = {}
    }
  
    static addRoom(room, name) {
      Room.rooms[name] = room
      console.log('static addRoom. name=%s', room.name)
      //console.log('static addRoom. name=%s, rooms:%O', room.name, room);
    }
  
    static getRoom(name) {
      return Room.rooms[name]
    }
  
    static removeRoom(name) {
      delete Room.rooms[name]
    }
  }

  export function getProducerTransport(roomname, id) {
    if (roomname) {
      console.log('=== getProducerTransport use room=%s ===', roomname)
      const room = Room.getRoom(roomname)
      return room.getProducerTransport(id)
    } else {
      console.log('=== getProducerTransport use Room.defaultRoom room=%s ===', roomname)
      return Room.defaultRoom.getProducerTransport(id)
    }
  }
  
  export function addProducerTransport(roomname, id, transport) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.addProducerTransport(id, transport)
      console.log('=== addProducerTransport use room=%s ===', roomname)
    } else {
      Room.defaultRoom.addProducerTransport(id, transport)
      console.log('=== addProducerTransport use Room.defaultRoom room=%s ===', roomname)
    }
  }
  
  export function removeProducerTransport(roomname, id) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.removeProducerTransport(id)
    } else {
      Room.defaultRoom.removeProducerTransport(id)
    }
  }
  
  export function getProducer(roomname, id, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      return room.getProducer(id, kind)
    } else {
      return Room.defaultRoom.getProducer(id, kind)
    }
  }
  
  export function getRemoteIds(roomname, clientId, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      return room.getRemoteIds(clientId, kind)
    } else {
      return Room.defaultRoom.getRemoteIds(clientId, kind)
    }
  }
  
  export function addProducer(roomname, id, producer, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.addProducer(id, producer, kind)
      console.log('=== addProducer use room=%s ===', roomname)
    } else {
      Room.defaultRoom.addProducer(id, producer, kind)
      console.log('=== addProducer use Room.defaultRoom room=%s ===', roomname)
    }
  }
  
  export function removeProducer(roomname, id, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.removeProducer(id, kind)
    } else {
      Room.defaultRoom.removeProducer(id, kind)
    }
  }
  
  // --- multi-consumers --
  //let consumerTransports = {};
  //let videoConsumers = {};
  //let audioConsumers = {};
  
  export function getConsumerTransport(roomname, id) {
    if (roomname) {
      console.log('=== getConsumerTransport use room=%s ===', roomname)
      const room = Room.getRoom(roomname)
      return room.getConsumerTransport(id)
    } else {
      console.log('=== getConsumerTransport use Room.defaultRoom room=%s ===', roomname)
      return Room.defaultRoom.getConsumerTransport(id)
    }
  }
  
  export function addConsumerTransport(roomname, id, transport) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.addConsumerTransport(id, transport)
      console.log('=== addConsumerTransport use room=%s ===', roomname)
    } else {
      Room.defaultRoom.addConsumerTransport(id, transport)
      console.log('=== addConsumerTransport use Room.defaultRoom room=%s ===', roomname)
    }
  }
  
  export function removeConsumerTransport(roomname, id) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.removeConsumerTransport(id)
    } else {
      Room.defaultRoom.removeConsumerTransport(id)
    }
  }
  
  // function getConsumerSet(localId, kind) {
  //   if (kind === 'video') {
  //     return videoConsumers[localId];
  //   }
  //   else if (kind === 'audio') {
  //     return audioConsumers[localId];
  //   }
  //   else {
  //     console.warn('WARN: getConsumerSet() UNKNWON kind=%s', kind);
  //   }
  // }
  
  export function getConsumer(roomname, localId, remoteId, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      return room.getConsumer(localId, remoteId, kind)
    } else {
      return Room.defaultRoom.getConsumer(localId, remoteId, kind)
    }
  }
  
  export function addConsumer(roomname, localId, remoteId, consumer, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.addConsumer(localId, remoteId, consumer, kind)
      console.log('=== addConsumer use room=%s ===', roomname)
    } else {
      Room.defaultRoom.addConsumer(localId, remoteId, consumer, kind)
      console.log('=== addConsumer use Room.defaultRoom room=%s ===', roomname)
    }
  }
  
  export  function removeConsumer(roomname, localId, remoteId, kind) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.removeConsumer(localId, remoteId, kind)
    } else {
      Room.defaultRoom.removeConsumer(localId, remoteId, kind)
    }
  }
  
  export function removeConsumerSetDeep(roomname, localId) {
    if (roomname) {
      const room = Room.getRoom(roomname)
      room.removeConsumerSetDeep(localId)
    } else {
      Room.defaultRoom.removeConsumerSetDeep(localId)
    }
  }
  
  // function addConsumerSet(localId, set, kind) {
  //   if (kind === 'video') {
  //     videoConsumers[localId] = set;
  //   }
  //   else if (kind === 'audio') {
  //     audioConsumers[localId] = set;
  //   }
  //   else {
  //     console.warn('WARN: addConsumerSet() UNKNWON kind=%s', kind);
  //   }
  // }
  
  export async function createTransport(roomname) {
    let router = null
    if (roomname) {
      const room = Room.getRoom(roomname)
      router = room.router
    } else {
      router = Room.defaultRoom.router
    }
    const transport = await router.createWebRtcTransport(webRtcTransport)
    console.log('-- create transport room=%s id=%s', roomname, transport.id, webRtcTransport)
  
    return {
      transport: transport,
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    }
  }
  
  export async function createConsumer(roomname, transport, producer, rtpCapabilities) {
    let router = null
    if (roomname) {
      const room = Room.getRoom(roomname)
      router = room.router
    } else {
      router = Room.defaultRoom.router
    }
  
    if (
      !router.canConsume({
        producerId: producer.id,
        rtpCapabilities,
      })
    ) {
      console.error('can not consume')
      return null
    }
  
    let consumer = null
    //consumer = await producerTransport.consume({ // NG: try use same trasport as producer (for loopback)
    consumer = await transport
      .consume({
        // OK
        producerId: producer.id,
        rtpCapabilities,
        paused: producer.kind === 'video',
      })
      .catch((err) => {
        console.error('consume failed', err)
        return
      })
  
    //if (consumer.type === 'simulcast') {
    //  await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
    //}
  
    return {
      consumer: consumer,
      params: {
        producerId: producer.id,
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
        producerPaused: consumer.producerPaused,
      },
    }
  }