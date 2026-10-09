import {DESCRIPTIONS} from './data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';
import {createComment} from './create-comment.js';

const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

export {createPhoto};
