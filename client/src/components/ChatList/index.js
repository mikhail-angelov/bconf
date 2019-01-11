import React from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import './ChatList.css'

@inject('chatsStore')
@observer
export default class ChatList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUsersSearchModal: false,
    }
  }

  toggleShowUsersSearch() {
    this.setState(state => ({
      showUsersSearchModal: !state.showUsersSearchModal,
    }))
  }

  render() {
    const { chatsStore } = this.props
    return (
      <div className="chat-list">
        {this.state.showUsersSearchModal && (
          <div class="search-modal">
            <div class="search-block">
              <input placeholder="Search users" />
              <div>Users list</div>
            </div>
          </div>
        )}
        <div className="chat-list-header">
          <input className="chat-list-search-input" type="text" placeholder="Search" />
          <button onClick={this.toggleShowUsersSearch.bind(this)}>+</button>
        </div>
        {_.map(chatsStore.chats, chat => {
          return (
            <div key={chat._id} className="chat-item">
              {chat.name || 'noname'}
            </div>
          )
        })}
      </div>
    )
  }
}
