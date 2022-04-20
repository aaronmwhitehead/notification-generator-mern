import React from 'react';

const Tooltip = (props) => {

  return (
     <div>
       <h5>{props.title}</h5>
       <span>{props.body}</span>
    </div>
  )
}

export default Tooltip;