import React, { useState } from 'react';
import styled from 'styled-components';
import { Btn } from './Signin';
import { panelActive } from '../pages/Login';

interface Props {
  panelActive: boolean;
  signInBtn: () => void;
  signUpBtn: () => void;
}

function Overlay({signInBtn , signUpBtn, panelActive} : Props) {


  return (
    <Container panelActive={panelActive}>
      <OverlayWrapper panelActive={panelActive}>
        <OverlayLeft panelActive={panelActive}>
          <Btn id='SignIn' onClick={signInBtn}>로그인</Btn>
        </OverlayLeft>

        <OverlayRight panelActive={panelActive}>
          <Btn id='SigUp' onClick={signUpBtn}>회원가입</Btn>
        </OverlayRight>
      </OverlayWrapper>
    </Container>
  );
}

const Container = styled.div<panelActive>`
height: 100%;
left: 50%;
overflow: hidden;
position: absolute;
width: 50%;
top: 0;
transition: transform 0.6s ease-in-out;
z-index: 100;
transform: ${props=> props.panelActive ? 'translateX(-100%)' : null };
`;

const OverlayWrapper = styled.div<panelActive>`
background: url("https://cdn.pixabay.com/photo/2018/09/29/16/22/beer-3711733_960_720.jpg");
height: 100%;
left: -100%;
width: 200%;
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
position: relative;
transform: ${props=> props.panelActive ? 'translateX(50%)' : 'translateX(0)' };
transition: transform 0.6s ease-in-out;
`;

const OverlayPanel = styled.div`
align-items: center;
justify-content: center;
display: flex;
height: 100%;
position: absolute;
text-align: center;
width: 50%;
top: 0;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
flex-direction: column;
`;

const OverlayLeft = styled(OverlayPanel)<panelActive>`
transform: ${props=> props.panelActive ? 'translateX(0)' : 'translateX(-20%)'};
`;

const OverlayRight = styled(OverlayPanel)<panelActive>`
right: 0;
transform: ${props=> props.panelActive ? 'translateX(20%)' : 'translateX(0)'};
`;

export default Overlay;