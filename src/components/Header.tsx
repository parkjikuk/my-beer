import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
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
  const [menuVisible, setMenuVisible] = useState(false);

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
      <NavTitle to={`/`}>마이비어</NavTitle>
      <NavList menuOpen={menuOpen}>
        {isLoggedIn ? 
        <>
        <UserName onClick={() => setMenuVisible(!menuVisible)}>{displayName} 님!</UserName>
        {menuVisible && (
        <ToggleMenu>
          <NavItem as="a" href="/like">
            찜 맥주
          </NavItem>
          <NavItem as="a" href="/login" onClick={logoutHandler}>
            로그아웃
          </NavItem>
        </ToggleMenu>
      )}
        </>
        : <NavItem as="a" href="/login">로그인</NavItem>}
      </NavList>
      <ButtonWrapper>
        <Button onClick={() => {
          setMenuOpen(!menuOpen);
          setMenuVisible(true);
          }}>
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
  background-color: #3B3E47;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content:  space-between;
`;

const NavTitle = styled(Link)`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #fff;
  text-decoration: none;
  margin-left: 100px;

  @media (max-width: 768px) {
    margin-left: 30px;
    font-size: 20px;
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
  margin-right: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    justify-content: center;
    top: 70px;
    left: ${({ menuOpen }) => (menuOpen ? '0' : '-101%')};
    width: 100%;
    height: ${({ menuOpen }) => (menuOpen ? 'auto' : '0')};
    background-color: white;
    transition: all 0.1s ease-in-out;
  }
`;


const ToggleMenu = styled.div`
  position:absolute;
  top: 70px;
  background-color: #3B3E47;
  width: 100px;
  padding: 5px;

  @media (max-width: 769px) {
    display: block;
    width: 100%;
    top: 0;
    padding-left: 0;
  }
`;

const NavItem = styled.li`
  display: block;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  list-style: none;
  text-decoration: none;
  padding: 10px;
  color: white;
  &:hover {
    color: #677381;
  }
`;

const UserName = styled.div`
@media (min-width: 769px) {
  font-size: 20px;
  padding: 8px;
  background-color: white;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  color: black;
  &:hover {
    border-radius: 20px;
    padding: 8px;
  }
}

@media (max-width: 768px) {
  display: none;
}
`;

export default Header;