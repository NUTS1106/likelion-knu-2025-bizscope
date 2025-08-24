import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Wrapper>
      <Content>
        <Title>404 - Page Not Found</Title>
        <Message>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Message>
        <StyledLink to="/">홈으로 돌아가기</StyledLink>
      </Content>
    </Wrapper>
  );
}

/* styled-components */

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: #007bff;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: #0056b3;
  }
`;
