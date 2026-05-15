import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../../api/shop";
import reviewStarIcon from "../../assets/icons/review_star_icon.svg";

const DetailContainer = styled.div`
  display: flex;
  padding: 70px 204px;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  border-right: 1.5px solid #ebebeb;
`;

const ProductImage = styled.img`
  width: 459px;
  height: 602px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  width: 247px;
  height: 107px;
  padding-left: 63px;
  padding-top: 54px;
`;

const Price = styled.p`
  color: #000;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 24px;
`;

const Name = styled.p`
  color: #333;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Review = styled.p`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.img`
  width: 13px;
  height: 12px;
`;

const ReviewStar = styled.div`
  width: 41px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;

  color: #333;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ReviewCount = styled.div`
  color: #949494;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default function ProductDetail() {
  const { type, id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const data = await getItem(type, id);
        setProduct(data);
      } catch (error) {
        console.error("상품 상세 조회 실패:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductDetail();
  }, [type, id]);

  if (isLoading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <DetailContainer>
      <ImageSection>
        <ProductImage src={product.image} alt={product.name} />
      </ImageSection>

      <InfoSection>
        <Price>{Number(product.price).toLocaleString()}원</Price>
        <Name>{product.name}</Name>

        <Review>
          <ReviewStar>
            <Icon src={reviewStarIcon} />
            {product.rating}
          </ReviewStar>

          <ReviewCount>리뷰 {product.reviews}</ReviewCount>
        </Review>
      </InfoSection>
    </DetailContainer>
  );
}