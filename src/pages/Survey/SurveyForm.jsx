import React, { useEffect, useState } from "react";
import SurveyInput from "../../components/Survey/SurveyInput";
import { schema } from "./Schemas/SurveySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { set, useForm } from "react-hook-form";

export default function SurveyForm(){
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
                    <form
                        onSubmit={handleSubmit(submittedData)}
                        className="w-[700px]  flex flex-col justify-center items-center p-10 bg-[#EEEEEE] "
                        method="post"
                        >
                            <SurveyInput  
                                title="First Name"
                                name="firstname"
                                type="text"
                                placeholder="firstname"
                                hook={register("firstname")}
                            />
                            <SurveyInput
                                title="Last Name"
                                name="lastname"
                                type="text"
                                placeholder="lastname"
                                hook={register("lastname")}
                            />
                            <SurveyInput 
                                title="Email"
                                name="email"
                                type="email"
                                placeholder="email"
                                hook={register("email")}
                            />
                            {errors.email && (
                                <span className="text-s text-red-500  -mt-2.5">
                                {errors.email?.message}
                                </span>
                            )}
                            <SurveyInput
                                title="Mobile Number"
                                name="mobile"
                                type="text"
                                placeholder="mobile number"
                                hook={register("mobile")}
                            />
                            {errors.mobile && (
                                <span className="text-sm  text-red-500 -mt-2.5">
                                {errors.mobile?.message}
                                </span>
                            )} 
                            <SurveyInput
                                title="Age"
                                name="age"
                                type="number"
                                placeholder="age"
                                hook={register("age")}
                            />
                            {errors.age && (
                                <span className="text-sm  text-red-500 -mt-2.5">
                                {errors.age?.message}
                                </span>
                            )} 
                            <SurveyInput
                                title="Height(cm)"
                                name="height"
                                type="text"
                                placeholder="height(cm)"
                                hook={register("height")}
                            />
                            {errors.age && (
                                <span className="text-sm  text-red-500 -mt-2.5">
                                {errors.height?.message}
                                </span>
                            )} 
                            <p className="text-[#1F2937] text-sm">Please enter Height in centimeter and enter data more than 100</p>
                            <SurveyInput
                                title="Weight(kg)"
                                name="weight"
                                type="text"
                                placeholder="weight"
                                hook={register("weight")}
                            />
                            {errors.age && (
                                <span className="text-sm  text-red-500 -mt-2.5">
                                {errors.age?.message}
                                </span>
                            )} 
                            <div className="grid py-2 my-1">
                            <label className="text-md text-[#799351] font-medium">Gender:</label>
                                <select
                                    name="gender"
                                    defaultValue="select"
                                    {...register("gender")}
                                    className="py-1 px-2 rounded-md border border-black w-[25rem]"
                                >
                                    <option value="select" disabled>
                                    Select One
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && (
                                <span className="text-sm  text-red-500 -mt-2.5">
                                    {errors.gender?.message}
                                </span>
                                )}
                            </div>
                            <div className="grid py-2 my-1">
                            <label className="text-md text-[#799351] font-medium">Language:</label>
                                <select
                                    name="language"
                                    defaultValue="English"
                                    {...register("language")}
                                    className="py-1 px-2 rounded-md border border-black w-[25rem]"
                                >
                                    <option value="English" >English</option>
                                    <option value="Gujarati">Gujarati</option>
                                </select>
                            </div>
                            <div className="grid py-2 my-1">
                            <label className="text-lg text-[#799351] font-medium">Fat Deposition Body Parts  ( kindly click in box ):</label>
                                {items.map((item, index) => (
                                    <div key={index} >
                                    <input
                                        value={item}
                                        onChange={handleCheckboxChange}
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`checkbox-${index}`}>{item}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center flex-col items-center">
                                <label className="text-lg text-[#799351] font-medium">What could be your reason for your weight gain?</label>
                                <label className="text-lg text-[#799351] font-medium">તમારા માનવા પ્રમાણે તમારૂ વજન વધવાનું કારણ શુ છે?</label>
                                <div className=" w-[370px] m-3">
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="Sedentary life (બેઠાડુ જીવન)"
                                            {...register("question")}
                                            className="mr-2"
                                        />
                                        Sedentary life (બેઠાડુ જીવન)
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="Over Eating (અતિશય આહાર)"
                                            {...register("question")}
                                            className="mr-2"
                                        />
                                        Over Eating (અતિશય આહાર)
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="After delivery (ડિલિવરી પછી)"
                                            {...register("question")}
                                            className="mr-2"
                                        />
                                        After delivery (ડિલિવરી પછી)
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="Excessive use of allopathiy medicine(એલોપથી દવાઓના અતિશય ઉપયોગ થી)"
                                            {...register("question")}
                                            className="mr-2"
                                        />
                                        Excessive use of allopathiy medicine(એલોપથી દવાઓના અતિશય ઉપયોગ થી)
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="Do not know (ખબર નથી)"
                                            {...register("question")}
                                            className="mr-2"
                                            defaultChecked={true}
                                            
                                        />
                                        Do not know (ખબર નથી)
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name="question"
                                            value="After Surgery (સર્જરી પછી)"
                                            {...register("question")}
                                            className="mr-2"
                                            
                                        />
                                        After Surgery (સર્જરી પછી)
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-[25rem] p-1  rounded-md border text-[#1F2937] border-gray-500 font-bold text-lg hover:scale-105"
                                style={{ backgroundColor: '#799351' }}
                                >
                                    Submit
                                </button>
                            </div>
                    </form>
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