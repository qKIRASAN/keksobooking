import {toggleDisabled} from './util.js';
import {sendData} from './api.js';
import {resetMapToInitial} from './map.js';
import {resetFilterForm} from './filter-form.js'
import {createMessageOnSuccess, createMessageOnFailure} from './message.js';
import {resetImage} from './upload-picture.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX = 1000000;
const QUANTITY_MIN = 0;
const QUANTITY_MAX = 100;

const housingPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form-header, .ad-form__element');
const title = adForm.querySelector('#title');
const housingType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

const deactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  toggleDisabled(formElements, true);
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleDisabled(formElements, false);
};

const titleValidityHandler = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity(`Обязательное текстовое поле.
    Минимальная длина — ${TITLE_MIN_LENGTH} символов, максимальная длина — ${TITLE_MAX_LENGTH} символов`);
  }
};

const titleChangeHandler = () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Минимальная длина заголовка объявления — ${TITLE_MIN_LENGTH} символов.
    Необходимо ввести ещё ${TITLE_MIN_LENGTH - title.value.length} символов`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Минимальная длина заголовка объявления — ${TITLE_MIN_LENGTH} символов.
    Необходимо удалить ещё ${title.value.length - TITLE_MAX_LENGTH} символов`);
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
};

const typeChangeHandler = () => {
  price.placeholder = housingPrice[housingType.value];
  price.min = housingPrice[housingType.value];
};

const priceValidityHandler = () => {
  if (price.validity.valueMissing) {
    price.setCustomValidity(`Обязательное поле. Максимальная цена — ${PRICE_MAX}`);
  } else {
    price.setCustomValidity('');
  }
};

const timeInTimeOutChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};

const roomNumberLoadHandler = () => {
  capacity.value = roomNumber.value;
};

const capacityChangeHandler = () => {
  const roomNumberValue = Number(roomNumber.value);
  const capacityValue = Number(capacity.value);

  if (roomNumberValue < QUANTITY_MAX && capacityValue < 1 || capacityValue > roomNumberValue) {
    capacity.setCustomValidity(`Укажите количество гостей. Минимальное количество - 1.
    Максимальное количество гостей - ${roomNumber.value}`);
  } else if (roomNumberValue >= QUANTITY_MAX && capacityValue > QUANTITY_MIN) {
    capacity.setCustomValidity('Слишком много комнат. Выберите пункт "не для гостей"');
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

const submitFormHandler = (evt) => {
  const formData = new FormData(evt.target);

  evt.preventDefault();
  sendData(createMessageOnSuccess, createMessageOnFailure, formData);
};

const resetFormHandler = (evt) => {
  if (evt) {
    evt.preventDefault();
  }

  adForm.reset();
  resetImage();
  typeChangeHandler();
  resetMapToInitial();
  resetFilterForm();
};

deactivateAdForm();

document.addEventListener('DOMContentLoaded', typeChangeHandler, {once: true});
document.addEventListener('DOMContentLoaded', roomNumberLoadHandler, {once: true});
title.addEventListener('invalid', titleValidityHandler);
title.addEventListener('change', titleChangeHandler);
housingType.addEventListener('change', typeChangeHandler);
price.addEventListener('invalid', priceValidityHandler);
timeIn.addEventListener('change', timeInTimeOutChangeHandler);
timeOut.addEventListener('change', timeInTimeOutChangeHandler);
capacity.addEventListener('change', capacityChangeHandler);
adForm.addEventListener('submit', submitFormHandler);
resetButton.addEventListener('click', resetFormHandler);

export {activateAdForm, resetFormHandler}
