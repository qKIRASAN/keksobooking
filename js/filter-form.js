import {setDisabled, removeDisabled} from './util.js';
import {createPins} from './map.js';
import {debounce} from './lodash-debounce.js';

const DEFAULT_FILTER_VALUE = 'any';
const DELAY = 500;

const filterForm = document.querySelector('.map__filters');
const formElements = filterForm.querySelectorAll('.map__filter, .map__features');
const filterType = filterForm.querySelector('#housing-type');
// const filterPrice = filterForm.querySelector('#housing-price');
// const filterRooms = filterForm.querySelector('#housing-rooms');
// const filterGuests = filterForm.querySelector('#housing-guests');
// const filterFeatures = filterForm.querySelector('#housing-features');

const deactivateFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  setDisabled(formElements);
};

const activateFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  removeDisabled(formElements);
};

const resetFilterForm = () => {
  filterForm.reset();
};

const filterByType = (announcement) => {
  return announcement.offer.type === filterType.value || filterType.value === DEFAULT_FILTER_VALUE;
};

const getFilteredAnnouncements = (announcements) => {
  const filteredAnnouncements = [];

  for (let announcement of announcements) {
    if (filterByType(announcement)) {
      filteredAnnouncements.push(announcement);
    }
  }

  return filteredAnnouncements;
};

const updateAnnouncements = debounce((announcements) => {
  const filteredAnnouncements = getFilteredAnnouncements(announcements);
  createPins(filteredAnnouncements);
}, DELAY);

const setFilterEventListener = (announcements) => {
  filterForm.addEventListener('change', () => {
    updateAnnouncements(announcements);
  })
};

deactivateFilterForm();

export {resetFilterForm, activateFilterForm, setFilterEventListener}
