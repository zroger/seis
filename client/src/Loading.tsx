import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    border-top-color: #c62828;
    transform: rotate(0deg);
  }
  25% {
    border-top-color: #1565c0;
    transform: rotate(360deg);
  }
  50% {
    border-top-color: #ffab00;
    transform: rotate(720deg);
  }
  75% {
    border-top-color: #388e3c;
    transform: rotate(1080deg);
  }
  100%; {
    border-top-color: #c62828;
    transform: rotate(1440deg);
  }
`

const Spinner = styled.div`
  position: absolute;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  animation: ${rotate} 4s linear infinite;
  animation-delay: 200ms;
  box-sizing: border-box;
  border-width: 8px;
  border-style: solid;
  border-color: transparent;
`
export default Spinner;
