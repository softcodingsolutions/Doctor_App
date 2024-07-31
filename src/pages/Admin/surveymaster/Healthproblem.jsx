import React,{useEffect,useState} from 'react'
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import AddHealthProblem from '../../../components/Admin/AddHealthProblem';
import { CloseFullscreen } from '@mui/icons-material';
export default function Healthproblem() {
const[healthproblem,setHealthProblem] = useState([]);
  const handleAddHealth = (english) => {
    
  };

  const handleData =() =>{
    axios.get(`/api/v2/survey_helth_problems`).then((res)=>{
      console.log(res)
      setHealthProblem(res.data.all_survey_helth_problems);
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() =>{
    handleData();
  },[])

  return (
    <div className="w-full p-2">
        <div className="rounded-lg bg-card h-[85vh] bg-white">
            <div className="flex px-4 py-3 h-full flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xl">Health Problem Questions</div>
                  <AddHealthProblem
                    handleApi={handleAddHealth}
                    name="Add Health Problem Questions"
                    title="Add New Question"
                    details="Details"
                  />
                </div>

                <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
                  <table className="w-full min-w-[460px] z-0">
                    <thead className="uppercase ">
                        <tr className="bg-[#1F2937] text-white rounded-md">
                          <ThComponent
                            moreClasses={"rounded-tl-md rounded-bl-md"}
                            name="No."
                          />
                          <ThComponent name="In English" />
                          <ThComponent />
                          <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                        </tr>
                    </thead>
                    <tbody>
                {healthproblem.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Weight Reasons Found!
                    </th>
                  </tr>
                ) : (
                  healthproblem.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.problem} />
                        </td>    
                      </tr>
                    );
                  })
                )}
              </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
  )
}
