"use strict"
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postItem, deleteItem, updateItemTitle} from './actions/itemsActions';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import ItemsList from './components/containers/itemsList';
import Cart from './components/containers/cartContainer';
import ItemsForm from './components/containers/itemsForm';
import Main from './main';

const Routes = (<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={ItemsList} />
				<Route path="/admin" component={ItemsForm} />
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
	)

render(Routes, document.getElementById('app'));



