import React from 'react';
import './App.css';
import { connect } from 'react-redux'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { useDrag, useDrop } from 'react-dnd'

import { movePiece } from "./Game.js"

const mapDispatch = { movePiece };

function Piece({ movePiece, color, id }) {
  const [{isDragging}, drag] = useDrag({
    item: { type: "piece", color: color, id: id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if ( result ) {
        movePiece({piece: id, cell: result.cell});
      }
    },
  })

  return (
    <span
      ref={drag}
      className="piece"
      style={{
        backgroundColor: color,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1.0,
      }}>{id}</span>
  )
}

const ConnectedPiece = connect(null, mapDispatch)(Piece)


function Spacer() {
  return <div className="cell spacer" />
}


function Cell({ id, color, children }) {
  const [{isOver, canDrop}, drop] = useDrop({
      accept: "piece",
      drop: () => ({cell: id}),
      collect: mon => ({
        isOver: !!mon.isOver(),
        canDrop: !!mon.canDrop(),
      }),
      canDrop: (item, mon) => {
        return (!color || color === item.color)
      },
  })

  return (
    <div ref={drop} className="cell" style={{position: 'relative'}}>
      <div className={"spot " + color}>
        {children}
      </div>
      {isOver && canDrop && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  )
}


function App({ gameState }) {
  const cells = {
    "00": {color: "green", start: true},
    "01": {color: "green", start: true},
    "05": {},
    "06": {},
    "07": {},
    "0b": {color: "yellow", start: true},
    "0c": {color: "yellow", start: true},

    "10": {color: "green", start: true},
    "11": {color: "green", start: true},
    "15": {},
    "16": {color: "yellow"},
    "17": {},
    "1b": {color: "yellow", start: true},
    "1c": {color: "yellow", start: true},

    "25": {},
    "26": {color: "yellow"},
    "27": {},

    "35": {},
    "36": {color: "yellow"},
    "37": {},

    "45": {},
    "46": {color: "yellow"},
    "47": {},

    "50": {},
    "51": {},
    "52": {},
    "53": {},
    "54": {},
    "55": {safe: true},
    "57": {safe: true},
    "58": {},
    "59": {},
    "5a": {},
    "5b": {},
    "5c": {},

    "60": {},
    "61": {color: "green"},
    "62": {color: "green"},
    "63": {color: "green"},
    "64": {color: "green"},
    "68": {color: "blue"},
    "69": {color: "blue"},
    "6a": {color: "blue"},
    "6b": {color: "blue"},
    "6c": {},

    "70": {},
    "71": {},
    "72": {},
    "73": {},
    "74": {},
    "75": {safe: true},
    "77": {safe: true},
    "78": {},
    "79": {},
    "7a": {},
    "7b": {},
    "7c": {},

    "85": {},
    "86": {color: "red"},
    "87": {},

    "95": {},
    "96": {color: "red"},
    "97": {},

    "a5": {},
    "a6": {color: "red"},
    "a7": {},

    "b0": {color: "red", start: true},
    "b1": {color: "red", start: true},
    "b5": {},
    "b6": {color: "red"},
    "b7": {},
    "bb": {color: "blue", start: true},
    "bc": {color: "blue", start: true},

    "c0": {color: "red", start: true},
    "c1": {color: "red", start: true},
    "c5": {},
    "c6": {},
    "c7": {},
    "cb": {color: "blue", start: true},
    "cc": {color: "blue", start: true},
  }

  const pieces = {}
  for (let piece of gameState) {
    // for (let i = 0; i < gameState.pieces.length; i++) {
    // let piece = gameState.pieces[i]
    pieces[piece.cell] = <ConnectedPiece color={piece.color} id={piece.id} />
  }

  const rendered = []
  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 13; y++) {
      let key = x.toString(16) + y.toString(16)
      if (key in cells) {
        rendered.push(
          <Cell id={key} key={key} {...cells[key]}>
            {pieces[key] || null}
          </Cell>
        )
      } else {
        rendered.push(<Spacer key={key} />)
      }
    }
  }

  return (
    <DndProvider backend={Backend}>
      <div className="Board">
        {rendered}
      </div>
    </DndProvider>
  )
}

const mapStateToProps = state => ({ gameState: state })
// export default App;
export default connect(mapStateToProps)(App);
