import { useNavigate } from "react-router-dom";

function NextPageButton(props) {
  const navigate = useNavigate();
  const handleToNextPage = () => {
    navigate(`${props.to}`);
  };
  return (
    <button
      onClick={handleToNextPage}
      className={`px-3 py-1.5 border-[1.5px] rounded-md text-white bg-gray-800 hover:scale-105 border-x-gray-300`}
    >
      Next Page {props.name}
    </button>
  );
}

export default NextPageButton;
