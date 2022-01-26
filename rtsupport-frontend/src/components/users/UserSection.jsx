import React from 'react'

import UserList from './UserList'
import UserForm from './UserForm'

const UserSection = ({ users, editUser }) => {
  return (
    <div className='panel-section'>
      <div>
        <strong>Users</strong>
      </div>

      <div>
        <UserList users={users} />
        <UserForm editUser={editUser} />
      </div>
    </div>
  )
}

export default UserSection
