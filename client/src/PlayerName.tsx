import styled, { css } from 'styled-components';


interface Props {
  seat: number,
}

const PlayerName = styled.div<Props>`
  position: absolute;
  pointer-events: none;
  font-size: calc(4vw);
  font-family: Anton;
  color: rgba(0, 0, 0, .75);
  height: 8%;
  width: 30%;
  margin-top: -4%;
  margin-left: -15%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => {
    switch (props.seat) {
      case 0:
        return css`
          left: 82.5%;
          top: 17.5%;
          transform: rotate(45deg);
        `;
      case 1:
        return css`
          left: 82.5%;
          top: 82.5%;
          transform: rotate(-45deg);
        `;
      case 2:
        return css`
          left: 17.5%;
          top: 82.5%;
          transform: rotate(45deg);
        `;
      case 3:
        return css`
          left: 17.5%;
          top: 17.5%;
          transform: rotate(-45deg);
        `;
    }
  }}
`

export default PlayerName;
