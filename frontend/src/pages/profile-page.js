import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button, Row, Col} from "react-bootstrap";
import {updateUser, resetUpdate} from "../actions/user/user-actions";
import FormFieldError from "../components/form-field-error";
import Message from "../components/message";
import UserOrders from "../components/user-orders";

const ProfilePage = ({userData}) => {
  const [formData, setFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    password: "",
    confirmPassword: "",
    city: userData.city || "",
    address: userData.address || "",
    postalCode: userData.postalCode || "",
    country: userData.country || ""
  });

  const dispatch = useDispatch();
  const {loading, error, success} = useSelector(({user}) => user.update);

  useEffect(() => {
    if (success) {
      dispatch(resetUpdate());
      setFormData({
        ...formData,
        password: "",
        confirmPassword: ""
      })
    }
  }, [dispatch, success, setFormData, userData, formData]);

  const setFormDataHandler = ({name, value}) => {
    setFormData({...formData, [name]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    let newFormData = {...formData};

    if (!newFormData.password) {
      delete newFormData.password;
      delete newFormData.confirmPassword;
    }

    dispatch(updateUser(newFormData));
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Update profile</h2>
        {error && <Message msg={error.message}/>}
        <Form onSubmit={submitHandler}>
          <h6>Personal Information</h6>
          <Form.Group controlId="firstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              className={error && error.data.firstname ? "field-error" : ""}
              type="firstname"
              name="firstname"
              placeholder="Enter firstname"
              value={formData.firstname}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.firstname) && <FormFieldError msg={error.data.firstname}/>}
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              className={error && error.data.lastname ? "field-error" : ""}
              type="lastname"
              name="lastname"
              placeholder="Enter lastname"
              value={formData.lastname}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.lastname) && <FormFieldError msg={error.data.lastname}/>}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={error && error.data.email ? "field-error" : ""}
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.email) && <FormFieldError msg={error.data.email}/>}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={error && error.data.password ? "field-error" : ""}
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.password) && <FormFieldError msg={error.data.password}/>}
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className={error && error.data.confirmPassword ? "field-error" : ""}
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.confirmPassword) && <FormFieldError msg={error.data.confirmPassword}/>}
          </Form.Group>
          <h6>Shipping Information</h6>
          <Form.Group controlId="city">
            <Form.Label>Enter city</Form.Label>
            <Form.Control
              className={error && error.data.city ? "field-error" : ""}
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.city) && <FormFieldError msg={error.data.city}/>}
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Enter address</Form.Label>
            <Form.Control
              className={error && error.data.address ? "field-error" : ""}
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.address) && <FormFieldError msg={error.data.address}/>}
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Enter postal code</Form.Label>
            <Form.Control
              className={error && error.data.postalCode ? "field-error" : ""}
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.postalCode) && <FormFieldError msg={error.data.postalCode}/>}
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Enter country</Form.Label>
            <Form.Control
              className={error && error.data.country ? "field-error" : ""}
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={(e) => setFormDataHandler(e.target)}
            >
            </Form.Control>
            {(error && error.data.country) && <FormFieldError msg={error.data.country}/>}
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <UserOrders/>
      </Col>
    </Row>
  )
}

export default ProfilePage;
