import { useEffect, useState } from "react";
import AddNewMedicine from "../../../components/Admin/AddNewMedicine";
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import axios from "axios";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import EditMedicine from "../../../components/Admin/EditMedicine";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function Medicine() {
  const [getMedicines, setGetMedicines] = useState([]);
  const [editMedicine, setEditMedicine] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleGetMedicines = () => {
    axios
      .get("/api/v1/medicines")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data?.medicines);
              setGetMedicines(res.data?.medicines);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Med: ",
                res.data?.medicines?.filter((med) => med.user_id == getDoctorId)
              );
              setGetMedicines(
                res.data?.medicines?.filter((med) => med.user_id == getDoctorId)
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Med: ",
            res.data?.medicines?.filter((med) => med.user_id == main_id)
          );
          setGetMedicines(
            res.data?.medicines?.filter((med) => med.user_id == main_id)
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(
          "Doctors: ",
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddMedicine = (med_name, med_contact, med_quantity, doc_id , update) => {
    const formData = new FormData();
    if (update) {
      axios
        .put(`/api/v1/medicines/update_or_create_medicine?medicine_name=${med_name}&medicine_quantity=${med_quantity}&doctor_id=${main_id}`)
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

          alert(err.response?.data?.message + "!");
        });
      }
    else {
      formData.append("medicine[medicine_name]", med_name);
      formData.append("medicine[medicine_content]", med_contact);
      formData.append("medicine[medicine_quantity]", med_quantity);
      formData.append("medicine[user_id]", main_id);
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
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleEditMedicine = async (val) => {
    setEditMedicine(getMedicines.filter((item) => item?.id === val));
  };

  const handleEditMedicineApi = (
    med_name,
    med_content,
    med_quantity,
    id,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("medicine[medicine_name]", med_name);
      formData.append("medicine[medicine_content]", med_content);
      formData.append("medicine[medicine_quantity]", med_quantity);
      formData.append("medicine[user_id]", main_id);
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
    } else {
      formData.append("medicine[medicine_name]", med_name);
      formData.append("medicine[medicine_content]", med_content);
      formData.append("medicine[medicine_quantity]", med_quantity);
      formData.append("medicine[user_id]", doc_id);
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
    }
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
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  useEffect(() => {
    handleGetMedicines();
    handleGetDoctors();
  }, [getDoctorId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Medicines List</div>
            <div className="flex gap-3">
              <AddNewMedicine
                handleApi={handleAddMedicine}
                name="Add Medicine"
                role={role}
                doctors={getDoctors}
                title="Add New Medicine"
                med_name="Drug's Name"
                med_content="Drug's Content"
                med_quantity="Drug's Quantity"
              />
              {role === "super_admin" && (
                <Select
                  required
                  defaultValue={"all"}
                  placeholder="Select"
                  value={getDoctorId}
                  onChange={(e, newValue) => setGetDoctorId(newValue)}
                >
                  <Option key={"all"} value="all">
                    All
                  </Option>
                  {getDoctors?.map((res) => {
                    return (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
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
                          <div className="flex items-center">
                            {index + 1}
                          </div>
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
                            role={role}
                            doctors={getDoctors}
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
