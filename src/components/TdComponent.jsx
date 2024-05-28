import React from "react";

function TdComponent(props) {
  return (
    <div className="text-black text-sm font-medium ml-1 text-wrap">
      {props.things}
    </div>
  );
}

export default TdComponent;
