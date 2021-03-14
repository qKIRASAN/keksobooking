import {receiveData} from './api.js';
import {renderPins} from './map.js';
import {createWarning} from './message.js';
import {setFilterEventListener} from './filter-form.js'

const ANNOUNCEMENT_QUANTITY_ON_MAP = 10;

const onSuccess = (data) => {
  data = data.slice(0, ANNOUNCEMENT_QUANTITY_ON_MAP);
  renderPins(data);
  setFilterEventListener(data);
};

receiveData(onSuccess, createWarning);
