import { useState, useEffect } from "react";
import ThComponent from "../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import { IoMdText } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiPaperPlane } from "react-icons/bi";

const SendMeassage = () => {
  const context = useOutletContext();
  return (
    <div className="flex flex-col overflow-x-auto w-full animate-fade-left animate-delay-75 bg-white p-2 border rounded-md animate-once animate-ease-out ">
      <div className="flex  justify-center gap-1  m-2 ">
        <label className="font-poppins font-medium text-lg  p-1">
          Send Message
        </label>
        <BiPaperPlane size={20} className="mt-2" />
      </div>
      <table className="w-full">
        <thead className="uppercase ">
          <tr className="bg-[#1F2937] text-white rounded-md">
            <ThComponent
              name="Case No."
              moreClasses={"rounded-tl-md rounded-bl-md"}
            />
            <ThComponent name="Patient Name" />
            <ThComponent name="Age" />
            <ThComponent name="Weight" />
            <ThComponent name="Mobile Number" />
            <ThComponent name="Created At" />
            <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">2045235</div>
            </td>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">P1 Test</div>
            </td>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">29</div>
            </td>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">89</div>
            </td>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">7048531528</div>
            </td>
            <td className="py-1 px-3 border-b border-b-gray-50">
              <div className="flex items-center text-sm">17/10/2024</div>
            </td>
            <td className="flex gap-8 justify-left py-2 px-3 border-b border-b-gray-50">
              <button className="flex items-center text-sm ">
                <IoMdText size={25} color="#218aff" />
              </button>
              <button className="flex items-center text-sm ">
                <IoLogoWhatsapp size={22} color="#25d366" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SendMeassage;
