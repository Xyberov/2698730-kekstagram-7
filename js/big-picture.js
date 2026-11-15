const bigPicture = document.querySelector('.big-picture');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

const COMMENTS_STEP = 5;

let currentComments = [];
let shownCommentsCount = 0;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;
  commentElement.append(avatar);

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;
  commentElement.append(text);

  return commentElement;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);

  shownCommentsCount += nextComments.length;
  commentCountBlock.firstChild.textContent = `${shownCommentsCount} из `;

  commentsLoader.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

commentsLoader.addEventListener('click', () => {
  renderNextComments();
});

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
  closeBigPicture();
});

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  commentsList.innerHTML = '';

  currentComments = picture.comments;
  shownCommentsCount = 0;
  renderNextComments();
};

export {openBigPicture};
