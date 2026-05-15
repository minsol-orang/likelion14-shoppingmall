import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

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
  color: #6c6c6c;
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

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathParts = pathname.split("/");

  // /item/clothes/3
  // /edit/clothes/3
  // /delete/clothes/3
  const productType = pathParts[2];
  const productId = pathParts[3];

  const isMainPage = pathname === "/";
  const isAddPage = pathname.startsWith("/add");
  const isDetailPage = pathname.startsWith("/item/");
  const isEditPage = pathname.startsWith("/edit/");
  const isDeletePage = pathname.startsWith("/delete/");

  const hasProductInfo = productType && productId;

  return (
    <div>
      <HeaderContainer>
        <LogoImage src={logoUrl} onClick={() => navigate("/")} />

        <HeaderRight>
          {isMainPage && (
            <Button onClick={() => navigate("/add")}>상품등록</Button>
          )}

          {(isDetailPage || isEditPage || isDeletePage) && hasProductInfo && (
            <ButtonGroup>
              <Button onClick={() => navigate("/add")}>상품등록</Button>

              <Button onClick={() => navigate(`/delete/${productType}/${productId}`)}>
                상품삭제
              </Button>

              <Button onClick={() => navigate(`/edit/${productType}/${productId}`)}>
                상품수정
              </Button>
            </ButtonGroup>
          )}

          {isAddPage && (
            <ButtonGroup>
              <Button onClick={() => navigate("/add")}>상품등록</Button>
            </ButtonGroup>
          )}

          <HomeIcon src={homeUrl} onClick={() => navigate("/")} />
        </HeaderRight>
      </HeaderContainer>
    </div>
  );
}