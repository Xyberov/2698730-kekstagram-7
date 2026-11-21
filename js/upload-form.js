import {initScale, destroyScale} from './scale.js';
import {initEffects, destroyEffects} from './effects.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_PATTERN = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'i');

const ErrorMessage = {
  INVALID_HASHTAG: 'Введён невалидный хэш-тег',
  HASHTAGS_COUNT: `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  DUPLICATE_HASHTAGS: 'Хэш-теги повторяются',
  DESCRIPTION_LENGTH: `Длина комментария не может быть больше ${MAX_DESCRIPTION_LENGTH} символов`,
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

const getHashtags = (value) => value
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((hashtag) => hashtag !== '');

const getHashtagsErrorMessage = (value) => {
  const hashtags = getHashtags(value);

  if (!hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag))) {
    return ErrorMessage.INVALID_HASHTAG;
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return ErrorMessage.HASHTAGS_COUNT;
  }

  if (new Set(hashtags).size !== hashtags.length) {
    return ErrorMessage.DUPLICATE_HASHTAGS;
  }

  return '';
};

const validateHashtags = (value) => getHashtagsErrorMessage(value) === '';

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(hashtagsInputElement, validateHashtags, getHashtagsErrorMessage);
pristine.addValidator(descriptionInputElement, validateDescription, ErrorMessage.DESCRIPTION_LENGTH);

const onTextFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFormElement.reset();
  pristine.reset();
  destroyScale();
  destroyEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelElement.removeEventListener('click', onUploadCancelClick);
  hashtagsInputElement.removeEventListener('keydown', onTextFieldKeydown);
  descriptionInputElement.removeEventListener('keydown', onTextFieldKeydown);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
}

function onUploadCancelClick(evt) {
  evt.preventDefault();
  closeUploadForm();
}

function onUploadFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

const openUploadForm = () => {
  initScale();
  initEffects();

  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelElement.addEventListener('click', onUploadCancelClick);
  hashtagsInputElement.addEventListener('keydown', onTextFieldKeydown);
  descriptionInputElement.addEventListener('keydown', onTextFieldKeydown);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};

uploadInputElement.addEventListener('change', () => {
  openUploadForm();
});
