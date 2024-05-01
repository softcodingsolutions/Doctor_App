import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddNewSupplement from "../../../components/Admin/AddNewSupplement";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";

function NutritionSupplements() {
  const [getNutrition, setGetNutrition] = useState([]);

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
          });
      }
    });
  };

  const editNutrition = async (val) => {
    const see = getNutrition.filter((item) => item?.id === val);
    console.log(see);
    const { value: formValues } = await Swal.fire({
      title: "Edit the nutrition",
      html: `
            <div class="flex flex-col items-center justify-center text-black">
                <div>Nutrition Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.name}"/></div>
            </div> 
            `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    });

    if (formValues) {
      const formData = new FormData();
      formData.append("nutrition[name]", formValues[0]);
      axios.put(`api/v1/nutritions/${val}`, formData).then((res) => {
        console.log(res);
        handleGetNutrition();
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
      });
    }
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
                          <TdComponent
                            things={
                              <button
                                onClick={() => editNutrition(val.id)}
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
