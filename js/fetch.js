const ANNOUNCEMENT_QUANTITY = 10;

const checkStatus = (response) => {
  const {status, statusText} = response;
  if (!response.ok) {
    throw new Error(`${status} - ${statusText}`);
  }

  return response;
};

const receiveData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then((announcements) => {
      onSuccess(announcements.slice(0, ANNOUNCEMENT_QUANTITY));
    })
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then(checkStatus)
    .then(() => onSuccess())
    .catch(() => onFail());
};

export {receiveData, sendData};
