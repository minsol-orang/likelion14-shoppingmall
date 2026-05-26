import styled from "styled-components";
import Button from "../common/button/Button";
import filterDownIcon from "../../assets/icons/filter_down_icon.svg";

const filterList = ["성별", "색상", "사이즈", "가격대", "종류"];

const Filter = styled.div`
	width : 370px;
	height : 33px;
	display : flex;
	gap : 13px;
	margin-top : 22px;
	margin-left : 153px;
	justify-content : space-between;
`;

const Icon = styled.img`
	width : 10px;
	height : 5px;
`;

export default function FilterBar({ openModal }) {
  return (
		<Filter>
			{filterList.map((filterName) => (
				<Button key={filterName} onClick={() => openModal(filterName)}>
					{filterName}
					<Icon src={filterDownIcon}/>
				</Button>
			))}
		</Filter>
  );
}