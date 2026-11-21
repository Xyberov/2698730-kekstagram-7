const COMMENTS_STEP = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;
  commentElement.append(avatarElement);

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;
  commentElement.append(textElement);

  return commentElement;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsListElement.append(fragment);

  shownCommentsCount += nextComments.length;
  commentCountBlockElement.firstChild.textContent = `${shownCommentsCount} из `;

  commentsLoaderElement.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCancelButtonClick() {
  closeBigPicture();
}

const fillBigPicture = (picture) => {
  bigPictureImageElement.src = picture.url;
  likesCountElement.textContent = picture.likes;
  commentsCountElement.textContent = picture.comments.length;
  captionElement.textContent = picture.description;

  commentsListElement.innerHTML = '';
  currentComments = picture.comments;
  shownCommentsCount = 0;
  renderNextComments();
};

const openBigPicture = (picture) => {
  fillBigPicture(picture);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

export {openBigPicture};
