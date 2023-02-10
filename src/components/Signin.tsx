import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from '../firebase/firebase';
import { panelActive } from '../pages/Login';
import { authSlice } from '../store/features/authSlice';
import { useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';

function Signin({panelActive}: panelActive) {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formValues;
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(authSlice.actions.login({
        email: user.email,
        userName: user.displayName,
        userID: user.uid,
      }))
      toast.success("로그인 성공");
      console.log(user);
      navigate("/");
    })
    .catch((error) => {
      toast.error(error.massage);
    })
  }
  
  return (
    <Container panelActive={panelActive}>
      <Form onSubmit={loginHandler}>
        <FormTitle>로그인</FormTitle>

        <SigninInput 
          placeholder='이메일' 
          type='email' name='email' 
          value={formValues.email} 
          onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}
        />
        <SigninInput 
          placeholder='비밀번호' 
          type='password' name='password' 
          value={formValues.password} 
          onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}
        />

        <Btn type="submit">로그인</Btn>
      </Form>
    </Container>
  );
}

const Container = styled.div<panelActive>`
left: 0;
width: 50%;
z-index: 2;
height: 100%;
position: absolute;
top: 0;
transition: all 0.6s ease-in-out;
opacity: ${props => props.panelActive ? '0' : '1'};
transform: ${props=> props.panelActive ? 'translateX(100%)' : null };
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
justify-content: center;
padding: 0 40px;
height: 100%;
`;

export const FormTitle = styled.h2`
font-weight: 300;
margin: 0;
margin-bottom: 1.25rem;
`;

const SigninInput = styled.input`
background-color: #fff;
border: none;
padding: 20px;
padding: 0.9rem 0.9rem;
margin: 15px 0;
width: 100%;
`;

export const Btn = styled.button`
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
margin-top: 10px;
&:active {
  transform: scale(0.95);
};
`;

export default Signin;