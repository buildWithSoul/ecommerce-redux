"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getItems} from '../../actions/itemsActions';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Item from './item';
import ItemForm from './itemsForm';
import Cart from './cartContainer';

class ItemsList extends React.Component {
	componentDidMount(){
		// Disppatch an action
		this.props.getItems();
	}

	render(){
		const items = this.props.items.map(function(item){
			return(
				<Col xs={12} sm={6} md={4} key={item._id}>
					<Item 
						_id={item._id}
						title={item.title}
						description={item.description}
						price={item.price} />
				</Col>
			);
		});

		return(
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row style={{marginTop: '15px'}}>
					<Col xs={12} sm={6} md={6}> 
						<ItemForm />
					</Col>
					<Col xs={12} sm={6} md={6}>
						{items}		
					</Col>
				</Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	return{
		items: state.items.items
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getItems: getItems}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);