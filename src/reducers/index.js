"use strict"

import { combineReducers } from 'redux';

// HERE IMPORT combineReducers
import {itemsReducers} from './itemsReducers';
import {cartReducers} from './cartReducers';

export default combineReducers({
	items: itemsReducers,
	cart: cartReducers,
});