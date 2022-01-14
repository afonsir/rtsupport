import React from 'react'

import Channel from './Channel'

const ChannelList = ({
  channels,
  activeChannel,
  setActiveChannel
}) => {
  return (
    <ul>
      {
        channels.map(channel => {
          return (
            <Channel
              key={channel.id}
              channel={channel}
              activeChannel={activeChannel}
              setActiveChannel={setActiveChannel}
            />
          )
        })
      }
    </ul>
  )
}

export default ChannelList
