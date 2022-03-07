import React from 'react'
// Define a React component to render leaves with bold text.
const Leaf = props => {
  if (props.leaf.bold) {
    return (
      <span {...props.attributes} >
        <strong>{props.children}</strong>
      </span>
    )
  }
  if (props.leaf.italic) {
    return (
      <span {...props.attributes} >
        <em>{props.children}</em>
      </span>
    )
  }
  if (props.leaf.underline) {
    return (
      <span {...props.attributes} >
        <u>{props.children}</u>
      </span>
    )
  }

  return (
    <span {...props.attributes} >
      {props.children}
    </span>
  )
}

export default Leaf;