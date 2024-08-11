import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";
import AddSurveyDos from "../../../components/Admin/AddSurveyDos";
import InsideLoader from "../../InsideLoader";

export default function SurveyDos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleData = () => {
    axios
      .get(`/api/v2/survey_dos`)
      .then((res) => {
        console.log(res, "DOS");
        setData(res.data.all_survey_do);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v2/survey_dos/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire("Deleted!", "The question has been deleted.", "success");
            handleData();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Error!",
              "There was an error deleting the question.",
              "error"
            );
          });
      }
    });
  };

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Survey Dos</div>
            <AddSurveyDos
              name="Add Dos"
              title="Add Dos"
              details="Please provide the details"
              handleApi={(gujarati, english) => {
                console.log("Gujarati:", gujarati);
                console.log("English:", english);
              }}
              refresh={handleData}
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
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Dos Found!
                    </th>
                  </tr>
                ) : (
                  data.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.in_english} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.in_gujarati} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(val.id)}
                          >
                            <MdDelete size={20} />
                          </button>
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
  );
}
