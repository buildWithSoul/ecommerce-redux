"use strict"
import React from 'react';
import { connect } from 'react-redux';
import{Jumbotron, Panel, Col, Row, Well, Button, ButtonGroup, Modal, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends React.Component{
	constructor(){
		super();
		this.state = {
			showModal: false
		};
	}

	componentDidMount(){
		this.props.getCart();
	}

	openCheckout(){
		this.setState({showModal: true});
	}

	closeCheckout(){
		this.setState({showModal: false})
	}

	render(){
		if (this.props.cart[0])
			return this.renderCart();
		return this.renderEmpty();
	}

	renderEmpty(){
		return(  <Jumbotron>
    <h1>Welcome to the MERN Stack Demo!</h1>
    <p> If you are viewing this, you are probably interested in hiring me or my web agency for a project.</p>
    <p> In this demo you can try creating and deleting items, and adding them to the cart </p>
    <p> Using React-Redux-ReactRouter@3.* for the client that connects to a Express-Mongoose-MongoDB server via a reverse proxy </p>
  </Jumbotron>)
	}

	onDelete(_id){
		const cart = this.props.cart;
		const indexToDelete= this.props.cart.findIndex(function(cartItem){
			return cartItem._id === _id;
		})
		const cartAfterDelete= [...cart.slice(0, indexToDelete), ...cart.slice(indexToDelete+1)];
		
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id, 1, this.props.cart);
	}

	onDecrement(_id){
		const indexToDelete= this.props.cart.findIndex(function(cartItem){
			return cartItem._id === _id;
		});

		if (this.props.cart[indexToDelete].quantity === 1)
			this.onDelete(_id);
		else
			this.props.updateCart(_id, -1, this.props.cart);
	}

	renderCart(){
		const cartItems = this.props.cart.map(function(item){
			return(
				<Panel key={item._id}>
					<Row>
						<Col xs={12}>
							<h6> {item.title}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>$ {item.price}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>quantity <Label bsStyle="success">{item.quantity} </Label></h6>
						</Col>

						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, item._id)}>-</Button>
								<Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, item._id)}>+</Button>
								<span>    </span>
								<Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this, item._id)}> DELETE </Button>
							</ButtonGroup>
						</Col>

					</Row>
				</Panel>
			)
		}, this);

		return(
			<Panel header="Cart" bsStyle="primary">
				{cartItems}
				<Row>
					<Col xs={12}>
						<h6> Total Amount: $ {this.props.totalAmount} </h6>
						<h6> Total Quantity: {this.props.totalQty} </h6>
						<Button bsStyle="success" bsSize="small" onClick={this.openCheckout.bind(this)}>Proceed to Checkout</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.closeCheckout.bind(this)}>
		          <Modal.Header closeButton>
		            <Modal.Title>Modal heading</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <h4>Test </h4>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.closeCheckout.bind(this)}>Close</Button>
		          </Modal.Footer>
	        	</Modal>
			</Panel>
		)
	}
}

function mapStateToProps(state){
	return{
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount,
		totalQty: state.cart.totalQty,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCart: getCart,
		deleteCartItem: deleteCartItem,
		updateCart: updateCart,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);