import { getId, getRoomFromUrl } from './utils.js'

export class Store {
  data = {
    roomId: null,
    muted:false,
    noCam:false,
  }
  listeners = []

  init() {
    const roomId = getRoomFromUrl()
    if(roomId){
      this.onStart()
    }
    this.set({roomId})
  }
  onStartConference() {
    const roomId = getId()
    window.location.hash = `room=${roomId}`
    this.onStart()
    this.set({roomId})
  }
  onStopConference() {
    window.location.hash = ''
    this.onStop()
    this.set({roomId:''})
  }
  onToggleMute(){
    const {muted}=this.get()
    this.toggleMute()
    this.set({muted:!muted})
  }
  onToggleCamera(){
    const {noCam}=this.get()
    this.toggleCamera()
    this.set({noCam:!noCam})
  }
  
  on(cb) {
    this.listeners = [...this.listeners, cb]
  }
  off(cb) {
    this.listeners = this.listeners.filter(item => item === cb)
  }
  get() {
    return this.data
  }
  set(value) {
    this.data = { ...this.data, ...value } //todo validate input param
    this.listeners.forEach(cb => cb(this.data))
  }
}
