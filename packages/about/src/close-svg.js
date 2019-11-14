import React from 'react';
import {css} from '@emotion/core';

const closeIcon = css`
  position: absolute;
  height: 30px;
  right: 0px;
  bottom: 0px;
  cursor: pointer;
`;

const CloseSvg = (
  <svg
    viewBox="0 0 52 52"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.5"
    className={closeIcon}
  >
    <circle cx="26" cy="26" r="26" />
    <circle cx="26" cy="26" r="22.1" fill="#fff" />
    <path
      d="M8.4 8.4l35.1 35.1m.1-35.1L8.4 43.6"
      fill="none"
      stroke="#000"
      strokeWidth="6"
    />
  </svg>
);

export default CloseSvg;
