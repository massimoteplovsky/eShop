import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button, Row, Col} from "react-bootstrap";
import {registerUser, resetRegistration} from "../actions/user/user-actions";
import FormContainer from "../hoc/layout/form-container";
import FormFieldError from "../components/form-field-error";
import Message from "../components/message";

const RegistrationPage = ({history}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const {loading, error, success} = useSelector(({user}) => user.registration);

  useEffect(() => {
    if (success) {
      history.push("/login");
    }

    return () => {
      dispatch(resetRegistration());
    }

  }, [history, dispatch, success]);

  const setFormDataHandler = ({name, value}) => {
    setFormData({...formData, [name]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  }

  return (
    <FormContainer>
      <h1>User Registration</h1>
      {error && <Message msg={error.message}/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            className={error && error.data.firstname ? "field-error" : ""}
            type="text"
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
            type="text"
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
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          Registrate
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already registered ? <Link to="/login">Sign-in now...</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegistrationPage;
