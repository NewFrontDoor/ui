import React from 'react';
import './modal.css';
import CloseSvg from './close-svg';

const Modal = props => {
  return [
    <div key="a" className="modal">
      <div className="innerModal">{props.children}</div>
      <div onClick={props.backButton ? props.backButton : props.closeClick}>
        <CloseSvg />
      </div>
    </div>,
    <div key="b" className="modalOverlay" />
  ];
};

export default Modal;
