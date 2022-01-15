import React from 'react'

import MessageList from './MessageList'
import MessageForm from './MessageForm'

const MessageSection = ({
  messages,
  activeChannel,
  addMessage
}) => {
  return (
    <div className='support panel panel-primary'>
      <div className='panel-heading'>
        <strong>{activeChannel.name}</strong>
      </div>

      <div className='panel-body messages'>
        <MessageList
          messages={messages}
        />
        <MessageForm
          addMessage={addMessage}
          activeChannel={activeChannel}
        />
      </div>
    </div>
  )
}

export default MessageSection
