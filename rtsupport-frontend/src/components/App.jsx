import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import ChannelSection from './channels/ChannelSection'

const App = () => {
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState('')

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

  return (
    <div className='app'>
      <div className='nav'>
        <ChannelSection
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={handleSetActiveChannel}
          addChannel={handleAddChannel}
        />
      </div>
    </div>
  )
}

export default App
