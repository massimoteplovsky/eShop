import React from "react";
import {Alert} from "react-bootstrap";

const Message = ({msg, variant = "danger"}) => {
  return (
    <Alert variant={variant}>{msg}</Alert>
  )
}

export default Message;
