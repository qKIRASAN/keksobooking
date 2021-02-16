const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;

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

const getTypeOfHousing = (typeOfHousing) => {
  switch(typeOfHousing) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case  'house':
      return 'Дом';
    case  'bungalow':
      return 'Бунгало';
  }
};

const checkRoomsQuantity = (quantity) => {
  if (quantity === 1) {
    return `${quantity} комната`;
  }

  if (quantity >= 5) {
    return `${quantity} комнат`;
  } else {
    return `${quantity} комнаты`;
  }
};

const checkGuestsQuantity = (quantity) => {
  return quantity === 1 ? `${quantity} гостя` : `${quantity} гостей`;
};

const createFeaturesList = (value, tagName, className, thisParameter) => {
  value.forEach(function (element) {
    const htmlElement = document.createElement(tagName);
    const classNameModifier = `${className}--${element}`;
    htmlElement.classList.add(className, classNameModifier);
    this.appendChild(htmlElement);
  }, thisParameter);
};

const createPhotosList = (value, tagName, className, thisParameter) => {
  value.forEach(function (element) {
    const htmlElement = document.createElement(tagName);
    htmlElement.setAttribute('src', element);
    htmlElement.classList.add(className);
    htmlElement.setAttribute('width', IMG_WIDTH);
    htmlElement.setAttribute('height', IMG_HEIGHT);
    htmlElement.setAttribute('alt', 'Фотография жилья');
    this.appendChild(htmlElement);
  }, thisParameter);
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getUniqueArrayElements,
  getTypeOfHousing,
  checkRoomsQuantity,
  checkGuestsQuantity,
  createFeaturesList,
  createPhotosList
};
