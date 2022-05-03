class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const strInput = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return strInput;
  }
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  //與controller 接口
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
