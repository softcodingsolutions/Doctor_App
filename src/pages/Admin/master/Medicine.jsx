import { useEffect, useState } from "react";
import AddNewMedicine from "../../../components/Admin/AddNewMedicine";
import { MdDelete, MdEdit } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";

function Medicine() {
  const [getMedicines, setGetMedicines] = useState([]);

  const handleGetMedicines = () => {
    axios
      .get("/api/v1/medicines")
      .then((res) => {
        console.log(res.data?.medicines);
        setGetMedicines(res.data?.medicines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddMedicine = (med_name, med_contact, med_quantity) => {
    const formData = new FormData();
    formData.append("medicine[medicine_name]", med_name);
    formData.append("medicine[medicine_content]", med_contact);
    formData.append("medicine[medicine_quantity]", med_quantity);
    axios
      .post("api/v1/medicines", formData)
      .then((res) => {
        console.log(res);
        handleGetMedicines();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMedicine = async (val) => {
    const see = getMedicines.filter((item) => item?.id === val);
    console.log(see);
    const { value: formValues } = await Swal.fire({
      title: "Edit the medicine",
      html: `
            <div class="flex flex-col items-center justify-center text-black">
                <div>Drug's Name:<input type="text" id="swal-input1" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.medicine_name}"/></div>
                <div>Drug's Content:<input type=text" id="swal-input2" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.medicine_content}"/></div>
                <div>Drug's Quantity:<input type="text" id="swal-input3" class="w-[15rem] p-1 mx-2 my-1.5 border border-gray-500 rounded-md" value="${see[0]?.medicine_quantity}"/></div>
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
      formData.append("medicine[medicine_name]", formValues[0]);
      formData.append("medicine[medicine_content]", formValues[1]);
      formData.append("medicine[medicine_quantity]", formValues[2]);
      axios.put(`api/v1/medicines/${val}`, formData).then((res) => {
        console.log(res);
        handleGetMedicines();
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your medicine has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const deleteMedicine = (val) => {
    axios
      .delete(`/api/v1/medicines/${val}`)
      .then((res) => {
        console.log(res);
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
            handleGetMedicines();
            Swal.fire({
              title: "Deleted!",
              text: "Your medicine has been deleted.",
              icon: "success",
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetMedicines();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Medicines List</div>
              <div className="flex-grow" />
              <AddNewMedicine
                handleApi={handleAddMedicine}
                name="Add Medicine"
                title="Add New Medicine"
                med_name="Drug's Name"
                med_content="Drug's Content"
                med_quantity="Drug's Quantity"
              />
            </div>
          </div>

          <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="Drug's Name" />
                  <ThComponent name="Drug's Content" />
                  <ThComponent name="Durg's Quantity" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getMedicines.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Medicine Found!
                    </th>
                  </tr>
                ) : (
                  getMedicines.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_content} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_quantity} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => editMedicine(val.id)}
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
                                onClick={() => deleteMedicine(val.id)}
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

export default Medicine;
