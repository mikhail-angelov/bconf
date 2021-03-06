import React from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import './ChatList.css'
import UserSearchModal from '../UserSearchModal'

@inject('chatsStore')
@observer
export default class ChatList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUsersSearchModal: false,
    }
    this.toggleShowUsersSearch = this.toggleShowUsersSearch.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  toggleShowUsersSearch() {
    this.setState(state => ({
      showUsersSearchModal: !state.showUsersSearchModal,
    }))
  }

  handleCloseModal() {
    console.log('closing...')
    this.setState({ showUsersSearchModal: false })
  }

  render() {
    const { chatsStore } = this.props
    return (
      <div className="chat-list">
        {this.state.showUsersSearchModal && <UserSearchModal closeModal={this.handleCloseModal} />}
        <div className="chat-list-header">
          <input className="chat-list-search-input" type="text" placeholder="Search" />
          <button className="add-chat-button" onClick={this.toggleShowUsersSearch}>
            +
          </button>
        </div>
        <div className="chat-list-items-wrapper">
          {_.map(chatsStore.chats, chat => {
            return (
              <div key={chat.chatId} className="chat-item">
                {chat.chatName || 'noname'}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
