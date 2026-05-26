import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductDetail from "../ProductDetail/ProductDetail";
import { deleteItem } from "../../api/shop";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.28);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  width: 296px;
  height: 136px;
  background-color: #fff;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 31px;
`;

const ModalText = styled.p`
  color: #000;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 30px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 7px;
  padding-bottom: 26px;
`;

const ModalButton = styled.button`
  display: flex;
  width: 102px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${({ $selected }) =>
    $selected ? "#D0D0D0" : "#F2F2F2"};
  cursor: pointer;
`;

export default function DeleteProduct() {
  const [selectedButton, setSelectedButton] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const { type, id } = useParams();

  const closeModal = () => {
    navigate(`/item/${type}/${id}`);
  };

  const handleDelete = async () => {
    try {
      setSelectedButton("확인");
      setIsDeleting(true);

      await deleteItem(type, id);

      alert("상품이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ProductDetail />

      <Overlay onClick={closeModal}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <ModalText>상품을 삭제하시겠습니까?</ModalText>

          <ButtonRow>
            <ModalButton
              type="button"
              $selected={selectedButton === "확인"}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중" : "확인"}
            </ModalButton>

            <ModalButton
              type="button"
              $selected={selectedButton === "취소"}
              onClick={closeModal}
              disabled={isDeleting}
            >
              취소
            </ModalButton>
          </ButtonRow>
        </ModalBox>
      </Overlay>
    </>
  );
}