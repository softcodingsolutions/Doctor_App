import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import AddNewComplain from "../../../components/Admin/AddNewComplain";
import axios from "axios";
import Swal from "sweetalert2";
import EditComplain from "../../../components/Admin/EditComplain";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function Complains() {
  const [getComplain, setGetComplain] = useState([]);
  const [editComplain, setEditComplain] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleGetComplain = () => {
    axios
      .get("/api/v1/complaints")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data);
              setGetComplain(res.data);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Complains: ",
                res.data?.filter((comp) => comp.user_id == getDoctorId)
              );
              setGetComplain(
                res.data?.filter((comp) => comp.user_id == getDoctorId)
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Complains: ",
            res.data?.filter((comp) => comp.user_id == main_id)
          );
          setGetComplain(res.data?.filter((comp) => comp.user_id == main_id));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.message);
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
        alert(err.message);
      });
  };

  const handleAddComplain = (complain, doc_id) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("complaint[details]", complain);
      formData.append("complaint[user_id]", main_id);
      axios
        .post("/api/v1/complaints", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your complain has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetComplain();
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else {
      formData.append("complaint[details]", complain);
      formData.append("complaint[user_id]", doc_id);
      axios
        .post("/api/v1/complaints", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your complain has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetComplain();
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  const handleEditComplain = (val) => {
    setEditComplain(getComplain.filter((item) => item?.id === val));
  };

  const handleEditComplainApi = (complain_details, id, doc_id) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("complaint[details]", complain_details);
      formData.append("complaint[user_id]", main_id);
      axios.put(`api/v1/complaints/${id}`, formData).then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your complain has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetComplain();
      });
    } else {
      formData.append("complaint[details]", complain_details);
      formData.append("complaint[user_id]", doc_id);
      axios.put(`api/v1/complaints/${id}`, formData).then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your complain has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetComplain();
      });
    }
  };

  const deleteComplain = (val) => {
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
          .delete(`/api/v1/complaints/${val}`)
          .then((res) => {
            console.log(res);
            handleGetComplain();
            Swal.fire({
              title: "Deleted!",
              text: "Your complain has been deleted.",
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
    handleGetComplain();
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
            <div className="font-semibold text-xl">Complains List</div>
            <div className="flex gap-3">
              <AddNewComplain
                handleApi={handleAddComplain}
                name="Add Complain"
                title="Add New Complain"
                complain_details="Details"
                role={role}
                doctors={getDoctors}
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
                  <ThComponent name="Complain Details" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getComplain.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Complains Found!
                    </th>
                  </tr>
                ) : (
                  getComplain.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.details} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditComplain
                            see={editComplain}
                            function={() => {
                              handleEditComplain(val.id);
                            }}
                            handleApi={handleEditComplainApi}
                            title="Edit Complain"
                            complain_details="Details"
                            role={role}
                            doctors={getDoctors}
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteComplain(val.id)}
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

export default Complains;
