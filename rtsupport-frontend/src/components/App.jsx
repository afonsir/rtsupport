import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import ChannelSection from './channels/ChannelSection'
import UserSection from './users/UserSection'

const App = () => {
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState('')
  const [users, setUsers] = useState([])

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
      </div>
    </div>
  )
}

export default App
