import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AddNewSupplement from "../../../components/Admin/AddNewSupplement";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";
import EditNutrition from "../../../components/Admin/EditNutrition";

function NutritionSupplements() {
  const [getNutrition, setGetNutrition] = useState([]);
  const [editNutrition, setEditNutrition] = useState([]);

  const handleAddNutrition = (nutrition_name) => {
    const formData = new FormData();
    formData.append("nutrition[name]", nutrition_name);
    axios
      .post("/api/v1/nutritions", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your nutrition has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetNutrition();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetNutrition = () => {
    axios
      .get("/api/v1/nutritions")
      .then((res) => {
        console.log(res.data);
        setGetNutrition(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const deleteNutrition = (val) => {
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
          .delete(`/api/v1/nutritions/${val}`)
          .then((res) => {
            console.log(res);
            handleGetNutrition();
            Swal.fire({
              title: "Deleted!",
              text: "Your nutrition has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    });
  };

  const handleEditNutrition = (val) => {
    setEditNutrition(getNutrition.filter((item) => item?.id === val));
  };

  const handleEditNutritionApi = (nutrition_name, val) => {
    const formData = new FormData();
    formData.append("nutrition[name]", nutrition_name);
    axios.put(`api/v1/nutritions/${val}`, formData).then((res) => {
      console.log(res);
      if (res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated!",
          text: "Your nutrition has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      handleGetNutrition();
    });
  };

  useEffect(() => {
    handleGetNutrition();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">
              Nutrition & Supplements List
            </div>
            <div className="flex-grow" />
            <AddNewSupplement
              handleApi={handleAddNutrition}
              name="Add Nutrition/Supplement"
              title="Add New Nutrition/Supplement"
              nutrition_name="Nutrition Name"
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
                  <ThComponent name="Nutrition Name" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getNutrition.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Nutrition & Supplements Found!
                    </th>
                  </tr>
                ) : (
                  getNutrition.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditNutrition
                            see={editNutrition}
                            function={() => {
                              handleEditNutrition(val.id);
                            }}
                            handleApi={handleEditNutritionApi}
                            title="Edit Nutrition"
                            nutrition_name="Nutrition Name"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteNutrition(val.id)}
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

export default NutritionSupplements;
