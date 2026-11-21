import {getDescriptions} from './data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';
import {createComment} from './create-comment.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const descriptions = getDescriptions();

const createPhoto = (item, index) => {
  const photoId = index + 1;

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
  };
};

export {createPhoto};
