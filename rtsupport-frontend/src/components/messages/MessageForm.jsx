import React, { useState } from 'react'

const MessageForm = ({ addMessage, activeChannel }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addMessage(message)

    event.target.reset()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='form-group'>
        {!!activeChannel &&
          <input
            className='form-control'
            placeholder='Add Message...'
            type='text'
            onChange={(e) => setMessage(e.target.value)}
          />
        }
      </div>
    </form>
  )
}

export default MessageForm
