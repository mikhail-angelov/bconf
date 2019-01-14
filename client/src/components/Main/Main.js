import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Chat from '../Chat'
import ChatList from '../ChatList'
import './Main.css'
import { when } from 'mobx'

@inject('authStore', 'chatsStore')
@observer
class Main extends Component {
  constructor() {
    super()
    when(
      () => {
        console.log(this.props)
        return this.props.authStore.authenticated
      },
      () => this.props.chatsStore.getChats()
    )
  }

  render() {
    return (
      <div className="main">
        <ChatList />
        <Chat />
      </div>
    )
  }
}
export default Main
