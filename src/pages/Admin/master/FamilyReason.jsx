import { useEffect, useState } from "react";
import AddNewFamily from "../../../components/Admin/AddNewFamily";
import { MdDelete, MdEdit } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";

function FamilyReason() {
  const [getFamily, setGetFamily] = useState([]);

  const handleGetFamily = () => {
    axios
      .get("/api/v1/family_reasons")
      .then((res) => {
        console.log(res.data);
        setGetFamily(res.data?.family_reasons);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFamily = (hindi, gujarati, english) => {
    const formData = new FormData();
    formData.append("family_reason[details_in_hindi]", hindi);
    formData.append("family_reason[details_in_gujarati]", gujarati);
    formData.append("family_reason[details_in_english]", english);
    axios
      .post("api/v1/family_reasons", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your family reason has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetFamily();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFamily = (val) => {};

  const editFamily = (val) => {};

  useEffect(() => {
    handleGetFamily();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Family Reason List</div>
            <AddNewFamily
              handleApi={handleAddFamily}
              name="Add Family Reason"
              title="Add New Reason"
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
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getFamily.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Family Reason Found!
                    </th>
                  </tr>
                ) : (
                  getFamily.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details_in_english} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details_in_hindi} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details_in_gujarati} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => editFamily(val.id)}
                                className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"
                              >
                                <MdEdit size={20} />
                              </button>
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteFamily(val.id)}
                                className="font-semibold text-red-600 border border-gray-300 p-1 rounded-md hover:bg-[#c43e19] hover:text-white"
                              >
                                <MdDelete size={20} />
                              </button>
                            }
                          />
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

export default FamilyReason;
