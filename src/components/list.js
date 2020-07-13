import React from 'react';
import "../styles/list.css"

export const Item = ({ device, index, onClick }) => {
  return(
    <div 
      class="listItem"
      key={ index } 
      onClick={ () => onClick(device.device_id )}
    >
      { device.device_id }
    </div>
  )
}

export const List = ({ devices, onClick }) => {
  return (
    <div class="list">
      <div class="title">Device IDs</div>
      <div class="scoll">
        { devices.map((device, index) => <Item device={device} index={index} onClick={onClick} />) }
      </div>
    </div>
  )
}


