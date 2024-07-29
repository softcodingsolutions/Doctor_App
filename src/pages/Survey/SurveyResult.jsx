import React, { useEffect, useState } from "react";
import SurveyInput from "../../components/Survey/SurveyInput";
import { schema } from "./Schemas/SurveySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { set, useForm } from "react-hook-form";

export default function SurveyResult(){
    const navigate = useNavigate()
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    
    const submittedData = (d) =>{
        navigate("/surveyform2")
    }
    const handleCheckboxChange = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;
    
        if (isChecked) {
          setSelectedCheckboxes((prevState) => [...prevState, checkboxValue]);
        } else {
          setSelectedCheckboxes((prevState) =>
            prevState.filter((value) => value !== checkboxValue)
          );
        }
      };
      const items = [
       'Belly Area  (પેટ ના ભાગમા)',
       'West Area  (પેટ ના બાજુ ના ભાગમા)',
       'Thighs  (સાથળ ના ભાગમા)',
       'Hips  (નિતંબ ના ભાગમા)',
       'Arms  (હાથ ના ભાગમા)',
       'Chest  (છાતી ના ભાગમા)',
       'Full Body  (આખા શરીર મા)'
      ]
     
    return(
        <div>
             <header className="bg-[#FEFAF6] h-20">
                <div className=" items-center absolute p-3" >
                        <img src="https://slimandsmile.com/assets/front/images/logo.png" alt="" className="h-16"   />
                </div>
                <div className="flex justify-center p-3">
                        <h1 className="text-2xl  text-[#1F2937] font-bold" >Surveillance @ Overweight</h1>
                </div>
            </header>
             <body>
                <div className="flex justify-center rounded-md  bg-[#F6F5F2] border px-10 py-5  shadow-sm">
                   <div className="w-[700px]  flex flex-col justify-center items-center p-10 bg-[#EEEEEE] ">
                        <h2> Survey Result  </h2>
                        
                   </div>
                </div>
            </body>
            <footer>
                <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
                    <a className="text-lg text-[#799351] font-semibold" href="https://slimandsmile.com">Contact Us @ Slim And Smile</a>
                </div>
            </footer>
        </div>
    )
}