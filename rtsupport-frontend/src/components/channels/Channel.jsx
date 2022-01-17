import React from 'react'

const Channel = ({ channel, activeChannel, setActiveChannel }) => {
  const isActive = channel === activeChannel ? 'active' : 'inactive'

  const handleClick = (event) => {
    event.preventDefault()

    setActiveChannel(channel)
  }

  return (
    <li className={isActive} onClick={(e) => handleClick(e)}>
      {channel.name}
    </li>
  )
}

export default Channel
