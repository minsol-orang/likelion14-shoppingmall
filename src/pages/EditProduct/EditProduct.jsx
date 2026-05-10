import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { productDummy } from "../Main/productDummy";
import uploadIcon from "../../assets/icons/upload_icon.svg";


const PageContainer = styled.div`
  display: flex;
  padding: 70px 160px;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #eeeeee;
`;

const UploadBox = styled.div`
  width: 459px;
  height: 602px;
  border: 1px solid #dddddd;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProductImage = styled.img`
  width: 360px;
  height: 480px;
  object-fit: contain;
`;

const FormCard = styled.div`
  margin-left : 169px;
  width: 285px;
  height : 739px;
  padding: 27px 33px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 28px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 28px;
  margin-bottom: 14px;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 8px;
  margin-bottom: 14px;
`;

const OptionButton = styled.button`
  height: 28px;
  border: none;
  border-radius: 6px;
  background-color: ${({ $selected }) =>
    $selected ? "#D9D9D9" : "#F1F1F1"};
  color: #333;
  font-size: 12px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: #eeeeee;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 49.622px;
  height: 55.824px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function EditProduct() {
  const { id } = useParams();

  const product = productDummy.find(
    (item) => item.id === Number(id)
  );

  const [category, setCategory] = useState(product?.category || "신발");
  const [gender, setGender] = useState(product?.gender || "여성");
  const [color, setColor] = useState(product?.color || "black");

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <PageContainer>
      <ImageSection>
        <UploadBox>
          <ProductImage src={product.image} alt={product.name} />
          <Icon src={uploadIcon} alt="upload icon" />
        </UploadBox>
      </ImageSection>

      <FormCard>
        <Title>상품 정보 수정</Title>

        <Label>상품명</Label>
        <Input defaultValue={product.name} />

        <Label>평점</Label>
        <Input defaultValue={product.rating || "4.7"} />

        <Label>리뷰수</Label>
        <Input defaultValue={product.reviewCount} />

        <Label>가격</Label>
        <Input defaultValue={product.price} />

        <Label>사이즈</Label>
        <Input defaultValue={product.size || "9"} />

        <Label>종류</Label>
        <ButtonRow $columns={2}>
          {["의류", "신발"].map((item) => (
            <OptionButton
              key={item}
              $selected={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </OptionButton>
          ))}
        </ButtonRow>

        <Label>성별</Label>
        <ButtonRow $columns={3}>
          {["남성", "여성", "남녀공용"].map((item) => (
            <OptionButton
              key={item}
              $selected={gender === item}
              onClick={() => setGender(item)}
            >
              {item}
            </OptionButton>
          ))}
        </ButtonRow>

        <Label>색상</Label>
        <ButtonRow $columns={3}>
          {[
            "red",
            "pink",
            "blue",
            "gray",
            "black",
            "denim",
            "multi",
            "rainbow",
            "holographic",
          ].map((item) => (
            <OptionButton
              key={item}
              $selected={color === item}
              onClick={() => setColor(item)}
            >
              {item}
            </OptionButton>
          ))}
        </ButtonRow>

        <SubmitButton>상품 수정 완료</SubmitButton>
      </FormCard>
    </PageContainer>
  );
}