import styled from 'styled-components';
import { panelActive } from '../pages/Login';
import { useAppDispatch } from '../store/store';
import { Btn, Form, FormTitle } from './Signin';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';

interface User {
  email: string;
  password: string;
  name: string;
}

function Signup({panelActive}: panelActive) {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<User>({
    email: "",
    password: "",
    name: "",
  })


  const handleSignUp = async() => {
    // if(!formValues.name) {
    //   return alert('닉네임을 입력하세요');
    // }
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth,email,password)
      .then((userAuth) => {
        console.log(userAuth);
      })
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <Container panelActive={panelActive}>
      <Form>
        <FormTitle>회원가입</FormTitle>

        <SignupInput placeholder='닉네임' type='text' name='name' value={formValues.name} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})} />
        <SignupInput placeholder='이메일' type='email' name='email' value={formValues.email} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
        <SignupInput placeholder='비밀번호' type='password' name='password' value={formValues.password} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
        <Btn onClick={handleSignUp}>회원가입</Btn>
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