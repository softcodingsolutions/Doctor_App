
import { useState, useEffect } from "react";
import { TbPlayerTrackNext } from "react-icons/tb";
function SaveUserDetailsButton(props) {
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
    
  return (
    <button
      onClick={props.function}
      type="submit"
      className="w-[20rem] p-1 text-white rounded-md text-lg border border-gray-500 font-medium text-lg hover:scale-105"
      style={{ backgroundColor: "#1F2937" }}
    >
      {props.name}
    </button>
  );
}

export default SaveUserDetailsButton;
