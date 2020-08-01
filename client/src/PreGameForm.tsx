import React from 'react';
import styled from 'styled-components';
import { DeferFn, useAsync } from 'react-async';

import Button from './Button';
import Card from './Card';
import Overlay from './Overlay';
import lobby from './lobby';


const Container = styled.div`
  width: 320px;
`;

const Input = styled.input`
  flex-grow: 1;
  font-family: Anton;
  font-size: ${props => props.theme.fontSizes[1]}px;
  border: solid 2px #0081a7;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  padding: 4px 8px;
  margin: 12px auto;
`;

type GameProps = Partial<lobby.GameProps>

interface Props {
  open: boolean
  gameId: string
  onChange: (props: GameProps) => void
}


const joinGame: DeferFn<GameProps> = async ([roomId, name]) => {
  const resp = await lobby.joinGame(roomId, name);
  return { gameID: roomId, ...resp }
}


const PreGameForm: React.FC<Props> = ({ open, gameId, onChange }) => {

  const [name, setName] = React.useState<string>(
    localStorage.getItem("name") || ""
  )

  const joinState = useAsync<GameProps>({
    deferFn: joinGame,
    onResolve: onChange,
  })

  const handleJoin = () => {
    localStorage.setItem("name", name)
    joinState.run(gameId, name)
  };

  const handleWatch = () => {
    onChange({})
  };

  return (
    <Overlay open={open}>
      <Container>
        <Card>
          <Card.Title>Join Game</Card.Title>
          <Card.Content>
            <p>
              Enter your name to join the game,
              or choose to just watch.
            </p>
            <Input
              autoFocus={true}
              placeholder="Your name"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </Card.Content>
          <Card.Footer justifyContent="space-evenly">
            <Button disabled={name.length === 0} onClick={handleJoin}>Play</Button>
            <Button onClick={handleWatch}>Watch</Button>
          </Card.Footer>
        </Card>
      </Container>
    </Overlay>
  )
}

export default PreGameForm;
