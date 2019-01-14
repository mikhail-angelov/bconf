import React from 'react'
import './UserSearchModal.css'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'

@inject('chatsStore')
@observer
export default class UserSearchModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchPhrase: '',
    }
    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
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
  render() {
    return (
      <div className="search-modal" onClick={this.handleModalClose}>
        <div className="search-block" onClick={e => e.stopPropagation()}>
          <input
            placeholder="Search users"
            className="search-input"
            value={this.state.searchPhrase}
            onChange={this.handleSearchPhraseChange}
          />
          {_.map(this.props.chatsStore.users, user => (
            <div key={user._id} className="search-result-item">
              {user.name}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
