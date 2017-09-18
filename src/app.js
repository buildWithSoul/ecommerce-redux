"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';


import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postItem, deleteItem, updateItemTitle} from './actions/itemsActions';

//step 3 define reducer

const counterReducer = function(state=0, action){
	switch(action.type){
		case "INCREMENT":
			return state + action.payload;
			break;
		case "DECREMENT":
			return state - action.payload;
			break;
		}
	return state;
}

// step 1 - create the store 
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);


// step 2 create and dispatch actions
store.dispatch(postItem([
		{
			id: 1, 
			title: "this is item title",
			description: "this is the item description",
			price: '10.99'
		},
		{
			id: 2, 
			title: "this is item title2",
			description: "this is the item description",
			price: '24.99'
		},
	]));

store.dispatch(deleteItem({id: 1}));

store.dispatch(updateItemTitle({id: 2, title: "this is the new title"}));

store.dispatch(addToCart([{id: 1}]));


