import styled from 'styled-components';
import { panelActive } from '../pages/Login';
import { Btn, Form, FormTitle } from './Signin';

function Signup({panelActive}: panelActive) {
  return (
    <Container panelActive={panelActive}>
      <Form>
        <FormTitle>회원가입</FormTitle>

        <SignupInput placeholder='이메일'/>
        <SignupInput placeholder='비밀번호'/>
        <Btn>회원가입</Btn>
      </Form>

    </Container>
  );
}


const Container = styled.div<panelActive>`
left: 0;
width: 50%;
height: 100%;
position: absolute;
top: 0;
transition: all 0.6s ease-in-out;
transform: ${props=> props.panelActive ? 'translateX(100%)' : null };
opacity: ${props => props.panelActive ? '1' : '0'};
z-index: ${props => props.panelActive ? '5' : '1'};
`;

const SignupInput = styled.input`
background-color: #fff;
border: none;
padding: 20px;
padding: 0.9rem 0.9rem;
margin: 15px 0;
width: 100%;
`;


export default Signup;