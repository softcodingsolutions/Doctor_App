import React from "react";
import { Link } from "react-router-dom";

function LinkTo(props) {
  return (
    <Link to={props.to} className="-mt-2 underline text-sm mb-4 ">
      {props.name}
    </Link>
  );
}

export default LinkTo;
