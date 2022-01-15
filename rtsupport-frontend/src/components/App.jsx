import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import ChannelSection from './channels/ChannelSection'
import UserSection from './users/UserSection'
import MessageSection from './messages/MessageSection'

const App = () => {
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState('')
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const handleAddChannel = (name) => {
    const newChannel = {
      id: channels.length,
      name
    }

    setChannels(oldState => [...oldState, newChannel])
    // TODO: send to server
  }

  const handleSetActiveChannel = (activeChannel) => {
    setActiveChannel(activeChannel)
    // TODO: get channel messages
  }

  const handleAddUser = (name) => {
    const newUser = {
      id: users.length,
      name
    }

    setUsers(oldState => [...oldState, newUser])
    // TODO: send to server
  }

  const handleAddMessage = (body) => {
    const author = users.length > 0 ? users[0].name : 'anonymous'

    const newMessage = {
      id: messages.length,
      author,
      body,
      createdAt: new Date
    }

    setMessages(oldState => [...oldState, newMessage])
    // TODO: send to server
  }

  return (
    <div className='app'>
      <div className='nav'>
        <ChannelSection
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={handleSetActiveChannel}
          addChannel={handleAddChannel}
        />
        <UserSection
          users={users}
          addUser={handleAddUser}
        />
        <MessageSection
          messages={messages}
          activeChannel={activeChannel}
          addMessage={handleAddMessage}
        />
      </div>
    </div>
  )
}

export default App
