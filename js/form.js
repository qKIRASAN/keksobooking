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
const adForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
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
  adForm.classList.add('ad-form--disabled');
  deactivateFormElements(formElements);
};

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  activateFormElements(formElements);
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
  const QUANTITY_MIN = 0;
  const QUANTITY_MAX = 100;
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

deactivateForms();

document.addEventListener('DOMContentLoaded', typeChangeHandler, {once: true});
document.addEventListener('DOMContentLoaded', roomNumberLoadHandler, {once: true});
title.addEventListener('invalid', titleValidityHandler);
title.addEventListener('change', titleChangeHandler);
housingType.addEventListener('change', typeChangeHandler);
price.addEventListener('invalid', priceValidityHandler);
timeIn.addEventListener('change', timeInTimeOutChangeHandler);
timeOut.addEventListener('change', timeInTimeOutChangeHandler);
capacity.addEventListener('change', capacityChangeHandler);

export {activateForms};
