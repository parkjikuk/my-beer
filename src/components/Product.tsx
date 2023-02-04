import React from 'react';
import styled from 'styled-components';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { ProductItems } from '../store/features/productSlice';

function Product({data} : {data: ProductItems}) {
  return (
    <Container>
        <ProductItem to={`/detail`}>
          <ProductImg src={data.image}/>
        </ProductItem>
        <ProductInfo>
          <ProductTitle>{data.name}</ProductTitle>
          <ProductLike>
            <BsHeart />
            {/* <BsHeartFill /> */}
          </ProductLike>
        </ProductInfo>   
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-evenly;
  width: 50%;
`;

const ProductItem = styled(Link)`
  background-color: #FFE4E1;
  height: 200px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  text-decoration: none;
`;

const ProductImg = styled.img`
  max-height: 150px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  display: flex;
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  justify-content: space-between;
  padding: 20px;
`;

const ProductTitle = styled.div`
  font-weight: 700;
  color: black;
`;

const ProductLike = styled.div`
  font-size: 25px;
  &:hover {
    color: red;
  }
`;


export default Product;