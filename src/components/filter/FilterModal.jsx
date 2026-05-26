import styled from "styled-components";
import closeIcon from "../../assets/icons/close_icon.svg";
import Button from "../common/button/Button";

const modalOption = {
  성별: [["남성", "여성", "남녀공용"]],
  색상: [
    ["red", "pink", "blue"],
    ["black", "gray", "denim"],
    ["multi", "rainbow", "holographic"],
  ],
  사이즈: [
    ["9", "10"],
    ["S", "M", "L", "XL"],
  ],
  가격대: [["0~30", "31~60", "60~90"]],
  종류: [["의류", "신발"]],
};

const Overlay = styled.div`
  background-color: rgba(125, 125, 125, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  inset: 0;
  position: fixed;
`;

const ModalBox = styled.div`
  min-height: 156px;
  min-width: 256px;

  border-radius: 25px;
  background: #fff;
  padding-right: 35px;
  padding-top: 30px;
  padding-left: 35px;
  padding-bottom: 48px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding-bottom: 26px;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  line-height: normal;
  color: black;
`;

const CloseButton = styled.img`
  cursor: pointer;

  width: 13px;
  height: 13px;
`;

const ModalOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 14px;
`;

export default function FilterModal({ modalType, closeModal, onSelectFilter }) {
  return (
    <Overlay onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{modalType}</ModalTitle>
          <CloseButton onClick={closeModal} src={closeIcon} />
        </ModalHeader>

        <ModalOption>
          {modalOption[modalType].map((row, rowIndex) => (
            <OptionRow key={rowIndex}>
              {row.map((option) => (
                <Button
                  key={option}
                  onClick={() => onSelectFilter(modalType, option)}
                >
                  {option}
                </Button>
              ))}
            </OptionRow>
          ))}
        </ModalOption>
      </ModalBox>
    </Overlay>
  );
}