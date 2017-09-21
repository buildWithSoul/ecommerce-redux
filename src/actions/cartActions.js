"use_strict"
import axios from 'axios';

export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
			.then(function(response){
				dispatch({type:"GET_CART", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"GET_CART_REJECTED", msg: "error"})
			})
	}
}

export function addToCart(cart) {
	return function (dispatch){ 
		axios.post('/api/cart', cart)
			.then(function(response){
				dispatch({type: "ADD_TO_CART", payload: cart})
			})
			.catch(function(err){
				dispatch({type: "ADD_TO_CART_REJECTED", msg: "error"})
			})
	}
}


export function deleteCartItem(cart){

	return function (dispatch){ 
		axios.post('/api/cart', cart)
			.then(function(response){
				dispatch({type: "DELETE_CART_ITEM", payload: response.data})
			})
			.catch(function(err){
				dispatch({type: "DELETE_CART_ITEM_REJECTED", msg: "error"})
			})
	}
}

export function updateCart(_id, quantity, cart){
	const currentCart = cart;
	const indextoUpdate = currentCart.findIndex(
		function(item){
			return item._id === _id;
		}
	);
	const newItemtoUpdate = {
		...currentCart[indextoUpdate], 
		quantity: currentCart[indextoUpdate].quantity + quantity,
	}

	const newCart = [...currentCart.slice(0, indextoUpdate), newItemtoUpdate, ...currentCart.slice(indextoUpdate+1)];


	return function(dispatch){
		axios.post('/api/cart', newCart)
			.then(function(response){
				dispatch({type: "UPDATE_CART", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to cart'})
			})
		}
}

