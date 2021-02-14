import React from "react";
import {Link} from "react-router-dom";
import {ListGroup, Row, Col, Button, Image} from "react-bootstrap";
import Stock from "./stock";

const CartItem = ({item, onDeleteItem, onAddItem}) => {

  const calcTotalPriceByItem = (price, qty) => (price * qty).toFixed(2);

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/products/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>
          ${item.price}
        </Col>
        <Col md={2}>
          <Stock product={item} onMakeAction={onAddItem}/>
        </Col>
        <Col md={2}>
          Total Price: ${calcTotalPriceByItem(item.price, item.qty)}
        </Col>
        <Col md={1}>
          <Button
            type="button"
            variant="light"
            onClick={() => onDeleteItem(item._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default CartItem;
