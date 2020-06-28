export interface Marble {
  key: string,
  name: string,
  images: string[],
  color: string,
}

export const marbles: Marble[] = [
  {
    key: 'constellation-purple',
    name: 'Constellation Purple',
    images: [
      'ConstellationPurple1.jpg',
      'ConstellationPurple2.jpg',
      'ConstellationPurple3.jpg',
    ],
    color: 'purple',
  },
];



