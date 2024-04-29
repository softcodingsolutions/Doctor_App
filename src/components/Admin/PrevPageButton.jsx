import { useNavigate } from "react-router-dom";

function PrevPageButton(props) {
  const navigate = useNavigate();
  const handleToPreviousPage = () => {
    navigate(`${props.to}`);
  };

  return (
    <button
      onClick={handleToPreviousPage}
      className={`px-3 py-1.5 border-[1.5px] rounded-md text-white bg-gray-700 hover:scale-105 border-x-gray-300`}
    >
      Prev
    </button>
  );
}

export default PrevPageButton;
