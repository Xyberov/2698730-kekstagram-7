const getRandomInteger = (rangeStart, rangeEnd) => {
  const lowerBound = Math.ceil(Math.min(rangeStart, rangeEnd));
  const upperBound = Math.floor(Math.max(rangeStart, rangeEnd));
  const result = Math.random() * (upperBound - lowerBound + 1) + lowerBound;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
