const housingType = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const housingPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElements = document.querySelectorAll('.ad-form__element');
const filterForm = document.querySelector('.map__filters');
const filterElements = document.querySelectorAll('.map__filter');
const filterFeatures = document.querySelector('.map__features');

const selectTypeChangeHandler = () => {
  price.placeholder = housingPrice[housingType.value];
  price.min = housingPrice[housingType.value];
};

const selectTimeInTimeOutChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};

adForm.classList.add('ad-form--disabled');
adFormHeader.setAttribute('disabled', '');
adFormElements.forEach((element) => element.setAttribute('disabled', ''));
filterForm.classList.add('map__filters--disabled');
filterElements.forEach((element) => element.setAttribute('disabled', ''));
filterFeatures.setAttribute('disabled', '');

document.addEventListener('DOMContentLoaded', selectTypeChangeHandler, {once: true});
housingType.addEventListener('change', selectTypeChangeHandler);
timeIn.addEventListener('change', selectTimeInTimeOutChangeHandler);
timeOut.addEventListener('change', selectTimeInTimeOutChangeHandler);

export {
  adForm,
  adFormHeader,
  adFormElements,
  filterForm,
  filterElements,
  filterFeatures
};
