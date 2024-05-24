import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { set, useForm } from "react-hook-form";

export default function SurveyForm2() {
    const navigate = useNavigate();
    const [selectedCheckboxes2, setSelectedCheckboxes2] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const handleCheckboxChange2 = (e) =>{ 
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;
    
        if (isChecked) {
          setSelectedCheckboxes2((prevState) => [...prevState, checkboxValue]);
        } else {
          setSelectedCheckboxes2((prevState) =>
            prevState.filter((value) => value !== checkboxValue)
          );
        }
      }
      const submittedData2 = (d) =>{
        navigate('/surveyform3')
      }
      const handleBack = ()=>{
          navigate('/surveyform')
      }
      const items2 = [
        'High B.P',
        'Diabetes',
        'Heart Problem',
        'Hypothyroidism',
        'Infertility',
        'Pcod/Pcos',
        'Joint Pain',
        'Back Pain',
        'Did you observe that you have regained your body weight? શું તમારુ ઘટેલું વજન ફરીથી વધ્યું છે?',
        'No Complain'
      ]
  return (
    <div>
            <header className="bg-[#FEFAF6] h-20">
                <div className=" items-center absolute p-3" >
                        <img src="https://slimandsmile.com/assets/front/images/logo.png" alt="" className="h-16"   />
                </div>
                <div className="flex justify-center p-3">
                        <h1 className="text-2xl  text-[#1F2937] font-bold" >Surveillance @ Overweight</h1>
                </div>
            </header>
            <main>
                <div className="flex items-center justify-center border px-10 py-5 rounded-sm  bg-[#F6F5F2] shadow-sm min-h-[560px]">
                    <form
                        onSubmit={handleSubmit(submittedData2)}
                        className="w-[700px] p-2 flex flex-col justify-center rounded-md items-center bg-[#EEEEEE] "
                        method="post"
                        >
                            <div className="grid py-2 my-1 p-3">
                            <label className="text-xl text-[#799351] font-semibold">Kindly click your health problem ( If any )</label>
                                {items2.map((item, index) => (
                                    <div key={index}>
                                    <input
                                        value={item}
                                        onChange={handleCheckboxChange2}
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        className="mr-2 "
                                    />
                                    <label htmlFor={`checkbox-${index}`} className='p-2'>{item}</label>
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <button
                                    onClick={handleBack}
                                    type="submit"
                                    className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                                    style={{ backgroundColor: '#799351' }}
                                    >
                                        Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                                    style={{ backgroundColor: '#799351'}}
                                    >
                                        Submit
                                </button>
                            </div>
                    </form>
                </div>
            </main>
            <footer>
                <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
                    <a className="text-lg text-[#799351] font-semibold" href="https://slimandsmile.com">Contact Us @ Slim And Smile</a>
                </div>
            </footer>
    </div>
  )
}
