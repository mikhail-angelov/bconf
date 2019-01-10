import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('authStore')
@observer
class Main extends Component {
  render() {
    const { authStore } = this.props

    return (
      <div className="Main">
        <div>You've successfully logged in with {authStore.user.email} email</div>
        <button onClick={() => authStore.logout()}>Logout</button>
      </div>
    )
  }
}
export default Main
