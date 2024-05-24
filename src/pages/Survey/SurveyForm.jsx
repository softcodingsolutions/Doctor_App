import React, { useEffect, useState } from "react";
import SurveyInput from "../../components/Survey/SurveyInput";
import { schema } from "./Schemas/SurveySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function SurveyForm(){
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    
    const submittedData = (d) =>{

    }
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
            <div className="border px-10 py-5 rounded-sm shadow-sm">
                <form
                onSubmit={handleSubmit(submittedData)}
                className="w-full flex flex-col justify-center items-center"
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
                    <p>Please enter Height in centimeter and enter data more than 100</p>
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
                    <div>
                    <label className="text-lg text-end w-1/3 mr-2">Gender:</label>
                        <select
                            name="gender"
                            defaultValue="select"
                            {...register("gender")}
                            className="py-1 px-2 rounded-md border border-black w-full"
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
                    <div>
                    <label className="text-lg text-end w-1/3 mr-2">Language:</label>
                        <select
                            name="language"
                            defaultValue="English"
                            {...register("language")}
                            className="py-1 px-2 rounded-md border border-black w-full"
                        >
                            <option value="English" >English</option>
                            <option value="Gujarati">Gujarati</option>
                        </select>
                    </div>
                </form>
            </div>
        </body>
        </div>
    )
}