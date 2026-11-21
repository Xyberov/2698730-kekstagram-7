import {openBigPicture} from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = pictureElement.querySelector('.picture__img');

  pictureImageElement.src = picture.url;
  pictureImageElement.alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPictureElement(picture));
  });

  picturesContainerElement.append(fragment);
};

export {renderPictures};
