import React from 'react'

import ChannelList from './ChannelList'
import ChannelForm from './ChannelForm'

const ChannelSection = ({
  channels,
  activeChannel,
  setActiveChannel,
  addChannel
}) => {
  return (
    <div className='support panel panel-primary'>
      <div className='panel-heading'>
        <strong>Channels</strong>
      </div>

      <div className='panel-body channels'>
        <ChannelList
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
        <ChannelForm
          addChannel={addChannel}
        />
      </div>
    </div>
  )
}

export default ChannelSection
