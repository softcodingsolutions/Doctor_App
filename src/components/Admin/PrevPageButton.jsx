import { useNavigate } from "react-router-dom";

function PrevPageButton(props) {
  const navigate = useNavigate();

  const handleToPreviousPage = () => {
    navigate(props.to);
  };

  return (
    <button
      onClick={props.back ?? handleToPreviousPage}
      className={`px-3 py-1.5 border-[1.5px] rounded-md text-white text-lg bg-gray-800 hover:scale-105 border-x-gray-300`}
    >
      Previous Page {props.name}
    </button>
  );
}

export default PrevPageButton;
