import { useState, useEffect } from "react";
import ThComponent from "../../components/ThComponent";
import { useOutletContext } from "react-router-dom";
import { IoMdText } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiPaperPlane } from "react-icons/bi";

const SendMeassage = () => {
  const context = useOutletContext();
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-2">
          <button
            onClick={context?.[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="overflow-x-auto w-full animate-fade-left animate-delay-75 bg-white p-2 border rounded-md animate-once animate-ease-out h-screen">
          <div className="flex justify-center gap-1  m-2 ">
            <label className="font-poppins font-medium text-lg  p-1">Send Message</label>
            <BiPaperPlane size={20} className="mt-2"/>
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
      </div>
    </div>
  );
};

export default SendMeassage;
