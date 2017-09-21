"use strict"
import axios from 'axios';
// GET ITEMS
export function getItems(){
	return function(dispatch){
		axios.get("/api/items")
			.then(function(response){
				dispatch({
						type: 'GET_ITEMS',
						payload: response.data
					})
			})
			.catch(function(err){
				dispatch({type:"GET_ITEM_REJECTED", payload: "there was an error rendering the app"})
			})
	}	
}

// POST ITEM
export function postItem(item){
	return function(dispatch){
		axios.post("/api/items", item)
			.then(function(response){
				console.log(response);
				dispatch({type:"POST_ITEM", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"POST_ITEM_REJECTED", payload: "there was an error rendering the app"})
			})
	}
}

// DELETE ITEM
export function deleteItem(object){
	return function(dispatch){
		axios.delete("/api/items/"+object._id)
			.then(function(response){
				dispatch({
					type: "DELETE_ITEM",
					payload: id
				})
			})
			.catch(function(err){
				dispatch({type:"POST_ITEM_REJECTED", payload: "there was an error rendering the app"})
			})

	}
}

// UPDATE ITEM
export function updateItemTitle(item){
	return {
		type: "UPDATE_ITEM_TITLE",
		payload: item
	}
}