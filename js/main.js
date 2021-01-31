'use strict';

const getRandomInteger = (min, max) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  if (typeof min !== 'number' || min < 0 || typeof max !== 'number' || max < 0 || max <= min) {
    throw new Error(error);
  }

  return result;
};

getRandomInteger(0, 67);

const getRandomFloat = (min, max, digits = 0) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = (Math.random() * (max - min + 1) + min).toFixed(digits);

  if (typeof min !== 'number' || min < 0 || typeof max !== 'number' || max < 0 || max <= min) {
    throw new Error(error);
  }

  return result;
};

getRandomFloat(0.3, 17.33, 2);
