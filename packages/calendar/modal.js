import React from 'react';
import {css} from 'react-emotion';
import CloseSvg from './close-svg';

const modalClass = css`
  background: #fff;
  position: fixed;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 0%);
  width: 600px;
  max-width: calc(100% - 24px);
  top: 8%;
  border: 2px solid #444;
  max-height: 91%;
  height: 550px;
  z-index: 1010;
`;

const innerModal = css`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  padding: 10px;
  padding-bottom: 20px;
  overflow: auto;
`;

const modalOverlay = css`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = props => {
  return [
    <div key="a" className={modalClass}>
      <div className={innerModal}>{props.children}</div>
      <div onClick={props.backButton ? props.backButton : props.closeClick}>
        <CloseSvg />
      </div>
    </div>,
    <div key="b" className={modalOverlay} onClick={props.closeClick} />
  ];
};

export default Modal;
