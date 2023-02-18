import React, { useEffect } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import { getUserLikedBeers } from '../store/features/likeSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function Like() {
  const email = useAppSelector((state) => state.auth.email);
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
        <div>Loading...</div>
      ): (
        <Container>
          {userLikeBeers.map((beer) => {
            return <Product data={beer} />
          })}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
display:grid;
place-items: center;
grid-template-columns: 2fr 2fr 2fr 2fr;
grid-template-rows: 3fr 3fr 3fr;
width: 100%;
height: 100%;
background-color: gray;
`;

export default Like;
