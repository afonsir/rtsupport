import React from 'react'

const Channel = ({ channel, activeChannel, setActiveChannel }) => {
  const isActive = channel === activeChannel ? 'active' : ''

  const handleClick = (event) => {
    event.preventDefault()

    setActiveChannel(channel)
  }

  return (
    <li className={isActive}>
      <a onClick={(e) => handleClick(e)}>
        {channel.name}
      </a>
    </li>
  )
}

export default Channel
