import React from 'react'

import UserList from './UserList'
import UserForm from './UserForm'

const UserSection = ({ users, addUser }) => {
  return (
    <div className='support panel panel-primary'>
      <div className='panel-heading'>
        <strong>Users</strong>
      </div>

      <div className='panel-body users'>
        <UserList users={users} />
        <UserForm addUser={addUser} />
      </div>
    </div>
  )
}

export default UserSection
