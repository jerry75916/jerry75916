import { scss } from '../sass/main.scss';
import testImg1 from '../img/favicon.png';
import testImg2 from '../img/icons.svg';
import testImg3 from '../img/logo.png';
import '../../node_modules/core-js/stable';
import '../../node_modules/regenerator-runtime/runtime.js';

import * as model from './modle';
import recipeView from './Views/recipeView.js';
import SearchView from './Views/SearchView.js';
import resultView from './Views/resultView.js';
import bookMarksView from './Views/bookMarksView.js';
import pagationView from './Views/pagationView.js';
import addRecipeView from './Views/addRecipeView.js';
import { MODAL_CLOSE_TIME } from './config.js';
import { async } from 'regenerator-runtime';
/**
 *
 * @param {int} page 將左方欄位的Item 依照給定的Page泫染出來
 */

const RenderPageAndList = function (page) {
  resultView.render(model.getSearchResults(page));

  //3) render init pagation result
  pagationView.render(model.state.search);
};
const Control_SearchResult = async function () {
  try {
    //1) get input string
    const query = SearchView.getQuery();
    if (!query || query === '') return;

    //loading
    resultView.renderingSpinner();
    //2)get search data.
    await model.loadSearchResult(query);
    //Run page and product list
    RenderPageAndList(1);
  } catch (error) {
    throw error;
  }
};

const Control_Paging = function (page) {
  RenderPageAndList(page);
};
const Control_Recepipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //避免未傳任何id造成轉圈圈的情況
    if (!id) return;
    recipeView.renderingSpinner();

    //更新左方連結於點擊時的hightlight，移出持續hightlight項目,主要重點是因為View.js
    //內update function中有可以重新 generator ResultView Makeup字串的function，這個function 會讓hash hightlight
    //最後是更新bookmark 列表內的highlight 讓它可以連動左方列表
    resultView.update(model.getSearchResults());

    bookMarksView.update(model.state.bookMarks);
    //loading recipe
    await model.loadRecipe(id);

    //2 redering recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

const Control_Servings = function (Newserving) {
  //update the recipe servings (in state)
  model.updateServings(Newserving);
  //update the recipeview
  recipeView.update(model.state.recipe);
};

const Control_AddBookMark = function () {
  //add and remove bookmark
  if (!model.state.recipe.bookmarked) model.AddBookMark(model.state.recipe);
  else model.RemoveBookMark(model.state.recipe);

  //update book mark show or hide in rescipeView
  recipeView.update(model.state.recipe);

  //update bookMarkView
  bookMarksView.render(model.state.bookMarks);
};
const InitBookMark = function () {
  model.initBookMarks();
  bookMarksView.render(model.state.bookMarks);
};

const Control_AddRecipe = async function (recipe) {
  try {
    addRecipeView.renderingSpinner();
    //upload new recipe data
    await model.uploadRecipe(recipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    setTimeout(addRecipeView.toggleModal(), MODAL_CLOSE_TIME * 1000);
    bookMarksView.render(model.state.bookMarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

//iife 一開始就訂閱事件直接在controller 呼叫(view的function並傳入對應事件處理)讓view 能存取controller 的事件處理式(類似把Function 丟給View去執行Event)
//design pattern 的publisher & subscriber
(function () {
  bookMarksView.addHandlerRender(InitBookMark);
  recipeView.addHandlerRender(Control_Recepipe);
  SearchView.addHandlerSearch(Control_SearchResult);
  pagationView.addHandleClick(Control_Paging);
  recipeView.addHandlerServing(Control_Servings);
  recipeView.addHandlerAddBookMark(Control_AddBookMark);
  addRecipeView.addHandlerUpload(Control_AddRecipe);
})();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
