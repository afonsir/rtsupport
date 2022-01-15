import React from 'react'

import User from './User'

const UserList = ({ users }) => {
  return (
    <ul>
      {
        users.map(user => {
          return (
            <User
              key={user.id}
              user={user}
            />
          )
        })
      }
    </ul>
  )
}

export default UserList
