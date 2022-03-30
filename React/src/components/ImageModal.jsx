/* eslint-disable react/prop-types */
/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
// import React, {useState} from 'react';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody} from 'reactstrap';

function ImageModal({Url, Thumbnail}) {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <img
        src={Thumbnail}
        alt="...."
        color="primary"
        onClick={toggle}
        className="w-100"
      />
      <Modal isOpen={modal} toggle={toggle} modalTransition={{timeout: 1000}}>
        <ModalBody>
          <img src={Url} alt="..." className="border border-primary w-100" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ImageModal;
