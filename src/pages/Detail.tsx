import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Chat from '../components/Chat';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchData } from '../store/features/productSlice';
import Loading from '../components/Loading';

function Detail() {
  const { id } = useParams();
  const { data, isLoading } = useAppSelector((state) => state.beer);
  const product = data.find((product) => product.id === id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])

  return (
    <Container>
      {product && !isLoading ? (
        <BeerInfo>
          <BeerImg src={product.image} />
          <BeerName>{product.name}</BeerName>
          <BeerOrigin>{product.origin}</BeerOrigin>
          <BeerDescription>{product.description}</BeerDescription>
        </BeerInfo>
      ) : (
      <Loading />
      )}
      <ChatContainer>
        <Chat roomId={product ? product.name : ''} />
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
justify-content: center;
align-items: center;
align-self: flex-start;
height: 100%;
min-height: 100%;
background: #DFE0DF;

@media screen and (min-width: 768px) {
  flex-direction: row;
}
`;

const BeerInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80%;
padding: 1rem;
margin-top: 10px;
border-radius: 0.5rem;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease;
background: white;

@media screen and (min-width: 768px) {
  width: 30%;
}
`;

const BeerImg = styled.img`
max-width: 100%;
height: auto;
margin-bottom: 1rem;
`;

const BeerName = styled.h2`
background: #DFE0DF;
border-radius: 5px;
padding: 5px;
margin-bottom: 1rem;
`;

const BeerOrigin = styled.h3`
margin-bottom: 0.5rem;
`;

const BeerDescription = styled.div`
font-size: 1rem;
text-align: justify;
line-height: 1.5;
`;

const ChatContainer = styled.div`
width: 80%;
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;

@media screen and (min-width: 768px) {
  width: 50%;
}
`;

export default Detail;