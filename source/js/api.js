const API_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  const {status, statusText} = response;
  if (!response.ok) {
    throw new Error(`${status} - ${statusText}`);
  }

  return response;
};

const receiveData = (onSuccess, onFail) => {
  fetch(`${API_URL}/data`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    })
    .then(checkStatus)
    .then(onSuccess)
    .catch(onFail);
};

export {receiveData, sendData};
