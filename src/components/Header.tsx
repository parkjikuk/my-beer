import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../store/store';
import { authSlice } from '../store/features/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineMenu } from "react-icons/ai";

function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.authenticated);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        dispatch(authSlice.actions.login({
          email: user.email,
          userName: user.displayName,
          userID: user.uid,
        }));
      } else {
        localStorage.removeItem('loggedInUser');
        setDisplayName(null);
        dispatch(authSlice.actions.logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);


  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user)
      setDisplayName(user.displayName);
      dispatch(authSlice.actions.login({
        email: user.email,
        userName: user.displayName,
        userID: user.uid,
      }));
    }
  }, [dispatch]);

  const logoutHandler = () => {
    signOut(firebaseAuth).then(() => {
      navigate("/login");
    }).catch((error) => {
      toast.error(error.message)
    })
  };


  return (
    <Block>
      <Link to={`/`}>
        <Logo src="https://i.ibb.co/nQCJHJq/Free-Sample-By-Wix-11zon-removebg-preview.png" alt="logo" />
      </Link>
      <NavList menuOpen={menuOpen}>
        {isLoggedIn ? 
        <>
        <UserName>{displayName} 님!</UserName>
        <NavItem as="a" href="/like">찜 맥주</NavItem>
        <NavItem as="a" href="/login" onClick={logoutHandler}>로그아웃</NavItem> 
        </>
        : <NavItem as="a" href="/login">로그인</NavItem>}
      </NavList>
      <ButtonWrapper>
        <Button onClick={() => setMenuOpen(!menuOpen)}>
          <AiOutlineMenu />
        </Button>
      </ButtonWrapper>
    </Block>
  );
}

const Block = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  background-color: #FFE4E1;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content:  space-between;
`;

const Logo = styled.img`
width: 160px;
object-fit: contain;
@media (max-width: 768px) {
  margin-left: 10px;
}
`;

const ButtonWrapper = styled.div`
@media (min-width: 769px) {
  display: none;
}
`;

const Button = styled.button`
border: none;
outline: none;
cursor: pointer;
font-size: 20px;
margin-right: 20px;
background-color: transparent;
`;

const NavList = styled.ul<{ menuOpen: boolean }>`
display: flex;
justify-content: space-between;
align-items: center;
list-style-type: none;
margin: 0;
padding: 0;

@media (max-width: 768px) {
  flex-direction: column;
  position: absolute;
  justify-content: center;
  top: 70px;
  right: ${({ menuOpen }) => (menuOpen ? '0' : '-100%')};
  width: 100%;
  height: ${({ menuOpen }) => (menuOpen ? '15vh' : '0')};
  background-color: white;
  transition: all 0.1s ease-in-out;
}
`;

const NavItem = styled.li`
  font-size: 20px;
  font-weight: 700;
  padding: 8px;
  list-style: none;
  text-decoration: none;
  color: black;
  margin-right: 10px;
  &:hover {
    color: white;
  }
`;

const UserName = styled.div`
font-size: 20px;
padding: 8px;
background-color: white;
border-radius: 10px;
font-weight: 700;

@media (max-width: 768px) {
  width: 90%;
  border-bottom: 1px solid #333;
  border-radius: 0;
}
`;





export default Header;