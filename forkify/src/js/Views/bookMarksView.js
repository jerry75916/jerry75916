import previewView from './previewView.js';
import View from './View.js';

class BookMarksView extends previewView {
  _parentElement = document.querySelector('.bookmarks__list');

  _defaultErrorMsg = `No bookmarks yet. Find a nice recipe and bookmark it :(`;
  //由於繼承，所以改寫render 中的_generaMarkup function回傳的字串

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookMarksView();
