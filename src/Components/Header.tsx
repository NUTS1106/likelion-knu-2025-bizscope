import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";

const HeaderWrapper = styled.header`
  flex: 0 0 60px;
  width: 100%;
  height: 60px;
  display: flex;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

const LogoName = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 500;
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuItems = styled.ul`
  display: flex;
  gap: 8px;
`;

const Item = styled.a`
  text-decoration: none;
  color: black;
`;

const ItemSpan = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

function Header() {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <FaLocationDot size={"24px"} color="#0982f0" />
        <LogoName>BizScope</LogoName>
      </LogoWrapper>
      <MenuItemsWrapper>
        <MenuItems>
          <Item href="/">
            <ItemSpan>Home</ItemSpan>
          </Item>
          <Item href="/map">
            <ItemSpan>Map</ItemSpan>
          </Item>
          <Item href="/chart">
            <ItemSpan>Chart</ItemSpan>
          </Item>
          <Item href="/logout">
            <ItemSpan>Logout</ItemSpan>
          </Item>
        </MenuItems>
      </MenuItemsWrapper>
    </HeaderWrapper>
  );
}

export default Header;
