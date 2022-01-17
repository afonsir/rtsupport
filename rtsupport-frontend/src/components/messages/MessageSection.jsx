import React from 'react'

import MessageList from './MessageList'
import MessageForm from './MessageForm'

const MessageSection = ({
  messages,
  activeChannel,
  addMessage
}) => {
  return (
    <div className='panel-section'>
      <div>
        <strong>{activeChannel.name}</strong>
      </div>

      <div>
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
