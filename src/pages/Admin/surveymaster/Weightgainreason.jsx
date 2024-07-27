import React from 'react'
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";
import AddWeightGain from '../../../components/Admin/AddWeightGain';
export default function Weightgainreason() {

  const handleWeightQuestion = (gujarati, english) => {
    
  };


  return (
    <div className="w-full p-2">
        <div className="rounded-lg bg-card h-[85vh] bg-white">
            <div className="flex px-4 py-3 h-full flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xl">Weight Gain Reason</div>
                  <AddWeightGain
                    handleApi={handleWeightQuestion}
                    name="Add Weight Gain Reason"
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
                          <ThComponent name="In Gujarati" />
                          <ThComponent />
                          <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                        </tr>
                    </thead>
                  </table>
                </div>
            </div>
        </div>
    </div>
  )
}
