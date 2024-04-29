import { useEffect, useState } from "react";
import AddNewDiet from "../../../components/Admin/AddNewDiet";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

function DietMaster() {
  const [getDiet, setGetDiet] = useState([]);

  const handleAddDiet = (diet_code, diet_describe, diet_name) => {
    const formData = new FormData();
    formData.append("diet[name]", diet_name);
    formData.append("diet[code]", diet_code);
    formData.append("diet[chart_english]", diet_describe);
    axios
      .post("/api/v1/diets", formData)
      .then((res) => {
        console.log(res.data);
        handleGetDiet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetDiet = () => {
    axios
      .get("/api/v1/diets")
      .then((res) => {
        console.log(res.data);
        setGetDiet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editDiet = async (val) => {
    const see = getDiet.filter((item) => item?.id === val);
    console.log(see);
    const { value: formValues } = await Swal.fire({
      title: "Edit the diet",
      html: `
            <div class="flex flex-col items-center justify-center text-black">
                <div>Diet Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.name}"/></div>
                <div>Diet Code:<input type=text" id="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.code}"/></div>
                <div class="flex items-center">Diet Description: <textarea rows="5" cols="30" type="text" id="swal-input3" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md">
                ${see[0]?.chart_english}</textarea>
              </div>
            </div> 
            `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    });

    if (formValues) {
      const formData = new FormData();
      formData.append("diet[name]", formValues[0]);
      formData.append("diet[code]", formValues[1]);
      formData.append("diet[chart_english]", formValues[2]);
      axios.put(`api/v1/diets/${val}`, formData).then((res) => {
        console.log(res);
        handleGetDiet();
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your diet has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const deleteDiet = (val) => {
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
          .delete(`/api/v1/diets/${val}`)
          .then((res) => {
            console.log(res);
            handleGetDiet();
            Swal.fire({
              title: "Deleted!",
              text: "Your diet has been deleted.",
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
    handleGetDiet();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Diet List</div>
              <div className="flex-grow" />
              <AddNewDiet
                handleApi={handleAddDiet}
                name="Add Diet"
                title="Add New Diet"
                diet_code="Diet Code"
                diet_name="Diet Name"
                diet_describe="Details"
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
                  <ThComponent name="Diet Code" />
                  <ThComponent name="Diet Name" />
                  <ThComponent name="Diet Description" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getDiet.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Diet Found!
                    </th>
                  </tr>
                ) : (
                  getDiet.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.code} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.chart_english} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => editDiet(val.id)}
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
                                onClick={() => deleteDiet(val.id)}
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

export default DietMaster;
