import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button} from "react-bootstrap";
import FormContainer from "../hoc/layout/form-container";
import {addPaymentMethod} from "../actions/order/order-actions";

const Payment = ({onSetStep}) => {

  const dispatch = useDispatch();
  const {paymentMethod} = useSelector(({order}) => order);

  const [method, setMethod] = useState(paymentMethod ? paymentMethod : "PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(method));
    onSetStep("order");
  }

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group as="legend">
          <Form.Check
            type="radio"
            id="pay-pal"
            name="payment"
            label="PayPal or Credit Card"
            value="PayPal"
            checked={method === "PayPal"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="cash"
            name="payment"
            label="Cash on Delivery"
            value="Cash"
            checked={method === "Cash"}
            onChange={(e) => setMethod(e.target.value)}
          />

        </Form.Group>
        <Button
          type="submit"
          variant="primary"
        >
          To Place Order
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment;
