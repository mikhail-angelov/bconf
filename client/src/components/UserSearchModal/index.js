import React from 'react'
import './UserSearchModal.css'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { SearchResults } from './SearchResults'

@inject('chatsStore')
@observer
export default class UserSearchModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchPhrase: '',
      group: [],
    }
    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleCreateChat = this.handleCreateChat.bind(this)
  }
  handleSearchPhraseChange(e) {
    const phrase = e.target.value
    this.setState({ searchPhrase: phrase }, () => {
      this.props.chatsStore.findUsers(phrase)
    })
  }
  handleModalClose() {
    this.setState({ searchPhrase: '' }, () => {
      this.props.chatsStore.clearSearchUsers()
      this.props.closeModal()
    })
  }
  handleCheckboxChange(e) {
    const checkedUser = JSON.parse(e.target.value)
    console.log(checkedUser)
    if (e.target.checked) {
      this.setState(state => ({ group: [...state.group, checkedUser] }))
    } else {
      this.setState(state => {
        const filteredGroup = _.filter(state.group, user => user._id !== checkedUser._id)
        return { group: filteredGroup }
      })
    }
  }
  handleCreateChat() {
    this.props.chatsStore.createNewChat(this.state.group)
    this.handleModalClose()
  }
  render() {
    return (
      <div className="search-modal" onClick={this.handleModalClose}>
        <div className="search-block" onClick={e => e.stopPropagation()}>
          <div className="search-block-close" onClick={this.handleModalClose}>
            <FontAwesomeIcon icon={faTimes} color="#d0d0d0" size="1x" />
          </div>
          <input
            placeholder="Search users"
            className="search-input"
            value={this.state.searchPhrase}
            onChange={this.handleSearchPhraseChange}
          />
          <div
            className={classNames('search-results-wrapper', { uncollapsed: this.props.chatsStore.users.length !== 0 })}
          >
            <SearchResults
              users={this.props.chatsStore.users}
              handleCheckboxChange={this.handleCheckboxChange}
              searchPhrase={this.state.searchPhrase}
            />
          </div>

          <button
            className="create-chat-button"
            onClick={this.handleCreateChat}
            disabled={this.state.group.length === 0}
          >
            Create New Chat
          </button>
        </div>
      </div>
    )
  }
}
