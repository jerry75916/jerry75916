import previewView from './previewView.js';
import View from './View.js';

class ResultView extends previewView {
  _parentElement = document.querySelector('.results');

  _defaultErrorMsg = `No recipes found for your query！ Please try again :(`;
}

export default new ResultView();
