import {getNames, getMessages} from './data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';

let commentId = 0;

const createMessage = () => {
  const messages = getMessages();
  const count = getRandomInteger(1, 2);
  const first = getRandomArrayElement(messages);

  if (count === 1) {
    return first;
  }

  let second = getRandomArrayElement(messages);
  while (second === first) {
    second = getRandomArrayElement(messages);
  }

  return `${first} ${second}`;
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(getNames()),
});

export {createComment};
