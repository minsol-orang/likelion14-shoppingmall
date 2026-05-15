import ProductCard from "./ProductCard";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 35px;
  column-gap: 57px;

  padding-left: 160px;
  padding-right: 160px;
  padding-top: 61px;
`;

export default function ProductList({ products, categoryType }) {
  return (
    <Container>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryType={categoryType}
        />
      ))}
    </Container>
  );
}