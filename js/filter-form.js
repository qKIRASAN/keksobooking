import {setDisabled, removeDisabled, debounce} from './util.js';
import {renderPins} from './map.js';
import {getFromStore} from './store.js';

const ANNOUNCEMENT_QUANTITY_ON_MAP = 10;
const DEFAULT_FILTER_VALUE = 'any';
const DELAY = 500;

const filterForm = document.querySelector('.map__filters');
const formElements = filterForm.querySelectorAll('.map__filter, .map__features');
const filterType = filterForm.querySelector('#housing-type');
// const filterPrice = filterForm.querySelector('#housing-price');
// const filterRooms = filterForm.querySelector('#housing-rooms');
// const filterGuests = filterForm.querySelector('#housing-guests');
// const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

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

const checkFilterByType = ({offer}) => {
  return offer.type === filterType.value || filterType.value === DEFAULT_FILTER_VALUE;
};

const filterAnnouncements = (announcements) => {
  return announcements.filter((announcement) => {
    if (checkFilterByType(announcement)) {
      return announcement;
    }
  });
};

const updateAnnouncements = debounce((announcements) => {
  const filteredAnnouncements = filterAnnouncements(announcements);
  renderPins(filteredAnnouncements);
}, DELAY);

const setFilterEventListener = () => {
  const announcements = getFromStore().slice(0, ANNOUNCEMENT_QUANTITY_ON_MAP);

  filterForm.addEventListener('change', () => updateAnnouncements(announcements));
  filterForm.addEventListener('reset', () => updateAnnouncements(announcements));
};

deactivateFilterForm();

export {resetFilterForm, activateFilterForm, setFilterEventListener}
