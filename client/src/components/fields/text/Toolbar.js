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
        width: 69.7%;
        top: 75px;
        background: #38A3A5;
        color: #fff;
        left: 116px;
        z-index: 8;
        overflow: hidden;
        justifty-content: center;
        `
      )}
    />
  )
)