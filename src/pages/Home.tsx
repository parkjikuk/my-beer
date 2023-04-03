import { useEffect } from 'react';
import Product from '../components/Product';
import { fetchData, ProductItems } from '../store/features/productSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import styled from 'styled-components';
import Loading from '../components/Loading';


function Home () {
  const { data, isLoading } = useAppSelector((state) => state.beer);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchData());
    
  }, [dispatch]);



  return (
    <>
      {isLoading ? <Loading /> : (
        <Container>
        {data.map((item: ProductItems) => {
          return <Product data={item} key={item.id} />;
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
background: linear-gradient(to right, #ff9a9e, #fad0c4);

@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;



export default Home;