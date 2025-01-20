import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ThComponent from "../../components/ThComponent";
import { AiOutlineFileSearch } from "react-icons/ai";
import axios from "axios";

const UserInquiry = () => {
  const context = useOutletContext();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const doctor_id = localStorage.getItem("main_id");

  const fetchData = () => {
    axios
      .get(`/api/v1/leads?doctor_id=${doctor_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const filteredData = data.filter((detail) => {
    const date = new Date(detail.created_at); 
    return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
  });

  return (
    <div className="flex w-full font-sans bg-white">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="flex-grow overflow-auto flex flex-wrap content-start">
        <div className="w-full p-2 flex flex-col gap-1">
          <div className="w-fit p-1">
            <button
              onClick={context[0]}
              type="button"
              className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
            >
              <img
                src="https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg"
                alt=""
              />
            </button>
          </div>
          <div className="animate-fade-left animate-delay-75 rounded-md animate-once animate-ease-out overflow-auto mt-10">
            <div className="flex justify-between items-center">
              <div className="flex justify-start text-2xl font-bold tracking-wide">
                <AiOutlineFileSearch size={30} /> Inquiry
              </div>
              <div className="flex gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="border border-black p-1 rounded-md"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border border-black p-1 rounded-md"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i} value={currentYear - i}>
                      {currentYear - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <table className="w-full mt-2 z-0">
              <thead className="uppercase">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    name="User Name"
                    moreClasses="rounded-tl-md rounded-bl-md font-semibold"
                  />
                  <ThComponent name="Phone Number" moreClasses="font-semibold" />
                  <ThComponent name="Age" moreClasses="font-semibold" />
                  <ThComponent name="Health Issue" moreClasses="font-semibold" />
                </tr>
              </thead>
              <tbody>
                {filteredData.map((detail) => (
                  <tr key={detail.id}>
                    <td className="py-5 px-3 border-b border-b-gray-50 text-md font-medium">
                      {detail.name}
                    </td>
                    <td className="py-5 px-3 border-b border-b-gray-50 text-md font-medium">
                      {detail.phone}
                    </td>
                    <td className="py-5 px-3 border-b border-b-gray-50 text-md font-medium">
                      {detail.age}
                    </td>
                    <td className="py-5 px-3 border-b border-b-gray-50 text-md font-medium">
                      {detail.health_issue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInquiry;
