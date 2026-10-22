import {createPhoto} from './create-photo.js';
import {renderPictures} from './pictures.js';

const photos = Array.from({length: 25}, createPhoto);
renderPictures(photos);
