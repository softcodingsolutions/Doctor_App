import React from "react";

function Inputs(props) {
  return (
    <div className="grid py-2 my-1">
      <label htmlFor={props.type} className="text-lg">{props.title}</label>
      <input
      {...props.hook}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete="off"
        id={props.type}
        className="py-1 px-2 rounded-md border border-black w-[20rem]"
      />
    </div>
  );
}

export default Inputs;
