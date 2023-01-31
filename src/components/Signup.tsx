import React from 'react';
import styled from 'styled-components';

function Signup() {
  return (
    <Container>
      <Form>
        <FormTitle>회원가입</FormTitle>

        <SignupInput placeholder='이메일'/>
        <SignupInput placeholder='비밀번호'/>
        <SignupBtn>회원가입</SignupBtn>
      </Form>
    </Container>
  );
}

const Container = styled.div`
height: 100%;
position: absolute;
width: 50%;
left: 0;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
justify-content: center;
padding: 0 40px;
`;

const FormTitle = styled.h2`
font-weight: 300;
`;

const SignupInput = styled.input`
background-color: #fff;
border: none;
padding: 20px;
padding: 0.9rem 0.9rem;
margin: 0.5rem 0;
width: 100%;
`;

const SignupBtn = styled.button`
background-color: #0367a6;
background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
border-radius: 20px;
cursor: pointer;
color: white;
font-size: 0.8rem;
font-weight: bold;
padding: 0.9rem 4rem;
transition: transform 80ms ease-in;
border: none;
margin-top: 20px;
&:active {
  transform: scale(0.95);
}
`;

export default Signup;