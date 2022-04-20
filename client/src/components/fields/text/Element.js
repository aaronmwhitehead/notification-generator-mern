import React from 'react';
import { Link } from './Link';

const Element = props => {
  const { attributes, children, element } = props
  const style = { textAlign: element.align, whiteSpace: element.align == 'justify' ? 'pre-line' : 'default' }
  switch (element.type) {
      case 'bulleted-list':
          return <ul style={style} className='slate-element slate-ul' {...attributes}>{children}</ul>
      case 'heading-one':
          return <h1 style={style} className='slate-element' {...attributes}>{children}</h1>
      case 'heading-two':
          return <h2 style={style} className='slate-element' {...attributes}>{children}</h2>
      case 'heading-three':
          return <h3 style={style} className='slate-element' {...attributes}>{children}</h3>
      case 'heading-four':
          return <h4 style={style} className='slate-element' {...attributes}>{children}</h4>
      case 'heading-five':
          return <h5 style={style} className='slate-element' {...attributes}>{children}</h5>
      case 'heading-six':
          return <h6 style={style} className='slate-element' {...attributes}>{children}</h6>
      case 'list-item':
          return <li style={style} className='slate-element' {...attributes}>{children}</li>
      case 'numbered-list':
          return <ol style={style} className='slate-element slate-ol' {...attributes}>{children}</ol>
      case 'link':
          return (<Link {...props} />)
      default:
          return <div style={style} className='slate-element slate-paragraph' {...attributes}>{children}</div>
  }
}

export default Element;