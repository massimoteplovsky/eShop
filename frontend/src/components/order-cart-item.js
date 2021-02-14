import React from "react";
import {Row, Col, Image, ListGroup} from "react-bootstrap";

const OrderCartItem = ({item}) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={1}>
          <Image src={item.image} alt={item.name} fluid rounded/>
        </Col>
        <Col>
          {item.name}
        </Col>
        <Col md={4}>
            {item.qty} x {item.price} = ${item.qty * item.price}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default OrderCartItem;
