const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG = 'img/muffin-grey.svg';

const userPic = document.querySelector('.ad-form-header__input');
const userPicSource = document.querySelector('.ad-form-header__preview img');
const picture = document.querySelector('.ad-form__input');
const pictureSource = document.querySelector('.ad-form__photo img');

const uploadImage = (input, imageSource) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        imageSource.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

uploadImage(userPic, userPicSource);
uploadImage(picture, pictureSource);

const resetImage = () => {
  userPicSource.src = DEFAULT_IMG;
  pictureSource.src = DEFAULT_IMG;
};

export {resetImage}
