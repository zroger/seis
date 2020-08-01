import styled from 'styled-components';

const Card = styled.div`
  background: #f7f6e7;
  color: #313638;
  width: 100%;
  border-radius: 8px;
  border: solid 4px #f7f6e7;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 8px;
  font-family: ${props => props.theme.fonts.body};

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 2px #313638;
    border-radius: 6px;
  }
`;

const Title = styled.header`
  color: #0081a7;
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes[2]}px;
  padding: 0 8px 7px;
  border-bottom: solid 1px #313638;
  margin-bottom: 8px;
`;

const Content = styled.div`
  margin: 8px 0;
  padding: 0 8px;
  font-family: ${props => props.theme.fonts.body};
`;

interface FooterProps {
  justifyContent?: string
}

const Footer = styled.footer<FooterProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justifyContent || 'space-between'};
  width: 100%;
  box-sizing: border-box;
  margin-top: 8px;
  padding: 0 8px;

  & > *:first-child {
    margin-left: 0;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;


export default Object.assign(Card, { Title, Content, Footer })
