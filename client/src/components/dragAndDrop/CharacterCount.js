import React, { useState } from 'react';
import "../../styles/css/App.css";

const CharacterCount = (props) => {

  const [value, setValue] = useState(
    {
      count: props.count
    }
  )
  
  return (
    <div className='character-count-container'>
      <span>Character Count</span>
      <span className='character-count'>{value.count}</span>
    </div>
      
  )
}

export default CharacterCount;