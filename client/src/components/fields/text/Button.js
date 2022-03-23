import React from 'react';

import { cx, css } from '@emotion/css';

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    },
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          border: ${active ? '1px solid rgba(0,0,0,1)' : '1px solid rgba(0,0,0,0)'};
          width: 30px;
          height: 26px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            border: 1px solid #888;
          }
        `
      )}
    />
  )
)