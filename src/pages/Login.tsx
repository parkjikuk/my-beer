import { useState } from 'react';
import styled from 'styled-components';
import Overlay from '../components/Overlay';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export interface panelActive {
  panelActive: boolean;
}

function Login() {
  const [panelActive, setPanelActive] = useState(false);

  const signInBtn= () => {
    setPanelActive(false);
  };

  const signUpBtn = () => {
    setPanelActive(true);
  };

  return (
    <Container>
      <Wrapper panelActive={panelActive}>
        <Signin panelActive={panelActive}/>
        <Signup panelActive={panelActive}/>

        <Overlay signInBtn={signInBtn} signUpBtn={signUpBtn} panelActive={panelActive}/>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
display: grid;
place-items: center;
align-items: center;
height: 92.5vh;
background: url(https://cdn.pixabay.com/photo/2016/09/18/20/51/cans-1679022_960_720.jpg);
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;

const Wrapper = styled.div<panelActive>`
background-color: #e9e9e9;
height: 450px;
max-width: 750px;
border-radius: 10px;
position: relative;
width: 100%;
overflow: hidden;
`;

export default Login;