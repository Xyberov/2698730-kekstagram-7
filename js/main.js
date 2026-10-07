const NAMES = [
  'Иван',
  'Дмитрий',
  'Анастасия',
  'Мария',
  'Леонид',
  'Евгений',
  'Ярослав',
  'Сергей',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let commentId = 0;

const DESCRIPTIONS = [
  'Закат на набережной',
  'Мой кот проверяет, как я работаю',
  'Завтрак, который удался',
  'Утренний туман над рекой',
  'Случайный кадр из поездки',
  'Вид из окна в дождливый день',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

  return first + ' ' + second;
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const photos = Array.from({length: 25}, createPhoto);
console.log(photos);
