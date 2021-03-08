import {resetFormHandler} from './form.js'
import {isEscEvent} from './util.js'

const DELAY = 3000;

const main = document.querySelector('.main');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const warningMessageTemplate = document.querySelector('#warning').content.querySelector('.warning');

const createMessage = (template) => {
  const message = template.cloneNode(true);

  main.appendChild(message);
  message.tabIndex = 0;
  message.focus();
  message.addEventListener('keydown', messageKeydownHandler);
  message.addEventListener('click', messageClickHandler);
};

const messageKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.currentTarget.remove();
    document.removeEventListener('keydown', messageKeydownHandler);
    document.removeEventListener('click', messageClickHandler);
  }
};

const messageClickHandler = (evt) => {
  evt.currentTarget.remove();
  document.removeEventListener('keydown', messageKeydownHandler);
  document.removeEventListener('click', messageClickHandler);
};

const createSuccessfullySent = () => {
  createMessage(successMessageTemplate);
  resetFormHandler();
};

const createFailedToSend = () => {
  createMessage(failMessageTemplate);
};

const createWarning = () => {
  createMessage(warningMessageTemplate);
  const message = main.querySelector('.warning');

  setTimeout(() => {
    message.remove();
  }, DELAY);
};

export {createSuccessfullySent, createFailedToSend, createWarning};
