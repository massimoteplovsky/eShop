import React from "react";
import {Form} from "react-bootstrap";

const Stock = ({product, onMakeAction, qty = 0}) => {

  const generateOptions = (countInStock) => {
    const stock = [...Array(countInStock).keys()];

    return stock.map((item) => {
      const index = item + 1;
      return <option key={index} value={index}>{index}</option>
    });
  }

  const actionHandler = (prodId, quantity) => qty ? onMakeAction(quantity) : onMakeAction(prodId, quantity);

  const generateStockTemplate = (product) => {

    return (
      <Form.Control
        as="select"
        value={qty ? qty : product.qty}
        onChange={(e) => actionHandler(product._id, Number(e.target.value))}
      >
        {generateOptions(product.countInStock)}
      </Form.Control>
    );
  }

  return (
    <>
      {generateStockTemplate(product)}
    </>
  )
}

export default Stock;
