import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, updateItem, patchItem, createItem, deleteItem } from "../../api/shop";
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
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyImageBox = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-sizing: border-box;
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
  background-color: ${({ $selected }) => ($selected ? "#d9d9d9" : "#f1f1f1")};
  color: #333;
  font-size: 12px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 8px;
  border: none;
  border-radius: 6px;
  background-color: #eeeeee;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 49.622px;
  height: 55.824px;
`;

export default function EditProduct() {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [originalProduct, setOriginalProduct] = useState(null);

  const [form, setForm] = useState({
    image: "",
    name: "",
    rating: "",
    reviews: "",
    price: "",
    size: "",
    itemType: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getItem(type, id);

        setOriginalProduct(data);

        setForm({
          image: data.image ?? "",
          name: data.name ?? "",
          rating: String(data.rating ?? ""),
          reviews: String(data.reviews ?? ""),
          price: String(data.price ?? ""),
          size: data.size ?? "",
          itemType: data.type ?? "",
        });

        setCategory(type === "clothes" ? "의류" : "신발");

        const genderKorean =
          data.gender === "male"
            ? "남성"
            : data.gender === "female"
            ? "여성"
            : "남녀공용";

        setGender(genderKorean);
        setColor(data.color ?? "");
      } catch (error) {
        console.error("상품 정보 불러오기 실패:", error);
        alert("상품 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [type, id]);

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
    // 사용자가 수정 화면에서 선택한 카테고리
    const selectedApiType = category === "의류" ? "clothes" : "shoes";

    // 현재 URL에 있는 원래 카테고리
    const originalApiType = type;

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
      type: form.itemType || (selectedApiType === "clothes" ? "shirt" : "sneakers"),
    };

    // 1. 카테고리가 그대로인 경우
    // 예: clothes → clothes
    if (selectedApiType === originalApiType) {
      await updateItem(originalApiType, id, itemData);

      alert("상품이 수정되었습니다.");
      navigate(`/item/${originalApiType}/${id}`);
      return;
    }

    // 2. 카테고리가 바뀐 경우
    // 예: clothes → shoes 또는 shoes → clothes
    const createdResult = await createItem(selectedApiType, itemData);

    await deleteItem(originalApiType, id);

    alert("상품 카테고리까지 수정되었습니다.");

    navigate(`/item/${selectedApiType}/${createdResult.id}`);
  } catch (error) {
    console.error("상품 수정 실패:", error);
    alert("상품 수정에 실패했습니다.");
  }
};

const handlePatchSubmit = async () => {
  if (!originalProduct) {
    alert("기존 상품 정보를 불러오지 못했습니다.");
    return;
  }

  try {
    const selectedApiType = category === "의류" ? "clothes" : "shoes";

    if (selectedApiType !== type) {
      alert("카테고리 변경은 부분 수정(PATCH)이 아니라 전체 수정 버튼을 사용해주세요.");
      return;
    }

    const genderValue =
      gender === "남성" ? "male" : gender === "여성" ? "female" : "unisex";

    const partialData = {};

    if (form.image !== String(originalProduct.image ?? "")) {
      partialData.image = form.image;
    }

    if (form.name !== String(originalProduct.name ?? "")) {
      partialData.name = form.name;
    }

    if (Number(form.rating) !== Number(originalProduct.rating)) {
      partialData.rating = Number(form.rating);
    }

    if (Number(form.reviews) !== Number(originalProduct.reviews)) {
      partialData.reviews = Number(form.reviews);
    }

    if (Number(form.price) !== Number(originalProduct.price)) {
      partialData.price = Number(form.price);
    }

    if (form.size !== String(originalProduct.size ?? "")) {
      partialData.size = form.size;
    }

    if (form.itemType !== String(originalProduct.type ?? "")) {
      partialData.type = form.itemType;
    }

    if (color !== String(originalProduct.color ?? "")) {
      partialData.color = color;
    }

    if (genderValue !== String(originalProduct.gender ?? "")) {
      partialData.gender = genderValue;
    }

    if (Object.keys(partialData).length === 0) {
      alert("변경된 값이 없습니다.");
      return;
    }

    await patchItem(type, id, partialData);

    alert("변경된 값만 부분 수정되었습니다.");
    navigate(`/item/${type}/${id}`);
  } catch (error) {
    console.error("상품 부분 수정 실패:", error);
    alert("상품 부분 수정에 실패했습니다.");
  }
};

  if (isLoading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <PageContainer>
      <ImageSection>
        <UploadBox>
          {form.image ? (
            <ProductImage src={form.image} alt={form.name} />
          ) : (
            <EmptyImageBox>
              <Icon src={uploadIcon} alt="upload icon" />
            </EmptyImageBox>
          )}
        </UploadBox>
      </ImageSection>

      <FormCard>
        <Title>상품 정보 수정</Title>

        <Label>이미지 URL</Label>
        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <Label>상품명</Label>
        <Input name="name" value={form.name} onChange={handleChange} />

        <Label>평점</Label>
        <Input name="rating" value={form.rating} onChange={handleChange} />

        <Label>리뷰수</Label>
        <Input name="reviews" value={form.reviews} onChange={handleChange} />

        <Label>가격</Label>
        <Input name="price" value={form.price} onChange={handleChange} />

        <Label>사이즈</Label>
        <Input name="size" value={form.size} onChange={handleChange} />

        <Label>세부 타입</Label>
        <Input
          name="itemType"
          value={form.itemType}
          onChange={handleChange}
          placeholder="shirt, jacket, sneakers 등"
        />

        <Label>종류</Label>
        <ButtonRow $columns={2}>
          {["의류", "신발"].map((item) => (
            <OptionButton
              type="button"
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
          상품 수정 완료
        </SubmitButton>
      </FormCard>
    </PageContainer>
  );
}