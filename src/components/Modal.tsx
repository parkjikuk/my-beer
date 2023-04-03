import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
}


function Modal({ onClose }: ModalProps) {
  return (
    <Overlay>
      <Container>
        <ModalMessage>로그인 하셔야 이용할 수 있습니다.</ModalMessage>
        <ModalButtons>
          <LoginButton to="/login">로그인</LoginButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ModalButtons>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Container = styled.div`
background-color: #fff;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
max-width: 600px;
width: 100%;
padding: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalMessage = styled.div``;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  `;

const LoginButton = styled(Link)`
  background-color: #ECA29F;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
`;


export default Modal;