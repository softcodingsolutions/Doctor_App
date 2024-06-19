import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';

export default function MedicalTable({ data, refreshData }) {
  const handleRemove = (id) => {
    axios.delete(`/api/v1/medicine_inventories/${id}`).then((res) => {
      console.log(res);
      refreshData();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
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
            Quantity
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
        {data.map((item, index) => (
          <tr key={index} >
            <td className=" border-b border-b-gray-50">
              <span className="text-black text-sm font-medium ml-1">
                {item.name}
              </span>
            </td>
            <td className=" border-b border-b-gray-50">
              <span className="text-black text-sm font-medium ml-1">
                {item.content}
              </span>
            </td>
            <td className=" border-b border-b-gray-50">
              <span className="text-black text-sm font-medium ml-1">
                {item.quantity}
              </span>
            </td>
            <td className=" border-b border-b-gray-50">
              <span className="text-black text-sm font-medium ml-1">
                {item.remaining_quantity}
              </span>
            </td>
            <td className=" border-b border-b-gray-50">
              <button
                onClick={() => handleRemove(item.id)}
                className="min-w-fit border cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 m-2 rounded-md"
              >
                <AiOutlineDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
