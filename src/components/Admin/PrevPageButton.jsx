import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LiaFastBackwardSolid } from "react-icons/lia";

function PrevPageButton(props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const navigate = useNavigate();

  const handleToPreviousPage = () => {
    navigate(props.to);
  };

  return (
    <button
      onClick={props.back ?? handleToPreviousPage}
      className={`px-3 py-1.5 border-[1.5px] rounded-md text-white text-lg bg-gray-800 hover:scale-105 border-x-gray-300`}
    >
      {isMobile ? (
        <LiaFastBackwardSolid size={20} />
      ) : (
        `Previous Page `
      )}
    </button>
  );
}

export default PrevPageButton;
