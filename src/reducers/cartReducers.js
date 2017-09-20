"use strict"

export function cartReducers(state={cart:[]}, action) {
	switch(action.type){
		case "ADD_TO_CART":
			return {...state, cart: action.payload, totalAmount: totals(action.payload).amount, totalQty: totals(action.payload).quantity}
			break;
		case "DELETE_CART_ITEM":
			return {...state, cart:[...action.payload], totalAmount: totals(action.payload).amount, totalQty: totals(action.payload).quantity}
			break;
		case "UPDATE_CART":
			const currentCart = [...state.cart];
			const indextoUpdate = currentCart.findIndex(
				function(item){
					return item._id === action.payload._id;
				}
			);
			const newItemtoUpdate = {
				...currentCart[indextoUpdate], 
				quantity: currentCart[indextoUpdate].quantity + action.payload.quantity,
			}

			const newCart = [...currentCart.slice(0, indextoUpdate), newItemtoUpdate, ...currentCart.slice(indextoUpdate+1)];

			return {...state, cart: newCart, totalAmount: totals(newCart).amount, totalQty: totals(newCart).quantity}

	}
	return state;
}

export function totals(payload){
	const totalAmount = payload.map(function(item){
		return item.price * item.quantity;
	}).reduce(function(a, b){
		return a + b;
	}, 0);

	const totalQuantity = payload.map(function(item){
		return item.quantity;
	}).reduce(function(a, b){
		return a + b;
	}, 0);

	return {amount: totalAmount.toFixed(2), quantity: totalQuantity}
}