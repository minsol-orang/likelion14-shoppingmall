import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import uploadIcon from "../../assets/icons/upload_icon.svg";
import { createItem } from "../../api/shop";

const PageContainer = styled.div`
  display: flex;
  padding: 70px 204px;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  border-right: 1.5px solid #ebebeb;
`;

const UploadBox = styled.div`
  margin-top: 65px;
  display: flex;
  width: 459px;
  height: 602px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #f0f0f0;
`;

const Icon = styled.img`
  width: 49.622px;
  height: 55.824px;
  flex-shrink: 0;
  aspect-ratio: 8/9;
  stroke-width: 5px;
  stroke: #b9b9b9;
`;

const FormCard = styled.div`
  margin-left: 169px;
  width: 320px;
  min-height: 739px;
  padding: 27px 33px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #fff;
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
  background-color: ${({ $selected }) => ($selected ? "#D9D9D9" : "#F1F1F1")};
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

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
`;

export default function AddProduct() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  const [form, setForm] = useState({
    image: "",
    name: "",
    rating: "",
    reviews: "",
    price: "",
    size: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!category) {
      alert("종류를 선택해주세요.");
      return;
    }

    if (!gender) {
      alert("성별을 선택해주세요.");
      return;
    }

    if (!color) {
      alert("색상을 선택해주세요.");
      return;
    }

    try {
      const apiType = category === "의류" ? "clothes" : "shoes";

      const genderValue =
        gender === "남성" ? "male" : gender === "여성" ? "female" : "unisex";

      const itemData = {
        image: form.image,
        name: form.name,
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        price: Number(form.price),
        soldout: false,
        color: color,
        size: form.size,
        gender: genderValue,
        type: apiType === "clothes" ? "shirt" : "sneakers",
      };

      await createItem(apiType, itemData);

      alert("상품이 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <PageContainer>
      <ImageSection>
        <UploadBox>
          {form.image ? (
            <PreviewImage src={form.image} alt="상품 이미지 미리보기" />
          ) : (
            <Icon src={uploadIcon} />
          )}
        </UploadBox>
      </ImageSection>

      <FormCard>
        <Title>상품 정보 등록</Title>

        <Label>이미지 URL</Label>
        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <Label>상품명</Label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Label>평점</Label>
        <Input
          name="rating"
          value={form.rating}
          onChange={handleChange}
        />

        <Label>리뷰수</Label>
        <Input
          name="reviews"
          value={form.reviews}
          onChange={handleChange}
        />

        <Label>가격</Label>
        <Input
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <Label>사이즈</Label>
        <Input
          name="size"
          value={form.size}
          onChange={handleChange}
        />

        <Label>종류</Label>
        <ButtonRow $columns={2}>
          <OptionButton
            type="button"
            $selected={category === "의류"}
            onClick={() => setCategory("의류")}
          >
            의류
          </OptionButton>

          <OptionButton
            type="button"
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
              type="button"
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
              type="button"
              key={item}
              $selected={color === item}
              onClick={() => setColor(item)}
            >
              {item}
            </OptionButton>
          ))}
        </ButtonRow>

        <SubmitButton type="button" onClick={handleSubmit}>
          상품 등록 완료
        </SubmitButton>
      </FormCard>
    </PageContainer>
  );
}