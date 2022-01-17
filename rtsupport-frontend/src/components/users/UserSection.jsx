import React from 'react'

import UserList from './UserList'
import UserForm from './UserForm'

const UserSection = ({ users, addUser }) => {
  return (
    <div className='panel-section'>
      <div>
        <strong>Users</strong>
      </div>

      <div>
        <UserList users={users} />
        <UserForm addUser={addUser} />
      </div>
    </div>
  )
}

export default UserSection
