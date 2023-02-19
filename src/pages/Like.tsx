import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import Product from '../components/Product';
import { getUserLikedBeers } from '../store/features/likeSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function Like() {
  const {email, userName} = useAppSelector((state) => state.auth);
  const userLikeBeers = useAppSelector((state) => state.like.likeItems);
  const isLoading = useAppSelector((state) => state.like.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedBeers());
    }

  }, [dispatch, email]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ): (
        <Block>
          <LikeTitle>{userName}님의 맥주함</LikeTitle>
          <Container>
          {userLikeBeers.map((beer) => {
            return <Product data={beer} isLiked={true}/>
          })}
          </Container>
        </Block>
      )}
    </>
  );
}

const Block = styled.div`
background-color: #412728;
`;

const Container = styled.div`
display:grid;
place-items: center;
grid-template-columns: 2fr 2fr 2fr 2fr;
grid-template-rows: 3fr 3fr 3fr;
width: 100%;
height: 100%;
`;

const LikeTitle = styled.h2`
display: inline-block;
padding: 0.5em 1em;
background-color: #B87C4C;
color: #fff;
width: fit-content;
margin: 20px 6%;
border-radius: 5px;
`;

export default Like;
