import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

function Header() {
  return (
    <Block>
      <Link to={`/`}>
        <Logo src="https://i.ibb.co/nQCJHJq/Free-Sample-By-Wix-11zon-removebg-preview.png" alt="logo" />
      </Link>
      <SearchIput type="text" />

      <NavList>
        <NavItem as="a" href="/like">찜 맥주</NavItem>
        <NavItem as="a" href="/">프로필</NavItem>
        <NavItem as="a" href="/">로그인</NavItem>
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
  z-index: 10;
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





export default Header;