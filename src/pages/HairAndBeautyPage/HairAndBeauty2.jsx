import haircare from "../../assets/images/hair-care.jpg";
import mobilehaircare from "../../assets/images/mobilehaircare.jpg";
import { useState, useEffect } from "react";
function HairAndBeauty2() {
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
    <div className=" w-full bg-white flex items-center ">
      <div className="w-full flex flex-col md:flex-row px-5">
        <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-11">
          <div className="font-semibold pt-10 text-sm md:text-md lg:text-lg mt-12 lg:mt-0 text-green-500">
            According to Ayurveda, dull, patchy skin or rough hair can result
            from the following factors:
          </div>
          <div className="flex justify-start w-full lg:pt-2 pt-0">
            <ul className="space-y-2.5 leading-loose text-base md:text-md text-pretty">
              <li>
                <span className="text-xl">&#11037;</span> Genetics and Family
                History
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Imbalances in Nerves,
                Emotions, and the Immune System
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Exposure to Pollution,
                Contaminated Water, and Toxins in Food
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Nutritional
                Deficiencies
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Use of Products
                Containing High Percentages of Harsh Chemicals
              </li>
            </ul>
          </div>
          <div className="lg:pt-5 mb-8 text-sm md:text-lg ">
            At{" "}
            <span className="text-green-600 font-medium">Slim and Smile</span>{" "}
            Ayu Care, we offer solutions to enhance the quality of your hair and
            skin. Our products are gentle and effective, and we provide
            treatments (medicines) to address and alleviate the side effects
            caused by the factors listed above.
          </div>
        </div>
        <div className="flex justify-end w-full md:w-2/3 lg:p-5 pt-0 md:pt-0">
          {isMobile ? (
            <img
              src={mobilehaircare}
              alt="image"
              className="w-[40vh] h-[30vh] rounded-lg"
            />
          ) : (
            <img
              src={haircare}
              alt="image"
              className="w-[100vh] h-[60vh] rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HairAndBeauty2;
