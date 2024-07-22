import { useEffect, useState } from "react";
import AddNewMedicine from "../../../components/Admin/AddNewMedicine";
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import EditMedicine from "../../../components/Admin/EditMedicine";

function Medicine() {
  const [getMedicines, setGetMedicines] = useState([]);
  const [editMedicine, setEditMedicine] = useState([]);

  const handleGetMedicines = () => {
    axios
      .get("/api/v1/medicines")
      .then((res) => {
        console.log(res.data?.medicines);
        setGetMedicines(res.data?.medicines);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your medicine has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetMedicines();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleEditMedicine = async (val) => {
    setEditMedicine(getMedicines.filter((item) => item?.id === val));
  };

  const handleEditMedicineApi = (med_name, med_content, med_quantity, id) => {
    const formData = new FormData();
    formData.append("medicine[medicine_name]", med_name);
    formData.append("medicine[medicine_content]", med_content);
    formData.append("medicine[medicine_quantity]", med_quantity);
    axios.put(`api/v1/medicines/${id}`, formData).then((res) => {
      console.log(res);
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
      handleGetMedicines();
    });
  };

  const deleteMedicine = (val) => {
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
          .delete(`/api/v1/medicines/${val}`)
          .then((res) => {
            console.log(res);
            handleGetMedicines();
            Swal.fire({
              title: "Deleted!",
              text: "Your medicine has been deleted.",
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

  useEffect(() => {
    handleGetMedicines();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Medicines List</div>
            <AddNewMedicine
              handleApi={handleAddMedicine}
              name="Add Medicine"
              title="Add New Medicine"
              med_name="Drug's Name"
              med_content="Drug's Content"
              med_quantity="Drug's Quantity"
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
                          <EditMedicine
                            title="Edit the medicine"
                            med_name="Medicine Name"
                            med_content="Medicine Content"
                            med_quantity="Medicine Quantity"
                            see={editMedicine}
                            function={() => {
                              handleEditMedicine(val.id);
                            }}
                            handleApi={handleEditMedicineApi}
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
