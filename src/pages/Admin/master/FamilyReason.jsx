import { useEffect, useState } from "react";
import AddNewFamily from "../../../components/Admin/AddNewFamily";
import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import axios from "axios";
import Swal from "sweetalert2";
import EditFamilyReason from "../../../components/Admin/EditFamilyReason";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function FamilyReason() {
  const [getFamily, setGetFamily] = useState([]);
  const [editFamily, setEditFamily] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);


  const handleGetFamily = () => {
    axios
      .get("/api/v1/family_reasons")
      .then((res) => {
        console.log(res.data);
        setGetFamily(res.data?.family_reasons);
        setLoading(false);
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data);
              setGetFamily(res.data?.family_reasons);
            } else {
              console.log(
                "Particular Doctor Family Reasons: ",
                res.data?.family_reasons?.filter(
                  (fam) => fam.user_id == getDoctorId
                )
              );
              setGetFamily(
                res.data?.family_reasons?.filter(
                  (fam) => fam.user_id == getDoctorId
                )
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Family Reasons: ",
            res.data?.family_reasons?.filter((fam) => fam.user_id == main_id)
          );
          setGetFamily(
            res.data?.family_reasons?.filter((fam) => fam.user_id == main_id)
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

  const handleAddFamily = (hindi, gujarati, english, doc_id) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("family_reason[details_in_hindi]", hindi);
      formData.append("family_reason[details_in_gujarati]", gujarati);
      formData.append("family_reason[details_in_english]", english);
      formData.append("family_reason[user_id]", main_id);
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
          alert(err.response?.data?.message + "!");
        });
    } else {
      formData.append("family_reason[details_in_hindi]", hindi);
      formData.append("family_reason[details_in_gujarati]", gujarati);
      formData.append("family_reason[details_in_english]", english);
      formData.append("family_reason[user_id]", doc_id);
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
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const deleteFamily = (val) => {
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
          .delete(`/api/v1/family_reasons/${val}`)
          .then((res) => {
            console.log(res);
            handleGetFamily();
            Swal.fire({
              title: "Deleted!",
              text: "Your family reason has been deleted.",
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

  const handleEditFamily = (val) => {
    setEditFamily(getFamily.filter((item) => item?.id === val));
  };

  const handleEditFamilyApi = (hindi, gujarati, english, id, doc_id) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("family_reason[details_in_hindi]", hindi);
      formData.append("family_reason[details_in_gujarati]", gujarati);
      formData.append("family_reason[details_in_english]", english);
      formData.append("family_reason[user_id]", main_id);
      axios
        .put(`api/v1/family_reasons/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Updated!",
              text: "Your family reason has been updated.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetFamily();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } else {
      formData.append("family_reason[details_in_hindi]", hindi);
      formData.append("family_reason[details_in_gujarati]", gujarati);
      formData.append("family_reason[details_in_english]", english);
      formData.append("family_reason[user_id]", doc_id);
      axios
        .put(`api/v1/family_reasons/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Updated!",
              text: "Your family reason has been updated.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetFamily();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  useEffect(() => {
    handleGetFamily();
    handleGetDoctors();
  }, [getDoctorId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[75vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Family History List</div>
            <div className="flex gap-3">
              <AddNewFamily
                handleApi={handleAddFamily}
                name="Add Family History"
                title="Add New Family History"
                details="Details"
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
              <thead className="uppercase sticky top-0 z-10">
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
                          <div className="flex items-center">
                            {index + 1 }
                          </div>{" "}
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
                          <EditFamilyReason
                            see={editFamily}
                            function={() => {
                              handleEditFamily(val.id);
                            }}
                            role={role}
                            doctors={getDoctors}
                            handleApi={handleEditFamilyApi}
                            title="Edit Family Reason"
                            details="Details"
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
