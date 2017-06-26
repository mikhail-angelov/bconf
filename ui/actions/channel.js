import * as http from '../services/http'
import config from '../config'

const props = {
  ADD: 'addChannel',
  SAVE: 'saveChannel',
  REMOVE: 'removeChannel',
  ADD_CONTACT: 'addContactToChannel',
  REMOVE_CONTACT: 'removeContactFromChannel',
  CHANNEL_ERROR: 'errorChannel'
}

function addChannel (channel) {
  return dispatch => {
    return http.post(config.host + 'api/channel', channel)
            .then(result => {
              console.log('--', result)
              dispatch({ type: props.ADD, result })
            })
            .catch(err => {
              console.log('Oops...', "Couldn't add channel: " + err)
              dispatchError(dispatch, 'error')
            })
  }
}

function saveChannel (channel) {
  return dispatch => {
    return http.put(config.host + 'api/channel', channel)
            .then(result => {
              console.log('--', result)
              dispatch({ type: props.SAVE, result })
            })
            .catch(err => {
              console.log('Oops...', "Couldn't save channel: " + err)
              dispatchError(dispatch, 'error')
            })
  }
}

function removeChannel (channelId) {
  return dispatch => {
    return http.remove(config.host + 'api/channel/' + channelId)
            .then(result => {
              console.log('--', result)
              dispatch({ type: props.REMOVE, channelId })
            })
            .catch(err => {
              console.log('Oops...', "Couldn't remove channel: " + err)
              dispatchError(dispatch, 'error')
            })
  }
}

function addContactToChannel (channel, conatact) {
  return dispatch => {
    return http.post(config.host + 'api/channel/addContact/' + channel._id, conatact)
            .then(result => {
              console.log('--', result)
              dispatch({ type: props.ADD_CONTACT, channel, conatact })
            })
            .catch(err => {
              console.log('Oops...', "Couldn't add ccontact to channel: " + err)
              dispatchError(dispatch, 'error')
            })
  }
}

function removeContactFromChannel (channel, conatact) {
  return dispatch => {
    return http.post(config.host + 'api/channel/removeContact/' + channel._id, conatact)
            .then(result => {
              console.log('--', result)
              dispatch({ type: props.REMOVE_CONTACT, channel, conatact })
            })
            .catch(err => {
              console.log('Oops...', "Couldn't remove ccontact from channel: " + err)
              dispatchError(dispatch, 'error')
            })
  }
}

function dispatchError (dispatch, error) {
  dispatch({ type: props.CHANNEL_ERROR, error })
}

module.exports = {
  channel: props,
  addChannel,
  saveChannel,
  removeChannel,
  addContactToChannel,
  removeContactFromChannel
}
