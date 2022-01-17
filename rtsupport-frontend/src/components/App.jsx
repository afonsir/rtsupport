import React, { useState, useEffect, useRef } from 'react'

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
  const [connected, setConnected] = useState(false)

  const ws = useRef(null)

  const handleAddChannel = (name) => {
    const message = {
      name: 'add-channel',
      data: {
        id: channels.length,
        name
      }
    }

    ws.current.send(JSON.stringify(message))
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

  const newChannel = (channel) => {
    setChannels(oldState => [...oldState, channel])
  }

  const handleOnMessage = (event) => {
    try {
      const parsedEvent = JSON.parse(event.data)

      if (parsedEvent.name === 'add-channel') {
        newChannel(parsedEvent.data)
      }
    } catch (err) {}
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8081')

    ws.current.onopen = (event) => {
      setConnected(true)
    }

    ws.current.onmessage = (event) => {
      handleOnMessage(event)
    }

    ws.current.onclose = (event) => {
      setConnected(false)
    }

    return () => ws.current.close()
  }, [])

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
