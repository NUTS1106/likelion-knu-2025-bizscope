import React from "react";
import styled from "styled-components";
import { FaBell, FaChartBar, FaCog } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  return (
    <Container>
      {/* 사이드바 */}
      <Sidebar>
        <Nav>
          <NavItem active>🏠 Home</NavItem>
          <NavItem>🔍 Explore</NavItem>
          <NavItem>📑 Business</NavItem>
          <NavItem>➕ Interactive</NavItem>
          <NavItem>⭐ Top KPIs</NavItem>
        </Nav>
        <BottomNav>
          <NavItem>⚙️ Preference</NavItem>
          <NavItem>↩️ Log out</NavItem>
        </BottomNav>
      </Sidebar>

      {/* 메인 콘텐츠 */}
      <Main>
        {/* 상단 검색 */}
        <TopBar>
          <h2>Dashboard</h2>
          <SearchWrapper>
            <SearchInput placeholder="Search Business Insights" />
            <IconGroup>
              <FaBell />
              <FaChartBar />
              <FaCog />
            </IconGroup>
          </SearchWrapper>
        </TopBar>

        {/* 카드 섹션 */}
        <CardGrid>
          <Card>
            <CardTitle>Business 101</CardTitle>
            <CardText>Understanding key metrics</CardText>
            <ProgressBar>
              <Progress style={{ width: "60%" }} />
            </ProgressBar>
            <SubText>Session 3/5 · 20 participants</SubText>
          </Card>
          <Card>
            <CardTitle>Business</CardTitle>
            <CardText>How to analyze markets?</CardText>
            <ProgressBar>
              <Progress style={{ width: "75%" }} />
            </ProgressBar>
            <SubText>Report 1/5 · 50 users</SubText>
          </Card>
          <Card>
            <CardTitle>Market Trends</CardTitle>
            <CardText>Key Performance Indicators</CardText>
            <SubText>Monthly Review Meeting</SubText>
          </Card>
          <Card>
            <CardTitle>Business Review</CardTitle>
            <CardText>Discussion with Analyst</CardText>
            <SubText>Team meeting Online</SubText>
          </Card>
        </CardGrid>

        {/* 캘린더 */}
        <SectionTitle>Your Business</SectionTitle>
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
      </Main>

      {/* 오른쪽 패널 */}
      <RightPanel>
        <PanelCard>
          <CardTitle>Current Analysis</CardTitle>
          <Placeholder>🎥 Video/Image 자리</Placeholder>
          <SubText>Active users: 60/100 · Engagement: Critical</SubText>
        </PanelCard>

        <PanelCard>
          <CardTitle>Reports</CardTitle>
          <ReportItem>📊 Quarterly Review <span>95</span></ReportItem>
          <ReportItem>💰 Sales <span>85</span></ReportItem>
          <ReportItem>📈 Financial Metrics <span>45</span></ReportItem>
        </PanelCard>

        <PanelCard>
          <CardTitle>Notifications</CardTitle>
          <p>✅ Your business proposal accepted! 🎉</p>
        </PanelCard>
      </RightPanel>
    </Container>
  );
}

/* ---------------- Styled Components ---------------- */

const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 320px; /* 사이드바 / 메인 / 오른쪽 */
  height: 100vh;
  background: #f9fafb;
`;

const Sidebar = styled.div`
  background: #d1d5db;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 12px;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavItem = styled.div<{ active?: boolean }>`
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background: ${({ active }) => (active ? "#fff" : "transparent")};
  cursor: pointer;
`;

const BottomNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Main = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
`;

const Card = styled.div`
  background: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 12px;
  color: #555;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #e5e7eb;
  border-radius: 6px;
  margin: 8px 0;
`;

const Progress = styled.div`
  height: 6px;
  background: #3b82f6;
  border-radius: 6px;
`;

const SectionTitle = styled.h3`
  margin: 20px 0 10px;
`;

const CalendarWrapper = styled.div`
  background: #e5e7eb;
  padding: 12px;
  border-radius: 8px;

  .react-calendar {
    width: 100%;
    background: #e5e7eb;
    border: none;
    font-size: 14px;
  }
`;

const RightPanel = styled.div`
  background: #f3f4f6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PanelCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

const ReportItem = styled.div`
  background: #e0f2fe;
  margin: 6px 0;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
`;

const Placeholder = styled.div`
  height: 120px;
  border: 2px dashed #999;
  border-radius: 8px;
  margin: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
`;
