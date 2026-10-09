import {NAMES, MESSAGES} from './data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';

let commentId = 0;

const createMessage = () => {
  const count = getRandomInteger(1, 2);
  const first = getRandomArrayElement(MESSAGES);

  if (count === 1) {
    return first;
  }

  let second = getRandomArrayElement(MESSAGES);
  while (second === first) {
    second = getRandomArrayElement(MESSAGES);
  }

  return `${first} ${second}`;
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

export {createComment};
