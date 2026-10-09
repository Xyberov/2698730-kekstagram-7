import {createPhoto} from './create-photo.js';

const photos = Array.from({length: 25}, createPhoto);
console.log(photos);
