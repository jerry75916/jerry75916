export default class View {
  _data;
  _defaultErrorMsg = '';

  renderingSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="../src/img/icons.svg#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const Newmarkup = this._generateMarkup();

    const newDoM = document.createRange().createContextualFragment(Newmarkup); //將字串轉成Element Node
    //將舊有的Element Node與新的Element Node轉成Array 為了要比較新舊的element 不同
    const newElement = Array.from(newDoM.querySelectorAll('*'));

    const currElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((Newel, i) => {
      const currEl = currElement[i];
      //找新舊不同的element並update Text 至新的text
      if (
        !Newel.isEqualNode(currEl) &&
        Newel?.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = Newel.textContent;
      }
      //update change Attribute 更新button 的data-goto attribute
      if (!Newel.isEqualNode(currEl)) {
        Array.from(Newel.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = this._message) {
    const Msg = `<div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="../src/img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', Msg);
  }

  renderError(message = this._defaultErrorMsg) {
    const errorMsg = `<div class="error">
   <div>
     <svg>
       <use href="../src/img/icons.svg#icon-alert-triangle"></use>
     </svg>
   </div>
   <p>${message}</p>
 </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMsg);
  }
}
