import React from 'react'

const ServerError = ({status, message}) => {
  return (
    <div>
      {status} - {message}
    </div>
  )
};

export default ServerError;
