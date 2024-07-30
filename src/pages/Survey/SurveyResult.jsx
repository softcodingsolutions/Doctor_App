import React from "react";
import { useLocation } from "react-router-dom";

export default function SurveyResult() {
  const weight = parseFloat(localStorage.getItem("user_weight"));
  const height = parseFloat(localStorage.getItem("user_height")) / 100;

  const handleBMI = (w, h) => {
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      return bmi.toFixed(2);
    }
    return "Invalid input";
  };

  return (
    <div>
      <header className="bg-[#FEFAF6] h-20">
        <div className="items-center absolute p-3">
          <img
            src="https://slimandsmile.com/assets/front/images/logo.png"
            alt=""
            className="h-16"
          />
        </div>
        <div className="flex justify-center p-3">
          <h1 className="text-2xl text-[#1F2937] font-bold">
            Surveillance @ Overweight
          </h1>
        </div>
      </header>
      <div className="flex justify-center rounded-md bg-[#F6F5F2] border px-10 py-5 shadow-sm">
        <div className="w-[700px] flex flex-col justify-center items-center p-10 bg-[#EEEEEE]">
          <h2>Survey Result</h2>
          <h1>Your BMI Count is: {handleBMI(weight, height)}</h1>
        </div>
      </div>
      <footer>
        <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
          <a
            className="text-lg text-[#799351] font-semibold"
            href="https://slimandsmile.com"
          >
            Contact Us @ Slim And Smile
          </a>
        </div>
      </footer>
    </div>
  );
}
