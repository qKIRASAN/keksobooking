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

const syncPrice = () => {
  price.placeholder = housingPrice[housingType.value];
  price.min = housingPrice[housingType.value];
};

const syncTime = (evt) => {
  if (timeIn) {
    timeOut.value = evt.target.value;
  }

  if (timeOut) {
    timeIn.value = evt.target.value;
  }
};

document.addEventListener('DOMContentLoaded', syncPrice, {once: true});

housingType.addEventListener('change', syncPrice);

timeIn.addEventListener('change', syncTime);

timeOut.addEventListener('change', syncTime);
