import {createSeveralAnnouncements} from './create-data.js';
import {renderAnnouncements} from './popup.js';
import './form.js';

const map = document.querySelector('.map__canvas');

const announcements = createSeveralAnnouncements();

map.appendChild(renderAnnouncements(announcements[0]));
