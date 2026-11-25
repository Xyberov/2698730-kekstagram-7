const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT_DIVIDER = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const setScale = (value) => {
  currentScale = value;
  scaleValueElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / PERCENT_DIVIDER})`;
};

const onSmallerButtonClick = () => {
  setScale(Math.max(currentScale - SCALE_STEP, MIN_SCALE));
};

const onBiggerButtonClick = () => {
  setScale(Math.min(currentScale + SCALE_STEP, MAX_SCALE));
};

const initScale = () => {
  setScale(DEFAULT_SCALE);
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

const destroyScale = () => {
  setScale(DEFAULT_SCALE);
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
};

export {initScale, destroyScale};
