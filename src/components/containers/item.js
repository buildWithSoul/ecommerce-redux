"use strict"
import React from 'react';
import {Well, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';



class Item extends React.Component {

	handleCart(){
		const {_id, title, description, price} = this.props;

		const item = [...this.props.cart, {
			_id: _id,
			title: title,
			description: description,
			price: price,
			quantity: 1,
		}];
		if(this.props.cart.length > 0) {
			let cartIndex = this.props.cart.findIndex(function(cart){
				return cart._id === _id
			}, this);

			cartIndex === -1
				? this.props.addToCart(item)
				: this.props.updateCart(_id, 1)
		} else {
			this.props.addToCart(item);
		}
	}

	render(){
		const {title, description, price} = this.props;
		return(
			<Well>
				<Row>
					<Col xs={12}>
						<h5> {title} </h5>
						<p> {description} </p>
						<h6>$ {price} </h6>
						<Button bsStyle='primary' bsSize='small' onClick={this.handleCart.bind(this)}> Add to Cart</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state){
	return{
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart: addToCart,
		updateCart: updateCart,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);