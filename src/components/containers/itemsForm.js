"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import { bindActionCreators } from 'redux';
import {InputGroup, DropdownButton, Image, MenuItem, Well, Panel, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';
import {postItem, deleteItem, getItems} from '../../actions/itemsActions';

class ItemsForm extends React.Component{
	componentDidMount(){
		//this.props.getItems();
	}

	handleSubmit(){
		const item=[{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value,
		}]
		this.props.postItem(item);
	}

	onDelete(){
		const id = findDOMNode(this.refs.delete).value;
		this.props.deleteItem(
			this.props.items[
				this.props.items.findIndex(function(item){
					return id.toString() === item._id.toString();
				})
			]
		);
		this.props.getItems();
	}

	render() {
		const itemsList = this.props.items.map(function(item){
			return(
				<option key={item._id} value={item._id}>
					{item.title}
				</option>
			);
		});

		return(
			<Well>
				<Panel>
					<FormGroup controlId="disclaimer">
						<ControlLabel> Note: Validations not added! </ControlLabel>
					</FormGroup>
					<FormGroup controlId="title">
						<ControlLabel> Title </ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title" />
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel> Description </ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description" />
					</FormGroup>
					<FormGroup controlId="price">
						<ControlLabel> Price </ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Price"
							ref="price" />
					</FormGroup>
					<Button onClick={this.handleSubmit.bind(this)}> Add Item </Button>
				</Panel>
				<Panel>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel> Select an Item </ControlLabel>
						<FormControl ref="delete" componentClass="select" placeholder="select">
							{itemsList}
						</FormControl>
						<Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this)}> Delete Item</Button>
					</FormGroup>
				</Panel>
			</Well>
		);
	}
}

function mapStateToProps(state){
	return{
		items: state.items.items,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({postItem, deleteItem, getItems}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsForm);