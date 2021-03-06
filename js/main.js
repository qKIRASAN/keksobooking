import {createPins} from './map.js';
import {receiveData} from './fetch.js';
import {createWarning} from './form.js';

receiveData(createPins, createWarning);
