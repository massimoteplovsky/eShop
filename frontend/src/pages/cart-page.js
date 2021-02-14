import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import {addItemToCart, deleteItemFromCart} from "../actions/cart/cart-actions";
import CartItem from "../components/cart-item";
import {calcTotalItemsInCart, calcTotalPrice} from "../helpers";

const CartPage = ({userData, history}) => {

  const dispatch = useDispatch();
  const {cartItems} = useSelector(({cart}) => cart);

  const addItemHandler = (prodID, qty) => dispatch(addItemToCart(prodID, qty));
  const deleteItemHandler = (prodID) => dispatch(deleteItemFromCart(prodID));

  const emptyCartMessage = <p>Your cart is empty. <Link to="/">Start shopping now</Link></p>;

  const generateCart = () => {
    return (
      <ListGroup variant="flush">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onAddItem={addItemHandler}
            onDeleteItem={deleteItemHandler}
          />
        ))}
      </ListGroup>
    )
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shooping cart</h1>
        {cartItems.length === 0 ? emptyCartMessage : generateCart()}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>items in cart: {calcTotalItemsInCart(cartItems)}</h2>
              Total price: ${calcTotalPrice(cartItems)}
            </ListGroup.Item>
            <ListGroup.Item>
              {
                !userData ?
                <Link
                  to="/login"
                  className="btn btn-block btn-primary"
                >
                  Login to purchase
                </Link>
                :
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={() => history.push("/checkout")}
                >
                  Proceed to checkout
                </Button>
              }
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage;
