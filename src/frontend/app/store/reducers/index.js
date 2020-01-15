import { combineReducers } from 'redux';
import DietsReducer from './diets-reducer';
import FoodsReducer from './foods-reducer';
import ReceiptsReducer from './receipts-reducer';

export default combineReducers({
    dietState: DietsReducer,
    foodState: FoodsReducer,
    receiptState: ReceiptsReducer
});