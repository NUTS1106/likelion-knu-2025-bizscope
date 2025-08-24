import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function UserDashboard() {
  return (
    <Container>
      {/* 상단 네비게이션 바 */}
      <Header>
        <Logo>📊 DaeguBizInsights</Logo>
        <Nav>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
          <StyledNavLink to="/business">Business District Analysis</StyledNavLink>
          <StyledNavLink to="/report">Business Report</StyledNavLink>
        </Nav>
        <RightIcons>
          <span>🔔 Notifications</span>
        </RightIcons>
      </Header>

      {/* 메인 콘텐츠 */}
      <Main>
        <CardWrapper>
          <Card>
            <CardTitle>Monthly Revenue</CardTitle>
            <ChartPlaceholder>📈</ChartPlaceholder>
            <CardText>
              Your revenue this month has increased by 15% compared to the last
              month.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Customer Growth</CardTitle>
            <ChartPlaceholder>📉</ChartPlaceholder>
            <CardText>You’ve gained 120 new customers this quarter.</CardText>
          </Card>

          <Card>
            <CardTitle>Market Trends</CardTitle>
            <ChartPlaceholder>📊</ChartPlaceholder>
            <CardText>
              Explore the latest trends in the market relevant to your business.
            </CardText>
          </Card>
        </CardWrapper>

        {/* Notifications */}
        <SectionTitle>Notifications</SectionTitle>
        <NotificationBox>
          You have <strong>3</strong> new suggested actions to improve your
          business performance.
        </NotificationBox>
      </Main>

      {/* 푸터 */}
      <Footer>
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Contact Support</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterSection>
      </Footer>
    </Container>
  );
}

/* styled-components */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
  background: #f7f7f7;
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 30px;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

/* NavLink 자동 활성화 */
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: normal;
  color: #333;
  cursor: pointer;

  &.active {
    font-weight: bold;
    color: #007bff;
  }

  &:hover {
    color: #0056b3;
  }
`;

const RightIcons = styled.div`
  font-size: 14px;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px; /* 내용 최대 너비 제한 */
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto; /* 세로 스크롤 자동 */
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 20px;
  margin-bottom: 40px;
  justify-content: space-between;
`;

const Card = styled.div`
  flex: 1;
  min-width: 280px;  /* 최소 크기 */
  max-width: 32%;    /* 화면이 넓으면 3개 배치 */
  background: #e6f0fa;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 15px;
`;

const ChartPlaceholder = styled.div`
  font-size: 40px;
  text-align: center;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  font-size: 14px;
  color: #333;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const NotificationBox = styled.div`
  background: #eef4ff;
  border-left: 4px solid #007bff;
  padding: 15px;
  border-radius: 6px;
  font-size: 14px;
`;

const Footer = styled.footer`
  background: #f1f1f1;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  gap: 20px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
`;

const FooterTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  font-size: 12px;
  color: #007bff;
  cursor: pointer;
  margin-bottom: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
