const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX = 1000000;

const housingPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.querySelectorAll('.map__filter');
const filterFeatures = filterForm.querySelector('.map__features');
const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const title = adForm.querySelector('#title');
const housingType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const deactivateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = true);
};

const activateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = false);
};

const deactivateForms = () => {
  filterForm.classList.add('map__filters--disabled');
  deactivateFormElements(filterElements);
  filterFeatures.disabled = true;
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  deactivateFormElements(adFormElements);
};

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  activateFormElements(filterElements);
  filterFeatures.disabled = false;
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  activateFormElements(adFormElements);
};

const titleValidityHandler = () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity(`Обязательное текстовое поле.
    Минимальная длина — ${TITLE_MIN_LENGTH} символов, максимальная длина — ${TITLE_MAX_LENGTH} символов`);
  } else if (title.validity.tooShort) {
    title.setCustomValidity(`Минимальная длина заголовка объявления — 30 символов.
    Необходимо ввести ещё ${TITLE_MIN_LENGTH - title.value.length} символов`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Минимальная длина заголовка объявления — 30 символов.
    Необходимо удалить ещё ${title.value.length - TITLE_MAX_LENGTH} символов`);
  } else {
    title.setCustomValidity('');
  }
};

const titleInputHandler = () => {
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

const roomNumberChangeHandler = (evt) => {
  capacity.value = evt.target.value;
  if (capacity.value < 1) {
    capacity.value = 0;
  }

  capacity.setCustomValidity('');
};

const capacityChangeHandler = () => {
  if (Number(roomNumber.value) < 100 && Number(capacity.value) < 1 || Number(capacity.value) > Number(roomNumber.value)) {
    capacity.setCustomValidity(`Укажите количество гостей. Минимальное количество - 1.
    Максимальное количество гостей - ${roomNumber.value}`);
  } else if (Number(roomNumber.value) >= 100 && Number(capacity.value) > 0) {
    capacity.setCustomValidity('Слишком много комнат. Выберите пункт "не для гостей"');
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};


deactivateForms();

document.addEventListener('DOMContentLoaded', typeChangeHandler, {once: true});
document.addEventListener('DOMContentLoaded', roomNumberLoadHandler, {once: true});
title.addEventListener('invalid', titleValidityHandler);
title.addEventListener('input', titleInputHandler);
housingType.addEventListener('change', typeChangeHandler);
price.addEventListener('invalid', priceValidityHandler);
timeIn.addEventListener('change', timeInTimeOutChangeHandler);
timeOut.addEventListener('change', timeInTimeOutChangeHandler);
roomNumber.addEventListener('change', roomNumberChangeHandler);
capacity.addEventListener('change', capacityChangeHandler);

export {activateForms};
