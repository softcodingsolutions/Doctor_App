import React,{useState,useEffect} from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
export default function MedicalTable(props) {
  return (
    <>
      <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Medicine Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Content
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Quentity
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Remaining
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium py-3 px-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((data,index) => {
                    return(
                    <tr key={index} className="map">
                        <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {data.name}
                        </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {data.content}
                        </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {data.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <span className="text-black text-sm font-medium ml-1">
                          {data.remaining_quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <button
                          
                          className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                    )
                })}
              </tbody>
    </table>
    </>
  )
}
