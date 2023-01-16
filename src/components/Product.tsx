import React from 'react';
import styled from 'styled-components';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";

function Product() {
  return (
    <Container>
      <ProductItem>
        <Link to={`/detail`}>
          <ProductImg src="https://i.ibb.co/jD6gQ9c/01-26934467-1-removebg-preview.png" alt="product" />
        </Link>
        <ProductInfo>
          <ProductTitle>테라</ProductTitle>
          <ProductLike>
            <BsHeart />
            <BsHeartFill />
          </ProductLike>
        </ProductInfo>   
      </ProductItem>



      <ProductItem>제품2</ProductItem>
      <ProductItem>제품3</ProductItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-evenly;
`;

const ProductItem = styled.div`
  width: 27%;
  background-color: #FFE4E1;
  height: 300px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
  text-align: center;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const ProductImg = styled.img`
  max-height: 150px;
  width: 100%
  object-fit: contain;
`;

const ProductInfo = styled.div`
  display: flex;
  font-size: 25px;
  background-color: white;
  border-radius: 10px;
  justify-content: space-between;
  padding: 20px;
  margin-top: 50px;
`;

const ProductTitle = styled.div`
  font-weight: 700;
`;

const ProductLike = styled.div`
  font-size: 25px;
  &:hover {
    color: red;
  }
`;


export default Product;