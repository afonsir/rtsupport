import React from 'react'

import Message from './Message'

const MessageList = ({ messages }) => {
  return (
    <ul>
      {
        messages.map(message => {
          return (
            <Message
              key={message.id}
              message={message}
            />
          )
        })
      }
    </ul>
  )
}

export default MessageList
