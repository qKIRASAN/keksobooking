const housingType = document.querySelector('#type');
const price = document.querySelector('#price');

housingType.addEventListener('change', (evt) => {
  const target = evt.target;
  switch(target.value) {
    case 'bungalow':
      price.setAttribute('min', '0');
      price.placeholder = 0;
      break;
    case 'flat':
      price.setAttribute('min', '1000');
      price.placeholder = 1000;
      break;
    case 'house':
      price.setAttribute('min', '5000');
      price.placeholder = 5000;
      break;
    case 'palace':
      price.setAttribute('min', '10000');
      price.placeholder = 10000;
      break;
  }
});

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', (evt) => {
  const target = evt.target;
  switch(target.value) {
    case '12:00':
      timeOut.value = '12:00';
      break;
    case '13:00':
      timeOut.value = '13:00';
      break;
    case '14:00':
      timeOut.value = '14:00';
      break;
  }
});

timeOut.addEventListener('change', (evt) => {
  const target = evt.target;
  switch(target.value) {
    case '12:00':
      timeIn.value = '12:00';
      break;
    case '13:00':
      timeIn.value = '13:00';
      break;
    case '14:00':
      timeIn.value = '14:00';
      break;
  }
});
