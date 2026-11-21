import {createPhoto} from './create-photo.js';
import {renderPictures} from './pictures.js';
import './upload-form.js';

const PHOTOS_COUNT = 25;

const photos = Array.from({length: PHOTOS_COUNT}, createPhoto);
renderPictures(photos);
