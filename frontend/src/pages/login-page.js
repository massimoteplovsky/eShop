import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button, Row, Col} from "react-bootstrap";
import {loginUser, resetLogin} from "../actions/user/user-actions";
import FormContainer from "../hoc/layout/form-container";
import FormFieldError from "../components/form-field-error";
import Message from "../components/message";

const LoginPage = ({history}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const {loading, error, success} = useSelector(({user}) => user.login);

  useEffect(() => {

    if (success) {
      history.push("/");
    }

    return () => {
      dispatch(resetLogin());
    }
  }, [dispatch, history, success]);

  const setFormDataHandler = ({name, value}) => {
    setFormData({...formData, [name]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message msg={error.message}/>}
      <Form onSubmit={submitHandler}>
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
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New customer ? <Link to="/register">Register now...</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage;
