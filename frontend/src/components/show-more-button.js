import React from "react";
import {Button} from "react-bootstrap";

const ShowMoreButton = ({onShowMore}) => {
  return (
    <Button
      className="btn-primary"
      onClick={onShowMore}
    >
      Show More
    </Button>
  )
}

export default ShowMoreButton;
