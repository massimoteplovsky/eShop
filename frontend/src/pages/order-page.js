import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Row, Col, ListGroup, Card} from "react-bootstrap";
import {PayPalButton} from "react-paypal-button-v2";
import {fetchOrder, payUserOrder, resetOrder} from "../actions/order/order-actions";
import {getClientID, formatDate} from "../helpers";
import Loader from "../components/loader";
import Error from "../pages/error-page";
import OrderCartItem from "../components/order-cart-item";
import withLoading from "../hoc/withLoading";
import Message from "../components/message";

const getPaymentSrcipt = async (cb) => {
  const {data: clientID} = await getClientID();
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.id = "payment";
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
  script.onload = () => cb(true);
  document.body.appendChild(script);
}

const OrderPage = ({loading, onSetLoading, match}) => {
  const orderID = match.params.id;
  const dispatch = useDispatch();
  const {error, data: order} = useSelector(({order}) => order.order);

  const [isSdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      if (!order) {
        await dispatch(fetchOrder(orderID));
        onSetLoading(false);
      }

      if (order && order.paymentMethod === "PayPal" && !order.isPaid) {
        await getPaymentSrcipt(setSdkReady);
      }
    }

    fetchData();

  }, [dispatch, onSetLoading, orderID, order]);

  useEffect(() => {
    return () => {
      const paymentScript = document.querySelector("#payment");

      if (paymentScript) {
        paymentScript.parentNode.removeChild(paymentScript);
      }

      dispatch(resetOrder());
    }
  }, [dispatch]);

  const successPaymentHandler = (paymentResult) => {

    const paymentData = {
      paymentResult: {
        id: paymentResult.id,
        paidAt: paymentResult.update_time,
        email: paymentResult.payer.email_address,
        status: paymentResult.status,
      },
      isPaid: true
    };

    dispatch(payUserOrder(order._id, paymentData));
  }

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <Error error={error}/>
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <h1>Order {orderID}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {`${order.user.firstname} ${order.user.lastname}`}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingInfo.city},&nbsp;
                {order.shippingInfo.address} -&nbsp;
                {order.shippingInfo.postalCode},&nbsp;
                {order.shippingInfo.country}
              </p>
              {order.isDelivered ?
                <Message variant="success" msg={`Delivered ${order.deliveredAt}`}/>
                :
                <Message msg="Not delivered"/>
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ?
                <Message variant="success" msg={`Paid on ${formatDate(order.paymentResult.paidAt)}`}/>
                :
                <Message msg="Not paid"/>
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {
                  order.orderItems.map((item) => {
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
                  <Col>Total: </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {
                !order.isPaid && order.paymentMethod === "PayPal" ?
                  <ListGroup.Item>
                    {isSdkReady && (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                        currency="USD"
                      />
                    )}
                  </ListGroup.Item>
                  :
                  <Link className="btn btn-primary" to="/profile">To profile</Link>
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
  )
}

export default withLoading(OrderPage);
