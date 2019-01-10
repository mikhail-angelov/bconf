import BaseBot from './baseBot.js'
import config from '../../config/environment/index'
import rp from 'request-promise'

class YT extends BaseBot {
  constructor(RobotManager, $http) {
    super(RobotManager, 'yandex-translator')
    this.name = 'Yandex translator'
    this.$http = $http

    this.url = 'https://translate.yandex.net/api/v1.5/tr.json/'
    this.key = config.yandex.translationKey
  }

  dispatch(client, message) {
    console.log('message', message)
    this.getLanguages()
      .then(() => this.detectText(message.payload.msg))
      .then(() => this.translateText(message.payload.msg, 'en-ru'))
      .then(translated => {
        message.payload.msg = translated.text[0]
        this.RobotManager.send(client, message)
      })
  }

  getLanguages() {
    let url = this.url + 'getLangs?key=' + this.key + '&ui=' + 'en'

    return rp(url).then(function(json) {
      console.log('getlang', json)
      return json
    })
  }

  detectText(text) {
    let url = this.url + 'detect?key=' + this.key + '&text="' + text + '"'
    return rp(url).then(function(json) {
      console.log('detect', json)
      return json
    })
  }

  translateText(text, lang) {
    let url = this.url + 'translate?key=' + this.key + '&text="' + text + '"&lang=' + lang + ''
    console.log('translate', url)
    return rp(url).then(function(json) {
      console.log('translate', json)
      return JSON.parse(json)
    })
  }
}

export default YT
