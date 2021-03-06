import Search from './models/search';
import Recipe from './models/recipe';
import List from './models/list';
import Likes from './models/likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

const state = {};
const controlSearch = async () => {
    // 1. Get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on Ui
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline');
    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');

    if (!state.likes) {

        state.likes = new Likes();
    }

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlightselected search item
        if (state.search) {
            searchView.highlightSelected(id);
        };

        // create new recipe object
        state.recipe = new Recipe(id);

        try {

            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render the recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

        }catch (err) {

            alert('Error processing recipe!');
            alert(err);
        }
        
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {

    // create a new list if there not exists
    if (!state.list) {

        state.list = new List();
    }

    // add each ingredient to the list and user interface
    state.recipe.ingredients.forEach(element => {

        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });
}

// handling recipe and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        
        // delete from state
        state.list.deleteItem(id);

        // delete from ui
        listView.deleteItem(id);

        // handle the count update
    }else if (e.target.matches('.shopping__count--value')) {

        const value = parseFloat(e.target.value);

        if (value < 0 || isNaN(value)){
            e.target.value = 0;
        }
        state.list.updateCount(id, value);
        
    }
});

const controlLike = () => {

    if (!state.likes) {

        state.likes = new Likes();
    }
    const currentID = state.recipe.id;

    // user has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // toggle the like button
        likesView.toggleLikeBtn(state.likes.isLiked(currentID));

        // add like to ui  list
        likesView.renderLike(newLike);
    
        // user has liked the current recipe
    } else {
        // remove like from the state
        state.likes.deleteLike(currentID);

        // toggle the like button
        likesView.toggleLikeBtn(state.likes.isLiked(currentID));

        // remove like from ui list
        likesView.deleteLike(currentID);
        //likesView.renderLike(newLike);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


// restore liked recipes on page load
window.addEventListener('load', () => {

    state.likes = new Likes();

    // restore likes
    state.likes.readStorage();
    // toggle like menu btn
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    // render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
});

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        // decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }  
    }else if (e.target.matches('.btn-increase, .btn-increase *')) {

        // decrease button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){

        controlList();

    }else if (e.target.matches('.recipe__love, .recipe__love *')) {

        controlLike();
    }
});