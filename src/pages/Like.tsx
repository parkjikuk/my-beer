import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getUserLikedBeers } from '../store/features/likeSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function Like() {
  const email = useAppSelector((state) => state.auth.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedBeers());
    }
  }, [dispatch]);

  return (
    <Container>
      찜 페이지
    </Container>
  );
}

const Container = styled.div``;

export default Like;
