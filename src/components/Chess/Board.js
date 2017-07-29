import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import T from 'prop-types';
import Knight from './Knight';
import Square from './Square';
import BoardSquare from './BoardSquare';
import { canMoveKnight, moveKnight } from './Game';

class Board extends Component {
  renderSquare(index) {
    const x = index % 8;
    const y = Math.floor(index / 8);

    return (
      <div
        key={index}
        style={{ width: '12.5%', height: '12.5%' }}
      >
        <BoardSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  handleSquareClick(toX, toY) {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: T.arrayOf(
    T.number.isRequired,
  ).isRequired,
};

export default DragDropContext(HTML5Backend)(Board);
