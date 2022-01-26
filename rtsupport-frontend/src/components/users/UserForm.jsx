import React, { useState } from 'react'

const UserForm = ({ editUser }) => {
  const [user, setUser] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    editUser(user)

    event.target.reset()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='form-group'>
        <input
          className='form-control'
          placeholder='Set Your Name...'
          type='text'
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
    </form>
  )
}

export default UserForm
