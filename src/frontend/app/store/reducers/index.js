import { combineReducers } from 'redux';
import DietsReducer from './diets-reducer';
import FoodsReducer from './foods-reducer';
import RecipesReducer from './recipes-reducer';
import UsersReducer from './users-reducer';

export default combineReducers({
    dietState: DietsReducer,
    foodState: FoodsReducer,
    recipeState: RecipesReducer,
    userState: UsersReducer
});