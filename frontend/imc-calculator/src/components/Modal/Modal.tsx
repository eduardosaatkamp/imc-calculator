import React from 'react';
import { Overlay, ModalContent, CloseButton } from './Modal.styles';
import { ModalProps } from './Modal.types';

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
