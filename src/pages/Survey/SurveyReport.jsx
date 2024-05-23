import React, { useEffect, useState } from "react";
import axios from "axios";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
function createData(reason,total,male,female) {
    return {reason,total,male,female };
  }
  
  const rows1 = [
    createData('Under Weight',"6%" , "3%" ,"3%"),
    createData('Normal Weight', '3%','1%','2%'),
    createData('Midlyover Weight','37%','19%','18%'),
    createData('Moderate obesity', '37%','21%','16%'),
    createData('Severe obesity', '16%','8%','7%'),
  ];
  
  
export default function SurveyReport(){
    const [stripe, setStripe] = React.useState('odd');
    return(
     <div className="">
        <header>
            <div className="absolute " >
                    <img src="https://slimandsmile.com/assets/front/images/logo.png" alt="" className="h-16"   />
            </div>
            <div className="flex justify-center">
                    <h1 className="text-2xl m-3 text-[#1F2937] font-bold" >Surveillance @ Overweight</h1>
            </div>
        </header>
        <main>
            <div className="">
                <div className="text-center font-semibold text-[#799351]">
                    <h2>Summary of participants in the campaign of "Surveillance @ Overweight"</h2>
                    <h4>Total number of Surveys: 4925</h4>
                </div>
                
                <div className="grid grid-cols-2 ">
                    
                    <div className="flex flex-col items-center border-2 ">
                        <label>Obesity based on BMI</label>
                        <Table aria-label="striped table" stripe={stripe}>
                            <thead>
                            <tr>
                                <th ></th>
                                <th>Total%</th>
                                <th>Male%</th>
                                <th>Female%</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows1.map((row) => (
                                <tr >
                                    <td>{row.reason}</td>
                                    <td>{row.total}</td>
                                    <td>{row.male}</td>
                                    <td>{row.female}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="flex flex-col items-center border-2 ">
                        <label>The key reason for the weight gain is base on participants opinion</label>
                        <table className="w-[470px]">
                            <thead className="border-b-2 border-black">
                                <tr className="p-10">
                                    <td>Reason</td>
                                    <td>Total %</td>
                                    <td>Male %</td>
                                    <td>Female %</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="p-10">
                                    <td className="py-4">Sedentary life (બેઠાડુ જીવન)</td>
                                    <td>24%</td>
                                    <td>19%</td>
                                    <td>5%</td>
                                </tr>
                                <tr className="p-10">
                                    <td className="py-4">Over Eating (અતિશય આહાર)</td>
                                    <td>6%</td>
                                    <td>5%</td>
                                    <td>1%</td>
                                </tr>
                                <tr className="p-10">
                                    <td className="py-4">After delivery (ડિલિવરી પછી)</td>
                                    <td>12%</td>
                                    <td>0%</td>
                                    <td>12%</td>
                                </tr>
                                <tr className="p-10">
                                    <td className="py-4">Excessive use of allopathiy medicine <br />(એલોપથી દવાઓના અતિશય ઉપયોગ થી)</td>
                                    <td>3%</td>
                                    <td>1%</td>
                                    <td>2%</td>
                                </tr>
                                <tr className="p-10">
                                    <td className="py-4">Do not know (ખબર નથી) </td>
                                    <td>51%</td>
                                    <td>28%</td>
                                    <td>23%</td>
                                </tr>
                                <tr className="p-10">
                                    <td className="py-4">After Surgery (સર્જરી પછી)</td>
                                    <td>4%</td>
                                    <td>1%</td>
                                    <td>3%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div className="text-center">
                <a className="" href="https://slimandsmile.com">Contact Us @ Slim And Smile</a>
            </div>
        </footer>
     </div>
    )
}