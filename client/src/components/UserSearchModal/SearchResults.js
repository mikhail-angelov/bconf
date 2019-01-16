import React from 'react'
import './UserSearchModal.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

export const SearchResults = ({ users, searchPhrase, handleCheckboxChange }) => {
  if (searchPhrase && users.length > 0) {
    return _.map(users, user => (
      <div key={user._id} className="search-result-item">
        <label className="label">
          <input
            className="label__checkbox"
            type="checkbox"
            value={JSON.stringify(user)}
            onChange={handleCheckboxChange}
          />
          <span className="label__text">
            <span className="label__check">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </span>
        </label>
        <div className="label__name">{user.name}</div>
      </div>
    ))
  } else if (searchPhrase) {
    return <div className="search-result-empty-item">No users found. Please, try another name.</div>
  } else {
    return <div className="search-result-empty-item">Start typing a username.</div>
  }
}
