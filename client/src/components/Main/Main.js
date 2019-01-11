import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Chat from '../Chat'
import ChatList from '../ChatList'
import './Main.css'
@inject('authStore', 'chatsStore')
@observer
class Main extends Component {
  componentWillMount() {
    console.log(this.props)
    this.props.chatsStore.getChats()
  }
  render() {
    const { authStore } = this.props

    return (
      <div className="main">
        <ChatList />
        <Chat />
      </div>
    )
  }
}
export default Main
