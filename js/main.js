import {receiveData} from './api.js';
import {createPins} from './map.js';
import {createWarning} from './message.js';

receiveData(createPins, createWarning);
