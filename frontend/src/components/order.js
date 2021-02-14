import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Row, Col, ListGroup, Card} from "react-bootstrap";
import {createOrder, resetOrder} from "../actions/order/order-actions";
import {resetCart} from "../actions/cart/cart-actions";
import {calcTotalItemsInCart, calcTotalPrice} from "../helpers";
import OrderCartItem from "../components/order-cart-item";

const Order = () => {

  const {cartItems} = useSelector(({cart}) => cart);
  const {shippingInfo, paymentMethod} = useSelector(({order}) => order);
  const {loading, success, data: order} = useSelector(({order}) => order.order);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch(resetCart());
      dispatch(resetOrder());
    }
  }, [dispatch, success, history, order]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      cartItems,
      shippingInfo,
      paymentMethod,
      totalPrice: Number(calcTotalPrice(cartItems))
    }))
  }

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingInfo ? shippingInfo.city : ""},&nbsp;
              {shippingInfo ? shippingInfo.address : ""} -&nbsp;
              {shippingInfo ? shippingInfo.postalCode : ""},&nbsp;
              {shippingInfo ? shippingInfo.country : ""}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {paymentMethod ? paymentMethod : ""}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {
                cartItems.map((item) => {
                  return <OrderCartItem key={item._id} item={item}/>
                })
              }
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items: </Col>
                <Col>{calcTotalItemsInCart(cartItems)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
                <Col>${calcTotalPrice(cartItems)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-primary"
                disabled={loading}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Order;
