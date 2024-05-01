import { MdDelete, MdEdit } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import AddNewWeight from "../../../components/Admin/AddNewWeight";
import axios from "axios";
import Swal from "sweetalert2";

function WeightReason() {
  const [getWeight, setGetWeight] = useState([]);

  const handleGetWeight = () => {
    axios
      .get("/api/v1/weight_reasons")
      .then((res) => {
        console.log(res.data);
        setGetWeight(res.data?.weight_reasons);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddWeight = (reason_name, reason_for, reason_comments) => {
    const formData = new FormData();
    formData.append("weight_reason[name]", reason_name);
    formData.append("weight_reason[for]", reason_for);
    formData.append("weight_reason[comments]", reason_comments);
    axios
      .post("api/v1/weight_reasons", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your weight reason has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetWeight();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editWeight = (val) => {};

  const deleteWeight = (val) => {
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
          .delete(`/api/v1/weight_reasons/${val}`)
          .then((res) => {
            console.log(res);
            handleGetWeight();
            Swal.fire({
              title: "Deleted!",
              text: "Your weight reason has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    handleGetWeight();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Weight Reason List</div>
              <div className="flex-grow" />
              <AddNewWeight
                handleApi={handleAddWeight}
                name="Add Weight Reason"
                title="Add New Weight Reason"
                reason_name="Weight Name"
                reason_for="Gender"
                reason_comments="Comments"
              />
            </div>
          </div>

          <div className="animate-fade-left animate-delay-75-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="Weight Name" />
                  <ThComponent name="For" />
                  <ThComponent name="Comments" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getWeight.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Weight Reasons Found!
                    </th>
                  </tr>
                ) : (
                  getWeight.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.for} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.comments} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => editWeight(val.id)}
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
                                onClick={() => deleteWeight(val.id)}
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

export default WeightReason;
