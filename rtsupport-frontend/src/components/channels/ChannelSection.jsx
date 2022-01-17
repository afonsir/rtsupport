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
    <div className='panel-section'>
      <div>
        <strong>Channels</strong>
      </div>

      <div>
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
