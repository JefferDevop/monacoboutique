import React from "react";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import styles from "./ModalBasic.module.scss"

export function ModalBasic(props) {
  const { show, size, title, children, onClose } = props;
  return (
    <div>
      <Modal
     
      centered
        toggle={onClose}
        keyboard={true}
        isOpen={show}
        size={size}
        className="modal-basic"
   
      >
        {title && <ModalHeader toggle={onClose}>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        

      </Modal>
    </div>
  );
}

