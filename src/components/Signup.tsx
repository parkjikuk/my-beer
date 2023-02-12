import styled from 'styled-components';
import { panelActive } from '../pages/Login';
import { Btn, Form, FormTitle } from './Signin';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';
import FormInput from './FormInput';
import { toast } from 'react-toastify';


export interface IInput {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface IProps {
  value: string;
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  pattern?: string;
  required?: boolean;
}

function Signup({panelActive}: panelActive) {
  const [formValues, setFormValues] = useState<IInput>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "닉네임",
      errorMessage: "닉네임은 3글자 이상 6글자 이하여야 합니다.",
      pattern: "^[A-Za-z0-9ㄱ-ㅎ가-힣]{3,6}",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "이메일",
      errorMessage: "올바른 이메일 형식이 아닙니다.",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "비밀번호",
      errorMessage: "비밀번호는 문자와 숫자가 포함되어야하며 8자 이상이여야 합니다.",
      pattern: `^.*(?=.{8,})(?=.*[0-9])(?=.*[a-zA-Z]).*$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "비밀번호 확인",
      errorMessage: "비밀번호가 일치하지 않습니다.",
      required: true,
      pattern: formValues.password,
    }
  ]


  const handleSignUp = async(e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    
      const { email, password, name } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
        firebaseAuth.signOut();
        toast.success('회원가입에 성공하셨습니다.')
        window.location.replace("/login");
        console.log(user);
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.target.name]: e.target.value});
  }

  console.log(formValues);
  return (
    <Container panelActive={panelActive}>
      <Form onSubmit={handleSignUp}>
        <FormTitle>회원가입</FormTitle>

        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={formValues[input.name as keyof IInput]} onChange={onChange} />
        ))}
        <Btn type='submit'>회원가입</Btn>
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


export default Signup;