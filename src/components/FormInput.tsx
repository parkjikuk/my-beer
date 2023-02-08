import { IProps } from './Signup';
import styled from 'styled-components';
import { useState } from 'react';

interface IFormInput extends IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({ value, onChange, ...inputProps}: IFormInput) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  
  return (
    <FormInputContainer>
      <SignupInput 
        {...inputProps} 
        className = {inputProps.errorMessage && focused ? "error" : ""}
        id={inputProps.id.toString()} 
        onChange={onChange} 
        onBlur={handleFocus}  
        onFocus={() =>inputProps.name === "confirmPassword" && setFocused(true)}
      />
      {inputProps.errorMessage && focused && (
        <ErrorMsg>{inputProps.errorMessage}</ErrorMsg>
      )}
    </FormInputContainer>
  );
}

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
background-color: #fff;
border: none;
padding: 12px 0 12px 12px;
margin: 10px 0;
width: 100%;
`;

const ErrorMsg = styled.span`
color: red;
font-size: 12px;
display: none;
`;

const SignupInput = styled(Input)`
&:invalid.error {
  border: 1px solid red;
  ~ ${ErrorMsg} {
    display: block;
  }
}
`;



export default FormInput;
