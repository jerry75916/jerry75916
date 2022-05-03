import View from './View.js';
import { RESULT_PER_PAGE } from '../config.js';
class pagationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handle) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const new_GogoPage = +btn.dataset.goto;
      if (!btn) return;
      handle(new_GogoPage);
    });
  }
  _generateMarkup() {
    //回傳大於等於所給數字的最小整數。
    const currPage = this._data.CurrentPage;
    const Pages = Math.ceil(this._data.results.length / RESULT_PER_PAGE);
    //只有第一頁
    if (Pages === 1) {
      //hide all arrow
      return ``;
    }
    //current第一頁
    if (Pages > 1 && currPage === 1) {
      //hide left arrow
      return ` <button data-goto="2" class="btn--inline pagination__btn--next">
      <span>Page 2</span>
      <svg class="search__icon">
        <use href="./src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //第二頁以上有前頁與後頁
    if (currPage < Pages) {
      //hide left arrow
      return ` <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="./src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="./src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //最後頁
    if (currPage === Pages && Pages > 1) {
      // hide right arrow
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="./src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${Pages - 1}</span>
    </button>`;
    }

    return ``;
  }
}

export default new pagationView();

/*
p=0  hide left button

page1 0-9 p=0  p ~ (p+1)*10-1
page2 10-19    (p-1)*10 - (p+1)*10-1
page3 20-29   (p-1)*10 - (p+1)*10-1

(p+1)*10==arr.length || (p+1)*10>array.length hide right button


*/
