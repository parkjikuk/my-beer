import React, { useEffect} from 'react';
import Product from '../components/Product';
import { fetchData, ProductItems } from '../store/features/productSlice';
import { useAppDispatch, useAppSeletor } from '../store/store';
import styled from 'styled-components';


function Home () {
  const dispatch = useAppDispatch();
  const beers = useAppSeletor((state) => state.beer.data);
  
  useEffect(() => {
    dispatch(fetchData());
    
  }, [dispatch]);

  console.log(beers);
  return (
    <Container>
      {beers.map((item: ProductItems) => {
        return <Product data={item} key={item.name}/>
      })}
    </Container>
  );
}

const Container = styled.div`
display:grid;
place-items: center;
grid-template-columns: 2fr 2fr 2fr 2fr;
grid-template-rows: 3fr 3fr 3fr;
width: 100%;
height: 100%;
background-color: #ECA29F;
`;



export default Home;