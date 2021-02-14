import React from 'react'

const NotFound = ({message}) => {
  return (
    <div>
      404 - {message}
    </div>
  )
};

NotFound.defaultProps = {
  message: "Page not found"
};

export default NotFound;
