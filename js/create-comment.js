import {getNames, getMessages} from './data.js';
import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const MESSAGE_MIN_SENTENCES = 1;
const MESSAGE_MAX_SENTENCES = 2;

const names = getNames();
const messages = getMessages();
const generateCommentId = createIdGenerator();

const createMessage = () => {
  const sentencesCount = getRandomInteger(MESSAGE_MIN_SENTENCES, MESSAGE_MAX_SENTENCES);
  const firstMessage = getRandomArrayElement(messages);

  if (sentencesCount === MESSAGE_MIN_SENTENCES) {
    return firstMessage;
  }

  let secondMessage = getRandomArrayElement(messages);
  while (secondMessage === firstMessage) {
    secondMessage = getRandomArrayElement(messages);
  }

  return `${firstMessage} ${secondMessage}`;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(names),
});

export {createComment};
