'use strict';

const getRandomInteger = function (min, max) {
  const tip = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  let result = Math.floor(Math.random() * (max - min + 1) + min);

  return (typeof min !== 'number' || min < 0 || typeof max !== 'number' || max < 0 || max <= min) ? tip : result;
};

getRandomInteger(0, 67);

const getRandomFloat = function (min, max, digits = 0) {
  const tip = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  let result = (Math.random() * (max - min + 1) + min).toFixed(digits);

  if (typeof min !== 'number' || min < 0 || typeof max !== 'number' || max < 0 || max <= min) {
    return tip;
  }

  return result;
};

getRandomFloat(0.3, 17.33, 2);
