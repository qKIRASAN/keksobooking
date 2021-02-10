import {createAnnouncement} from './create-announcement.js';

const ANNOUNCEMENT_QUANTITY = 10;

const createSeveralAnnouncements = (quantity) => {
  return new Array(quantity).fill(null).map(createAnnouncement);
};

createSeveralAnnouncements(ANNOUNCEMENT_QUANTITY);
