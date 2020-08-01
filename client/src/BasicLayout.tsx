import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  width: 320px;
  margin: 0 auto;
  color: #fdfcdc;
  font-family: Anton;

  & > * {
    margin-bottom: 16px;
  }
`

const Header = styled.h1`
  font-family: Anton;
  font-size: 48px;
  position: relative;
  color: #0081a7;
  margin: 16px 0;

  &::before {
    content: "¡seis!";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 12px #fdfcdc;
  }
  & > a {
    text-decoration: none;
    position: relative;
    z-index: 1;
    color: #0081a7;
  }
`

const BasicLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <Link to="/">¡seis!</Link>
      </Header>
      { children }
    </Container>
  )
};

export default BasicLayout;
