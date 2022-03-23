import React from 'react';
import { cx, css } from '@emotion/css';
import Menu from './Menu';

export const Toolbar = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: fixed;
          top: 8px;
          margin-left: auto;
          margin-right: auto;
          background: rgb(230, 230, 230);
          justify-content: center;
          align-items: center;
          z-index: 999;
          width: 60%;
        `
      )}
    />
  )
)