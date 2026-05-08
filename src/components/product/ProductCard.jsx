import styled from "styled-components";

const ProductImage = styled.img`
	width : 181px;
	height: 237px;
`;

const ProductName = styled.p`
	color: #333;
  align-self: stretch;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
	margin : 0;
`;

const ProductPrice = styled.p`
	color: #000;
  align-self: stretch;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProductReview = styled.p`
	align-self: stretch;
  color: #a7a7a7;
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
`;

export default function ProductCard({ product }) {
  return (
		<Card>
			<ProductImage src={product.image} />
			<ProductName>{product.name}</ProductName>
			<ProductPrice>{product.price}</ProductPrice>
			<ProductReview>{product.review}</ProductReview>
		</Card>
  );
}