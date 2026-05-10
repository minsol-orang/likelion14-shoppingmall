import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png"
import homeUrl from "../../assets/icons/home_icon.png"
import {useLocation, useNavigate} from "react-router-dom";

// 대문자로 시작! -> 대문자를 컨포넌트로 인식하기 때문
const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;

const HomeIcon = styled.img`
  width: 61px;
  height: 24px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  padding-right: 160px;
  padding-left: 160px;
  display: flex;
  justify-content: space-between;
    
`;

const Button = styled.div`
  color: #6C6C6C;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 400;
  margin-top: 9px;
	cursor: pointer;
`;

const HeaderRight = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  display: inline-flex;
  align-items: flex-end;
  gap: 36px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 28px;
    margin-top: 9px;
`;

export default function Header(){

  const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
  const navigate = useNavigate();
  const buttonName = "상품등록";
	const productId = pathname.split("/")[2];

  return(
   <div>
    	<HeaderContainer>
        <LogoImage src={logoUrl} onClick={() => navigate("/")}/>
        <HeaderRight>
          {pathname === "/" && (
            <Button onClick={()=>navigate("/add")}>{buttonName}</Button>
          )}
          {pathname.startsWith("/item/") && (
           	<ButtonGroup>
    					<Button onClick={() => navigate("/add")}>상품등록</Button>
    					<Button onClick={() => navigate(`/delete/${productId}`)}>상품삭제</Button>
    					<Button onClick={() => navigate(`/edit/${productId}`)}>상품수정</Button>
  					</ButtonGroup>
        	)}
					{pathname.startsWith("/edit/") && (
           	<ButtonGroup>
    					<Button onClick={() => navigate("/add")}>상품등록</Button>
    					<Button onClick={() => navigate(`/delete/${productId}`)}>상품삭제</Button>
    					<Button onClick={() => navigate(`/edit/${productId}`)}>상품수정</Button>
  					</ButtonGroup>
        	)}
					{pathname.startsWith("/add") && (
           	<ButtonGroup>
    					<Button onClick={() => navigate("/add")}>상품등록</Button>
  					</ButtonGroup>
        	)}
					{pathname.startsWith("/delete/") && (
           	<ButtonGroup>
    					<Button onClick={() => navigate("/add")}>상품등록</Button>
    					<Button onClick={() => navigate(`/delete/${productId}`)}>상품삭제</Button>
    					<Button onClick={() => navigate(`/edit/${productId}`)}>상품수정</Button>
  					</ButtonGroup>
        	)}
          <HomeIcon src={homeUrl} onClick={() => navigate("/")} />
        </HeaderRight>
      </HeaderContainer>
  </div>
    );
}

