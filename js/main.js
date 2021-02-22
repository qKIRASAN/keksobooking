import {createSeveralAnnouncements} from './create-data.js';
import {createPins} from './map.js';
import './form.js';

const announcements = createSeveralAnnouncements();
createPins(announcements);
