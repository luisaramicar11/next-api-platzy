import React from 'react';
import styled from 'styled-components';
import { IProduct } from '@/types/productInterface';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: #fff;
  text-align: end;
  color: #000;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: #e84118;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 10px;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct; 
}

const ModalDetails: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalTitle>Detalles</ModalTitle>
        <ModalContent>
          <p>{product.description}</p>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalDetails;
