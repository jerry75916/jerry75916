import View from './View.js';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn_open = document.querySelector('.nav__btn--add-recipe');
  _btn_close = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)';
  constructor() {
    super();

    this.addHandlerShowModal();
    this.addHandlerHideModal();
  }

  _generateMarkup() {
    //回傳大於等於所給數字的最小整數。
  }
  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerShowModal() {
    this._btn_open.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerHideModal() {
    this._btn_close.addEventListener('click', this.toggleModal.bind(this));
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //將form轉成[title,text]的型式
      const data = [...new FormData(this)];
      handler(data);
    });
  }
}

export default new addRecipeView();
