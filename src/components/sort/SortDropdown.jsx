import { useState } from "react";
import styled from "styled-components";

const options = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("정렬순");

const handleSelect = (option) => {
  setSelected(option);
  setOpen(false);
};

  return (
    <SortContainer>
      <SortButton onClick={() => setOpen(!open)}>
        {selected} ↕
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
              {selected === option && <span>✓</span>}
            </SortItem>
          ))}
        </SortMenu>
      )}
    </SortContainer>
  );
}

const SortContainer = styled.div`
  position: relative;

  width: 1050px;
  margin: 20px auto 0;

  display: flex;
  justify-content: flex-end;
`;

const SortButton = styled.button`
  border: none;
  background: transparent;
  color: #777;
  font-size: 12px;
  cursor: pointer;
`;

const SortMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;

  width: 110px;
  padding: 8px 0;

  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);

  z-index: 100;
`;

const SortItem = styled.div`
  padding: 8px 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
  color: ${({ $selected }) => ($selected ? "#333" : "#aaa")};
  font-weight: ${({ $selected }) => ($selected ? "700" : "400")};

  cursor: pointer;
`;