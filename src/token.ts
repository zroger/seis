import _ from 'lodash';

export function token(base: number, len: number): string {
  return _.range(len).map(() => Math.floor(Math.random() * base).toString(base)).join("")
}

export const token10 = _.curry(token)(10);
export const token16 = _.curry(token)(16);
