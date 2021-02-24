const NUMBER_OF_DECIMALS = 5;

const getRandomInteger = (min, max) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return result;
};

const getRandomFloat = (min, max, digits = NUMBER_OF_DECIMALS) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = (Math.random() * (max - min) + min).toFixed(digits);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return +result;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getUniqueArrayElements = (elements) => {
  const randomArray = new Array(getRandomInteger(0, elements.length)).fill(null).map(() => {
    return getRandomArrayElement(elements);
  });

  return [...new Set(randomArray)];
};

const getDeclensionOfNouns = (number, nouns) => {
  number = Math.abs(number);

  if (number > 20) {
    number %= 10;
  }

  if (number > 100) {
    number %= 100;
  }

  switch (number) {
    case 1:
      return nouns[0];
    case 2:
    case 3:
    case 4:
      return nouns[1];
    default:
      return nouns[2];
  }
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getUniqueArrayElements,
  getDeclensionOfNouns
};
