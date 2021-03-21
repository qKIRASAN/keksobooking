const API_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  const {status, statusText} = response;
  if (!response.ok) {
    throw new Error(`${status} - ${statusText}`);
  }

  return response;
};

const receiveData = (successHandler, errorHandler) => {
  fetch(`${API_URL}/data`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => successHandler(data))
    .catch(errorHandler);
};

const sendData = (successHandler, errorHandler, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    })
    .then(checkStatus)
    .then(successHandler)
    .catch(errorHandler);
};

export {receiveData, sendData};
