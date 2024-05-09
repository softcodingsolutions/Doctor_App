import React from "react";

function SaveTreatmentButtons(props) {
  return (
    <button
      type="button"
      onClick={props.function}
      className={`p-1.5 border-[1.5px] border-gray-400 rounded-md text-white bg-green-600 hover:scale-105`}
    >
      Save
    </button>
  );
}

export default SaveTreatmentButtons;
