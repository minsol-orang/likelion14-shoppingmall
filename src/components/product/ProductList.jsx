import ProductCard from "./ProductCard";
import { productDummy } from "../../pages/Main/productDummy";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  row-gap: 35px;     /* 위아래 줄 간격 */
  column-gap: 57px;

  padding-left: 160px;
  padding-right : 160px;
  padding-top: 61px;
`;

export default function ProductList() {
  return (
    <Container>
      {
        productDummy.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </Container>
  );
}