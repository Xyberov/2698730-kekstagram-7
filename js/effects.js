const DEFAULT_EFFECT = 'none';
const LEVEL_PRECISION = 1;

const effectToSettings = {
  none: {filter: '', min: 0, max: 100, step: 1, unit: ''},
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentEffect = effectToSettings[DEFAULT_EFFECT];

noUiSlider.create(sliderElement, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max,
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower',
  format: {
    to: (value) => Number(value.toFixed(LEVEL_PRECISION)),
    from: (value) => parseFloat(value),
  },
});

const isDefaultEffect = () => currentEffect === effectToSettings[DEFAULT_EFFECT];

const applyEffect = () => {
  const level = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = level;
  previewImageElement.style.filter = isDefaultEffect() ? '' : `${currentEffect.filter}(${level}${currentEffect.unit})`;
};

const setEffect = (effectName) => {
  currentEffect = effectToSettings[effectName];
  effectLevelElement.classList.toggle('hidden', isDefaultEffect());

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
};

sliderElement.noUiSlider.on('update', applyEffect);

const onEffectsListChange = (evt) => {
  setEffect(evt.target.value);
};

const initEffects = () => {
  setEffect(DEFAULT_EFFECT);
  effectsListElement.addEventListener('change', onEffectsListChange);
};

const destroyEffects = () => {
  setEffect(DEFAULT_EFFECT);
  effectsListElement.removeEventListener('change', onEffectsListChange);
};

export {initEffects, destroyEffects};
