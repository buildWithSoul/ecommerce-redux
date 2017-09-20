"use_strict"

export function addToCart(item) {
	return {
		type: "ADD_TO_CART",
		payload: item
	}
}

export function deleteCartItem(cart){
	return{
		type: "DELETE_CART_ITEM",
		payload: cart
	}
}

export function updateCart(_id, quantity){
	return{
		type: "UPDATE_CART",
		payload: {
			_id: _id,
			quantity: quantity,
		}
	}
}

