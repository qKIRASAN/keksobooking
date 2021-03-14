import {receiveData} from './api.js';
import {renderPins} from './map.js';
import {createWarning} from './message.js';
import {activateFilterForm, setFilterEventListener} from './filter-form.js';
import {saveToStore} from './store.js';

const ANNOUNCEMENT_QUANTITY_ON_MAP = 10;

const successHandler = (data) => {
  saveToStore(data);
  renderPins(data.slice(0, ANNOUNCEMENT_QUANTITY_ON_MAP));
  activateFilterForm();
  setFilterEventListener();
};

receiveData(successHandler, createWarning);
