const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.querySelectorAll('.map__filter');
const filterFeatures = filterForm.querySelector('.map__features');
const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const housingType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const housingPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

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

const selectTypeChangeHandler = () => {
  price.placeholder = housingPrice[housingType.value];
  price.min = housingPrice[housingType.value];
};

const selectTimeInTimeOutChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};

deactivateForms();

document.addEventListener('DOMContentLoaded', selectTypeChangeHandler, {once: true});
housingType.addEventListener('change', selectTypeChangeHandler);
timeIn.addEventListener('change', selectTimeInTimeOutChangeHandler);
timeOut.addEventListener('change', selectTimeInTimeOutChangeHandler);

export {activateForms};
