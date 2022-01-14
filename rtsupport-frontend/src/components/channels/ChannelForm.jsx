import React, { useState } from 'react'

const ChannelForm = ({ addChannel }) => {
  const [channel, setChannel] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addChannel(channel)

    event.target.reset()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='form-group'>
        <input
          className='form-control'
          placeholder='Add Channel'
          type='text'
          onChange={(e) => setChannel(e.target.value)}
        />
      </div>
    </form>
  )
}

export default ChannelForm
