import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductImage = styled.img`
  width: 181px;
  height: 237px;
  margin-bottom: 5px;
  object-fit: cover;
`;

const ProductName = styled.p`
  color: #333;
  align-self: stretch;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProductPrice = styled.p`
  color: #333;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ProductReview = styled.p`
  align-self: stretch;
  color: #7a7a7a;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  cursor: pointer;
`;

export default function ProductCard({ product, categoryType }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/item/${categoryType}/${product.id}`)}>
      <ProductImage src={product.image} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>
        {Number(product.price).toLocaleString()}원
      </ProductPrice>
      <ProductReview>리뷰 {product.reviews}</ProductReview>
    </Card>
  );
}