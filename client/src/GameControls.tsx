import React from 'react';
import { Ctx } from 'boardgame.io';
import styled, { css } from 'styled-components';
import Color from 'color';

import { IG, getCurrentPlayer } from '@seis/core';
import Button2 from './Button';
import DiceIcon from './DiceIcon';
import GameOver from './GameOver';

const Root = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 8px;

  @media (max-width: 420px) {
    width: 300px;
  }
`;

const Info = styled.div`
  padding: 16px 8px 4px;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: solid 1px #555;
  flex-grow: 0;
  color: #ffcc80;
  font-family: Anton;
  font-size: 16px;
  border-bottom: solid 1px #ffcc80;
`;

const Main = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-content: flex-start;
  justify-content: center;

  @media (max-width: 420px) {
    flex-flow: row wrap;
  }
`;

const variants = {
  default: { primary: "#cfd8dc", secondary: "#263238"},
  red: { primary: "#c62828", secondary: "#fff"},
  blue: { primary: "#1565c0", secondary: "#fff"},
  yellow: { primary: "#ffab00", secondary: "#fff"},
  green: { primary: "#388e3c", secondary: "#fff"},
}

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants,
  disabled?: boolean,
}

const Button = styled.div<ButtonProps>`
  --primary: #cfd8dc;
  --secondary: #263238;
  background-color: ${({ variant = "default"}) => variants[variant].primary};
  /* background-image: radial-gradient( */
  /*   ellipse farthest-corner, */
  /*   transparent 50%, */
  /*   rgba(0, 0, 0, 0.25) */
  /* ); */
  border-color: ${({ variant = "default"}) => Color(variants[variant].primary).darken(0.5).hex()};
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  box-sizing: border-box;
  color: ${({ variant = "default"}) => variants[variant].secondary};
  font-family: "Anton";
  font-size: 24px;
  height: 40px;
  line-height: 37px;
  text-align: center;
  min-width: 40px;
  transition: transform 200ms ease-in-out;

  & > svg {
    height: 100%;
    width: 100%;
    fill: ${({ variant = "default"}) => variants[variant].secondary};
  }

  ${({ disabled = false }) => disabled ? css`
    cursor: not-allowed;
    opacity: 0.25;
  ` : css`
    &:hover {
      transform: scale(1.5);
    }
  `}
`

const RollButton = styled(Button)`
  width: 80px;
  margin: 10px 20px;
  order: 0;
`;

const PassButton = styled(Button)`
  width: 80px;
  margin: 10px 20px;
  order: 7;
  @media (max-width: 420px) {
    order: 3;
  }
`;

const DiceButton = styled(Button2)<{value: number}>`
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 10px 5px;
  order: ${props => props.value};
`;


interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
] as const;

const Controls: React.FC<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata = []
}) => {
  const currentPlayer = getCurrentPlayer(G, ctx);
  const variant = currentPlayer ? colors[currentPlayer.seat] : "default";

  return (
    <Root>
      <Info>
        { ctx.gameover && 'Game Over' }
        { ctx.phase === "play" && isActive && 'Your turn' }
        { ctx.phase === "play" && !isActive && `${currentPlayer?.name}'s turn` }
        { ctx.phase === "setup" && isActive && 'Choose your color' }
        { ctx.phase === "setup" && !isActive && 'Waiting for other players' }
      </Info>

      <Main>
        { ctx.gameover && (
          <GameOver winner={ctx.gameover.name} />
        )}
        { ctx.phase === "play" && (
          <>
            <RollButton
              onClick={() => { moves.rollDie()}}
              disabled={!isActive || !!G.dieRoll}
              variant={variant}
            >
              ROLL
            </RollButton>
            {([1, 2, 3, 4, 5, 6] as const).map(i => (
              <DiceButton
                key={i}
                value={i}
                onClick={() => { moves.rollDie(i) }}
                disabled={!isActive || !!G.dieRoll}
                variant={variant === "default" ? "primary" : variant}
              >
                <DiceIcon value={i} />
              </DiceButton>
            ))}
            <PassButton
              onClick={() => { moves.Pass()}}
              disabled={!isActive}
              variant={variant}
            >
              PASS
            </PassButton>
          </>
        )}
        { ctx.phase === "setup" && isActive && (
          colors.map((color, seat) => (
            <DiceButton
              key={seat}
              value={seat}
              onClick={() => {
                const meta = gameMetadata.find(p => "" + p.id === playerID);
                moves.ChooseSeat(seat, meta?.name || `Player  ${seat + 1}`);
              }}
              variant={color}
              disabled={!!G.players.find(p => p.seat === seat)}
            >
              <DiceIcon value={([1, 2, 3, 4] as const)[seat]} />
            </DiceButton>
          ))
        )}
      </Main>
    </Root>
  );
};

export default Controls;
