import { API_URL, KEY, RESULT_PER_PAGE } from './config.js';
import { get_send_AJAX } from './help.js';
export { API_URL } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    CurrentPage: 1,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await get_send_AJAX(`${API_URL}${id}`);
    const { recipe } = data.data; //fetch recipe
    //將fetch 到的值存到state裡的物件
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //避免點擊左方list時,已bookmarked=true 的東西消失，點擊一個bookmark就加一筆bookmark進bookMarks[]
    if (state.bookMarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await get_send_AJAX(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = function (page = state.search.CurrentPage) {
  state.search.CurrentPage = page;

  const start = (page - 1) * RESULT_PER_PAGE;

  const end = page * RESULT_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServings = function (Newservings) {
  state.recipe.ingredients.forEach(ing => {
    //new quantity = new servings* quantity / old quantity

    ing.quantity = Newservings * (ing.quantity / state.recipe.servings);
  });

  state.recipe.servings = Newservings;
};
const SaveBookMarksInLocal = function (bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const AddBookMark = function (recipe) {
  state.bookMarks.push(recipe);

  //mark current recipe as bookmark
  state.recipe.bookmarked = true;

  SaveBookMarksInLocal(state.bookMarks);
};

export const initBookMarks = function () {
  const arr_LocalBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if (arr_LocalBookmarks) state.bookMarks = arr_LocalBookmarks;
};
export const RemoveBookMark = function (id) {
  state.bookMarks.splice(
    state.bookMarks.findIndex(bookmark => bookmark.id === id),
    1
  );
  SaveBookMarksInLocal(state.bookMarks);
  state.recipe.bookmarked = false;
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    //key:recipe.key
    ...(recipe.key && { key: recipe.key }),
  };
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = newRecipe
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        //0.5,kg,Rice
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    //把array 直接轉成object
    newRecipe = Object.fromEntries(newRecipe);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await get_send_AJAX(`${API_URL}?key=${KEY}`, recipe);

    // const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    AddBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
