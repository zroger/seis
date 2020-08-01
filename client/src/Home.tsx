import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import BasicLayout from './BasicLayout';
import Button from './Button';
import Card from './Card';
import lobby from './lobby';


const CardButton = styled(Button)`
  margin-left: 8px;
`;

const PlayerLabel = styled.div`
  flex-grow: 1;
  padding: 4px 0px;
  font-size: ${props => props.theme.fontSizes[1]}px;
`;

const Input = styled.input`
  flex-grow: 1;
  font-family: Anton;
  font-size: ${props => props.theme.fontSizes[1]}px;
  border: solid 2px #0081a7;
  border-radius: 4px;
  width: 60%;
  letter-spacing: 12px;
  padding: 4px 8px;
`;

const Home: React.FC<{}> = () => {
  const history = useHistory();
  const go = (path: string) => () => {
    history.push(path);
  }

  const createGame = (num: number) => async () => {
    const id = await(lobby.createRoom(num))
    history.push(`/games/${id}`);
  }

  const [gameId, setGameId] = React.useState<string>("");
  const joinGame = () => {
    history.push(`/games/${gameId}`);
  }

  return (
    <BasicLayout>
      <Card>
        <Card.Title>Single Player</Card.Title>
        <Card.Footer>
          <div style={{fontFamily: '-apple-system'}}>Play 1 on 1 versus a bot</div>
          <CardButton onClick={ go("/offline") }>Play</CardButton>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Title>Create a Game</Card.Title>
        <Card.Content>
          Create a new game to play with friends
        </Card.Content>
        <Card.Footer>
          <PlayerLabel># of Players</PlayerLabel>
          <CardButton onClick={ createGame(2) }>2</CardButton>
          <CardButton onClick={ createGame(3) }>3</CardButton>
          <CardButton onClick={ createGame(4) }>4</CardButton>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Title>Join a Game</Card.Title>
        <Card.Content>
          Join an online game using the 6-digit game code
        </Card.Content>
        <Card.Footer>
          <Input
            type="text"
            value={gameId}
            onChange={e => {setGameId(e.target.value)}}
            maxLength={6}
            inputMode="numeric"
          />
          <CardButton onClick={joinGame}>Go</CardButton>
        </Card.Footer>
      </Card>
    </BasicLayout>
  )
};

export default Home;
