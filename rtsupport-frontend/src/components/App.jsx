import React, { useState, useEffect, useRef } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Socket from '../../socket'

import ChannelSection from './channels/ChannelSection'
import UserSection from './users/UserSection'
import MessageSection from './messages/MessageSection'

const App = () => {
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState('')
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  const socket = useRef(null)

  const handleAddChannel = (name) => {
    socket.current.emit('channel-add', { name })
  }

  const handleSetActiveChannel = (activeChannel) => {
    setActiveChannel(activeChannel)

    socket.current.emit('message-unsubscribe')
    setUsers([])

    socket.current.emit('message-subscribe', { channelId: activeChannel.id })
  }

  const handleEditUser = (name) => {
    socket.current.emit('user-edit', { name })
  }

  const handleAddMessage = (body) => {
    socket.current.emit('message-add', { channelId: activeChannel.id, body })
  }

  const onConnect = () => {
    setConnected(true)

    socket.current.emit('channel-subscribe')
    socket.current.emit('user-subscribe')
  }

  const onDisconnect = () => {
    setConnected(false)
  }

  const onAddChannel = (channel) => {
    setChannels(oldState => [...oldState, channel])
  }

  const onAddUser = (user) => {
    setUsers(oldState => [...oldState, user])
  }

  const onEditUser = (editUser) => {
    const updatedUsers = users.map(user => ({ ...user }))
    const foundUser = updatedUsers.find(user => user.id === editUser.id)

    if (!foundUser) {
      setUsers([...updatedUsers, editUser])

    } else {
      foundUser.name = editUser.name

      setUsers(updatedUsers)
    }
  }

  const onRemoveUser = (removeUser) => {
    setUsers(users.filter(user => user.id !== removeUser.id))
  }

  const onAddMessage = (message) => {
    setMessages(oldState => [...oldState, message])
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000')

    socket.current = new Socket(ws)

    socket.current.on('connect', onConnect)
    socket.current.on('disconnect', onDisconnect)

    socket.current.on('channel-add', onAddChannel)

    socket.current.on('user-add', onAddUser)
    socket.current.on('user-edit', onEditUser)
    socket.current.on('user-remove', onRemoveUser)

    socket.current.on('message-add', onAddMessage)
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
          editUser={handleEditUser}
        />
      </div>
      <div className='content'>
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
