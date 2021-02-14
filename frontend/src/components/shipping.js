import React, {useState, useEffect, memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button} from "react-bootstrap";
import {resetUpdate, updateUser} from "../actions/user/user-actions";
import {addShippingInfo} from "../actions/order/order-actions";
import FormContainer from "../hoc/layout/form-container";
import FormFieldError from "./form-field-error";

const Shipping = ({userData, onSetStep}) => {

  const dispatch = useDispatch();
  const {loading, error, success} = useSelector(({user}) => user.update);
  const {shippingInfo} = useSelector(({order}) => order);

  const [formData, setFormData] = useState({
    address: shippingInfo ? shippingInfo.address : userData.address,
    city: shippingInfo ? shippingInfo.city : userData.city,
    postalCode: shippingInfo ? shippingInfo.postalCode : userData.postalCode,
    country: shippingInfo ? shippingInfo.country : userData.country
  });
  const [saveMode, setSaveMode] = useState(false);

  useEffect(() => {
    if (success) {
      onSetStep("payment");
      dispatch(addShippingInfo(formData));

      return () => {
        dispatch(resetUpdate());
      }
    }
  }, [dispatch, onSetStep, success, formData]);

  const setFormDataHandler = ({name, value}) => {
    setFormData({...formData, [name]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (saveMode) {
      userData = {
        ...userData,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      }
      dispatch(updateUser(userData));
      return;
    }

    dispatch(addShippingInfo(formData));
    onSetStep("payment");
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            className={error && error.data.address ? "field-error" : ""}
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            required
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.address) && <FormFieldError msg={error.data.address}/>}
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            className={error && error.data.city ? "field-error" : ""}
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            required
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.city) && <FormFieldError msg={error.data.city}/>}
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            className={error && error.data.postalCode ? "field-error" : ""}
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={formData.postalCode}
            required
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.postalCode) && <FormFieldError msg={error.data.postalCode}/>}
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            className={error && error.data.country ? "field-error" : ""}
            type="text"
            name="country"
            placeholder="Enter country"
            value={formData.country}
            required
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.country) && <FormFieldError msg={error.data.country}/>}
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Check
            className="save-mode-check"
            type="checkbox"
            label="Remember shipping information"
            onChange={(e) => setSaveMode((prevState) => !prevState)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          To Payment
        </Button>
      </Form>
    </FormContainer>
  )
}

export default memo(Shipping);
