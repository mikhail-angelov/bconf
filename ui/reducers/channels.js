
const actions = require('../actions/index.js')
const _ = require('lodash')


function channels(state = {channel:{}}, action) {
    switch (action.type) {
        case actions.channel.ADD:
        case actions.channel.SAVE: {
            return {
                ...state,
                channel: action.channel
            }
        }
        case actions.channel.REMOVE: {
            return {
                ...state,
                channel: {}
            }
        }
        case actions.channel.ADD_CONTACT: {
            const channel = {
                ...state.channel,
                contacts: [...(state.channel.contacts||[]), action.contact]
            }
            return {
                ...state,
                channel
            }
        }
        case actions.channel.REMOVE_CONTACT: {
            const channel = {
                ...state.channel,
                contacts: (state.channel.contacts||[]).filter(item=>item.id!==action.contactId)
            }
            return {
                ...state,
                channel
            }
        }

        default:
            return state
    }
}

module.exports = channels