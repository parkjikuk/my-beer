import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/store';

function Detail() {
  const { id } = useParams();
  const products = useAppSelector((state) => state.beer.data);
  const product = products.find((product) => product.id === id);

  if(!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {product.name}
      <img src={product.image} />
    </div>
  );
}

export default Detail;