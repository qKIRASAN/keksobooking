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

const isEscEvent = (evt) => {
  return evt.key === 'Escape';
};

const toggleDisabled = (elements, booleanValue) => {
  elements.forEach((element) => element.disabled = booleanValue);
};

const debounce = (fn, delay) => {
  let timeout;

  return function () {
    const fnCall = () => {
      return fn.apply(this, arguments);
    };

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, delay);
  };
};

export {
  getDeclensionOfNouns,
  isEscEvent,
  toggleDisabled,
  debounce
};
