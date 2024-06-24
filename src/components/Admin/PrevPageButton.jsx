import { useNavigate } from "react-router-dom";

function PrevPageButton(props) {

  const handleToPreviousPage = () => {
    onBack
  };

  return (
    <button
      onClick={props.back}
      className={`px-3 py-1.5 border-[1.5px] rounded-md text-white  hover:scale-105 border-x-gray-300`}
      style={{ backgroundColor: "black" }}
    >
      Previous Page {props.name}
    </button>
  );
}

export default PrevPageButton;
