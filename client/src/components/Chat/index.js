import React from 'react'
import './Chat.css'

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header"> Chat Name</div>
      <div className="chat-messages">Chaat messages</div>
      <div className="chat-input-wrapper">
        <input className="chat-input" placeholder="Enter your message here" />
        <button>send</button>
      </div>
    </div>
  )
}

export default Chat
