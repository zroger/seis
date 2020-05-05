export enum DiceValue {
  one = 1,
  two,
  three,
  four,
  five,
  six,
};

export const Colors = [
  "red",
  "blue",
  "yellow",
  "green",
];


interface Coord {
  x: number,
  y: number,
}

type ICell = number[];

export interface IBoardLayout {
  boardSize: number,
  pieceSize: number,
  players: number,
  cells: ICell[],
}

export const BoardLayout4: IBoardLayout = {
  boardSize: 410,
  pieceSize: 20,
  players: 4,
  cells: [
    // 0-11, common cells, position 0
    [10, 220],
    [40, 220],
    [70, 220],
    [100, 220],
    [130, 220],
    [160, 220],
    [160, 250],
    [160, 280],
    [160, 310],
    [160, 340],
    [160, 370],
    [190, 370],

    // 12-23, common cells, position 1
    [220, 370],
    [220, 340],
    [220, 310],
    [220, 280],
    [220, 250],
    [220, 220],
    [250, 220],
    [280, 220],
    [310, 220],
    [340, 220],
    [370, 220],
    [370, 190],

    // 24-35, common cells, position 2
    [370, 160],
    [340, 160],
    [310, 160],
    [280, 160],
    [250, 160],
    [220, 160],
    [220, 130],
    [220, 100],
    [220, 70],
    [220, 40],
    [220, 10],
    [190, 10],

    // 36-47, common cell, position 3
    [160, 10],
    [160, 40],
    [160, 70],
    [160, 100],
    [160, 130],
    [160, 160],
    [130, 160],
    [100, 160],
    [70, 160],
    [40, 160],
    [10, 160],
    [10, 190],

    // 48-51, home, position 0
    [40, 190],
    [70, 190],
    [100, 190],
    [130, 190],

    // 52-55, home, position 1
    [190, 340],
    [190, 310],
    [190, 280],
    [190, 250],

    // 56-59, home, position 2
    [340, 190],
    [310, 190],
    [280, 190],
    [250, 190],

    // 60-63, home, position 3
    [190, 40],
    [190, 70],
    [190, 100],
    [190, 130],

    // 64-67, start, position 0
    [10, 310],
    [30, 330],
    [50, 350],
    [70, 370],

    // 68-71, start, position 1
    [310, 370],
    [330, 350],
    [350, 330],
    [370, 310],

    // 72-75, start, position 2
    [310, 10],
    [330, 30],
    [350, 50],
    [370, 70],

    // 76-79, start, position 3
    [10, 70],
    [30, 50],
    [50, 30],
    [70, 10],
  ],
};
