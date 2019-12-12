import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import PromiseMiddleware from './promise-middlewere';
import Reducers from './reducers'

export default createStore(Reducers, applyMiddleware(PromiseMiddleware));