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

document.addEventListener('DOMContentLoaded', () => {
  price.placeholder = housingPrice[housingType.value];
  price.min = housingPrice[housingType.value];
}, {once: true});

housingType.addEventListener('change', (evt) => {
  price.placeholder = housingPrice[evt.target.value];
  price.min = housingPrice[evt.target.value];
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});
