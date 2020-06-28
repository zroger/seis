import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';

import { CellPosition } from '../positions';
import { calculateNextPosition } from '@seis/core';
import Token from '../Token';
import { Piece } from '@seis/core/src/types';

interface Props {
  pieces: Piece[];
  action?: (pos: string) => void,
}

const buildTrail = (from: CellPosition, to: CellPosition, seat: number, max: number = 80): CellPosition[] => {
  let i = 0;
  const trail = [from];
  while (trail[trail.length - 1] !== to && i++ < max) {
    const next = calculateNextPosition(trail[trail.length - 1], seat);
    if (next === "INVALID_MOVE") {
      break;
    }
    trail.push(next);
  }
  if (trail[trail.length - 1] !== to) {
    return [from, to]
  }
  return trail;
}

const getNextPos = (current: CellPosition, final: CellPosition, seat: number): CellPosition => {
  const trail = buildTrail(current, final, seat);
  return trail.length > 1 ? trail[1] : final;
}

interface State {
  i: number;
  current: Piece[];
  targets: Record<Piece["id"], CellPosition>;
};

interface ResetAction {
  type: 'reset';
  payload: Piece[];
};

interface StepAction {
  type: 'step';
  payload: any;
};

type Action = ResetAction | StepAction;

const reducer = (state: State, action: Action): State => {
  /* const update = (current: Piece[], next: Piece[]): Piece[] => { */

  /*   // A piece is active if it has moved into a non-start position. */
  /*   const active = next.find(n => ( */
  /*     current.find(p => p.id === n.id && p.position !== n.position && n.position[0] !== "S") */
  /*   )); */
  /*   // A piece is captures if it has moved into a start position. */
  /*   const captured = next.find(n => ( */
  /*     current.find(p => p.id === n.id && p.position !== n.position && n.position[0] !== "S") */
  /*   )); */
  /*   return current.map(p => { */
  /*     if (active && p.id === active.id) { */
  /*       return {...p, position: getNextPos(p.position, active.position, p.seat)}; */
  /*     } */
  /*     if (!active && captured && p.id === captured.id) { */
  /*       return {...p, position: getNextPos(p.position, captured.position, p.seat)}; */
  /*     } */
  /*     return p; */
  /*   }) */
  /* } */

  console.log(action.type, state.i);
  switch (action.type) {
    case 'reset':
      return {
        ...state,
        i: state.i + 1,
        current: action.payload.map(p => {
          const current = state.current.find(x => x.id === p.id);

          // New piece added to the board.
          if (!current) {
            return p;
          }

          // Target didn't change.
          if (state.targets[p.id] === p.position) {
            return current;
          }

          // This piece is being captured. Wait for it.
          if (p.position[0] === "S") {
            return current;
          }

          // Target changed. Advance the position.
          return {
            ...p,
            position: getNextPos(current.position, p.position, p.seat)
          };
        }),
        targets: _.fromPairs(
          action.payload.map(p => [p.id, p.position])
        ),
      };

    case 'step':
      return {
        ...state,
        i: state.i + 1,
        current: state.current.map(p => {
          const target = state.targets[p.id];

          // Piece is at the target position.
          if (p.position === target) {
            return p;
          }

          // Piece will be captured. Delay this to a later phase.
          if (target[0] === "S") {
            return p;
          }

          // Advance the position by one.
          const next = getNextPos(p.position, target, p.seat)
          console.log("moving piece", p.id, p.position, next);
          return {...p, position: next};
        }).map((p, i, pieces) => {
          // Process captures.
          const target = state.targets[p.id];

          // Not captured.
          if (p.position === target || target[0] !== "S") {
            return p;
          }

          // The capturing piece is in position.
          const capturing = pieces.find(x => x.id !== p.id && x.position === p.position);
          if (capturing) {
            return {...p, position: target}
          }

          // Not yet.
          console.log("delaying capture", p.id, p.position);
          console.log(pieces.map(x => [x.id, x.position]));
          return p;
        }),
      };
  }

  return state;
};

const AnimatedTokenGroup: React.FC<Props> = ({pieces, action}) => {

  const [state, dispatch] = useReducer(reducer, {i: 0, current: pieces, targets: {}});

  useEffect(() => {
    console.log('useEffect');
    dispatch({type: 'reset', payload: pieces});
    /* window.requestAnimationFrame((x: any) => { */
    /*   console.log("requestAnimationFrame", x); */
    /*   dispatch({type: 'step', payload: 'from useEffect'}); */
    /* }); */
  }, [pieces]);

  const handleTransitionEnd = () => {
    dispatch({type: 'step', payload: 'from handleTransitionEnd'});
  };

  return (
    <>
      { state.current.map(p => (
        <Token
          key={p.id}
          seat={p.seat}
          pos={p.position}
          action={action}
          onTransitionEnd={handleTransitionEnd}
        />
      ))}
    </>
  );
};

export default AnimatedTokenGroup;
