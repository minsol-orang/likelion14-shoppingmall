import { useState } from "react";
import styled from "styled-components";
import sortDropDownIcon from "../../assets/icons/sort_drop_down_icon.svg";
import sortCheckIcon from "../../assets/icons/sort_check_icon.svg";

const options = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

const SortContainer = styled.div`
  padding-right : 160px;

  display: flex;
  justify-content: flex-end;
`;

const SortWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const SortButton = styled.button`
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  gap: 7px;

  color: #777;
  font-size: 12px;
  font-weight: 400;

  cursor: pointer;
`;

const Icon = styled.img`
  width: 10px;
  height: 11px;
`;

const SortMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;

  width: 118px;
  height: 105px;
  padding: 15px 14.5px 15px 11px;

  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  gap: 12px;

  z-index: 100;
`;

const SortItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap : 12px;

  width : 65px;
  height : 17px;

  font-size: 14px;
  line-height: normal;
  color: ${({ $selected }) => ($selected ? "#333" : "#AFAFAF")};
  font-weight: 400;
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color:${({ $selected }) => ($selected ? "#333" : "#AFAFAF")};
  cursor: pointer;
  white-space: nowrap;
`;

const CheckIcon = styled.img`
  width : 9px;
  height : 6px;
`;

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("정렬순");

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <SortContainer>
      <SortWrapper>
        <SortButton onClick={() => setOpen(!open)}>
          <span>{selected}</span>
          <Icon src={sortDropDownIcon} alt="정렬 아이콘" />
        </SortButton>

        {open && (
          <SortMenu>
            {options.map((option) => (
              <SortItem
                key={option}
                $selected={selected === option}
                onClick={() => handleSelect(option)}
              >
                <span>{option}</span>
                {selected === option && <CheckIcon src={sortCheckIcon}></CheckIcon>}
              </SortItem>
            ))}
          </SortMenu>
        )}
      </SortWrapper>
    </SortContainer>
  );
}

