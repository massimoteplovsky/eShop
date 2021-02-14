import React from "react";
import NotFound from "../components/not-found";
import ServerError from "../components/server-error";

const ErrorPage = ({error}) => {

  const {status, message} = error;

  if (status === 404) {
    return <NotFound message={message}/>
  }

  return <ServerError status={status} message={message}/>
}

export default ErrorPage;
