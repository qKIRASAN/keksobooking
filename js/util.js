const getRandomInteger = (min, max) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return result;
};

const getRandomFloat = (min, max, digits = 5) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = (Math.random() * (max - min + 1) + min).toFixed(digits);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return +result;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getUniqueArrayElements = (elements) => {
  const randomArray = new Array(getRandomInteger(1, elements.length)).fill(null).map(() => {
    return getRandomArrayElement(elements);
  });

  return [...new Set(randomArray)];
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getUniqueArrayElements};
