let offersData = [];

const saveToStore = (data) => {
  offersData = data;
};

const getFromStore = () => offersData;

export {saveToStore, getFromStore}
