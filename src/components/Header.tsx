import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';
import { useAppDispatch, useAppSeletor } from '../store/store';
import { authSlice } from '../store/features/authSlice';
import { toast } from 'react-toastify';


function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSeletor((state) => state.auth.authenticated);
  const [displayName, setDisplayName] = useState<string | null>(null);
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

  const logoutHanlder = () => {
    signOut(firebaseAuth).then(() => {
      toast.success("로그아웃 하셨습니다.");
      navigate("/");
    }).catch((error) => {
      toast.error(error.message)
    })
  };


  return (
    <Block>
      <Link to={`/`}>
        <Logo src="https://i.ibb.co/nQCJHJq/Free-Sample-By-Wix-11zon-removebg-preview.png" alt="logo" />
      </Link>
      <SearchIput type="text" />
      <NavList>
        {isLoggedIn ? 
        <>
        <NavItem as="a" href="/like">찜 맥주</NavItem>
        <NavItem as="a" href="/profile">프로필</NavItem>
        <NavItem as="a" href="/login" onClick={logoutHanlder}>로그아웃</NavItem> 
        <UserName>{displayName} 님!</UserName>
        </>
        : <NavItem as="a" href="/login">로그인</NavItem>}
      </NavList>
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
  justify-content: space-evenly;
`;

const Logo = styled.img`
width: 160px;
object-fit: contain;
margin: 0 10px;
`;

const SearchIput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 15px;
  border: 0;
  outline: 0;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
`;

const NavList = styled.ul`
  display: flex;
  align-itmes: center;
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
`;





export default Header;