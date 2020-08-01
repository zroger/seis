import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { GrFormPrevious } from "react-icons/gr";

import Controls from './GameControls';
import Board from './Board';
import lobby from './lobby';


const Container = styled.div`
  --header-height: 60px;
  --footer-height: 120px;
  --board-unit: min(calc((var(--vh) * 100 - var(--header-height) - var(--footer-height)) / 100), var(--vw));
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* justify-content: space-between; */
  height: calc(var(--vh) * 100);
  margin: 0 auto;
  width: calc(var(--board-unit) * 100);

  @media (max-width: 420px) {
    .container {
      --footer-height: 150px;
    }
  }

  & > header,
  & > main,
  & > footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  & > header {
    height: var(--header-height);
    width: 100%;
    z-index: 1;
  }
  & > footer {
    height: var(--footer-height);
    z-index: 1;
    flex-grow: 1;
  }
  & > main {
    height: calc(var(--board-unit) * 100);
    width: calc(var(--board-unit) * 100);
  }
`

const BackButton = styled.button`
  height: 36px;
  width: 36px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ede7e3bb;
  border: solid 4px #ede7e3;
  border-radius: 50%;
  color: #16697a;
  transition: transform ease-in-out 120ms;
  margin-left: 12px;
  padding: 0;

  &:hover {
    transform: scale(1.25);
  }
  & > svg {
    display: block;
  }
`;


const GameLayout = (props: any) => {
  const match = useRouteMatch<{game_id: string}>("/games/:game_id");
  const history = useHistory();

  const handleQuit= async (event: React.MouseEvent) => {
    event.preventDefault();
    const gameId =match?.params?.game_id;
    if (gameId) {
      // Don't wait for this to finish.
      lobby.leaveGame(gameId);
    }
    history.push('/')
  }

  return (
    <Container>
      <header>
        <BackButton onClick={handleQuit}>
          <GrFormPrevious />
        </BackButton>
      </header>

      <main>
        <Board {...props} />
      </main>

      <footer>
        <Controls {...props} />
      </footer>
    </Container>
  );
};

export default GameLayout;
