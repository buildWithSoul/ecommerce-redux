"use strict"
// GET ITEMS
export function getItems(){
	return {
		type: 'GET_ITEMS',
	}
}

// POST ITEM
export function postItem(item){
	return {
		type: "POST_ITEM",
		payload: item
	}
}

// DELETE ITEM
export function deleteItem(id){
	return {
		type: "DELETE_ITEM",
		payload: id
	}
}

// UPDATE ITEM
export function updateItemTitle(item){
	return {
		type: "UPDATE_ITEM_TITLE",
		payload: item
	}
}