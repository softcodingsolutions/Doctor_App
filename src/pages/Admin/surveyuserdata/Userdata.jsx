import { useEffect, useState } from "react";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import InsideLoader from "../../InsideLoader";

export default function Userdata() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShow = () => {
    axios
      .get(`/api/v2/survey_users`)
      .then((res) => {
        console.log(res, "USER");
        setData(res.data.all_survey_users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between overflow-x-hidden">
            <div className="text-lg text-[#1F2937] font-semibold tracking-wide">
              SURVEY USER DATA
            </div>
          </div>
        </div>
        <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
          <table className="w-full min-w-[460px] z-0">
            <thead className="uppercase">
              <tr className="bg-[#1F2937] text-white rounded-md">
                <ThComponent
                  moreClasses={"rounded-tl-md rounded-bl-md"}
                  name="No."
                />
                <ThComponent name="Name" />
                <ThComponent name="Email" />
                <ThComponent name="Number" />
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <th
                    className="uppercase tracking-wide font-medium pt-[18rem] text-lg"
                    colSpan={8}
                  >
                    No Survey Users Found!
                  </th>
                </tr>
              ) : (
                data.map((val, index) => {
                  return (
                    <tr key={val.id}>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center text-lg">
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        {val.first_name[0]?.toUpperCase() +
                          val.first_name?.slice(1)}{" "}
                        {val.last_name[0]?.toUpperCase() +
                          val.last_name?.slice(1)}
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.email} />
                      </td>
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <TdComponent things={val.mobile_no} />
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
  );
}
