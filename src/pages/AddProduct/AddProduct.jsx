import { useState } from "react";
import styled from "styled-components";
import uploadIcon from "../../assets/icons/upload_icon.svg";

const PageContainer = styled.div`
  display: flex;
  padding: 70px 204px;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  border-right: 1.5px solid #EBEBEB;
`;

const UploadBox = styled.div`
  margin-top : 65px;
  display: flex;
  width: 459px;
  height: 602px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #F0F0F0;
`;

const Icon = styled.img`
  width: 49.622px;
  height: 55.824px;
  flex-shrink: 0;
  aspect-ratio: 8/9;
  stroke-width: 5px;
  stroke: #B9B9B9;
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

export default function AddProduct() {

  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  
  return (
    <PageContainer>
      <ImageSection>
        <UploadBox>
          <Icon src={uploadIcon}/>
        </UploadBox>
      </ImageSection>

      <FormCard>
        <Title>상품 정보 등록</Title>

        <Label>상품명</Label>
        <Input defaultValue="" />

        <Label>평점</Label>
        <Input defaultValue="" />

        <Label>리뷰수</Label>
        <Input defaultValue="" />

        <Label>가격</Label>
        <Input defaultValue="" />

        <Label>사이즈</Label>
        <Input defaultValue="" />

        <Label>종류</Label>
<ButtonRow $columns={2}>
  <OptionButton
    $selected={category === "의류"}
    onClick={() => setCategory("의류")}
  >
    의류
  </OptionButton>

  <OptionButton
    $selected={category === "신발"}
    onClick={() => setCategory("신발")}
  >
    신발
  </OptionButton>
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
  {["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"].map((item) => (
    <OptionButton
      key={item}
      $selected={color === item}
      onClick={() => setColor(item)}
    >
      {item}
    </OptionButton>
  ))}
</ButtonRow>
        <SubmitButton>상품 등록 완료</SubmitButton>
      </FormCard>
    </PageContainer>
  );
}