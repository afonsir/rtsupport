import React from 'react'

import { format } from 'date-fns'

const Message = ({ message }) => {
  const createdAt = format(message.createdAt, 'HH:mm:ss dd/mm/yy')

  return (
    <li className='message'>
      <div className='author'>
        <strong>{message.author}</strong>
        <i className='timestamp'>{createdAt}</i>
      </div>
      <div className='body'>{message.body}</div>
    </li>
  )
}

export default Message
