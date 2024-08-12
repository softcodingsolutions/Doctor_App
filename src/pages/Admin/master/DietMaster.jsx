import { useEffect, useState } from "react";
import AddNewDiet from "../../../components/Admin/AddNewDiet";
import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import EditDiet from "../../../components/Admin/EditDiet";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function DietMaster() {
  const [getDiet, setGetDiet] = useState([]);
  const [editDiet, setEditDiet] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleAddDiet = (
    diet_code,
    diet_name,
    diet_english,
    diet_hindi,
    diet_gujarati,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("diet[name]", diet_name);
      formData.append("diet[code]", diet_code);
      formData.append("diet[chart_english]", diet_english);
      formData.append("diet[chart_hindi]", diet_hindi);
      formData.append("diet[chart_gujarati]", diet_gujarati);
      formData.append("diet[user_id]", main_id);
      axios
        .post("/api/v1/diets", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your diet has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetDiet();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } else {
      formData.append("diet[name]", diet_name);
      formData.append("diet[code]", diet_code);
      formData.append("diet[chart_english]", diet_english);
      formData.append("diet[chart_hindi]", diet_hindi);
      formData.append("diet[chart_gujarati]", diet_gujarati);
      formData.append("diet[user_id]", doc_id);
      axios
        .post("/api/v1/diets", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added!",
              text: `Your diet has been added.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleGetDiet();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    }
  };

  const handleGetDiet = () => {
    axios
      .get("/api/v1/diets")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data);
              setGetDiet(res.data);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Diet: ",
                res.data?.filter((diet) => diet.user_id == getDoctorId)
              );
              setGetDiet(
                res.data?.filter((diet) => diet.user_id == getDoctorId)
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Diet: ",
            res.data?.filter((diet) => diet.user_id == main_id)
          );
          setGetDiet(res.data?.filter((diet) => diet.user_id == main_id));
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

  const handleEditDiet = (val) => {
    setEditDiet(getDiet.filter((item) => item?.id === val));
  };

  const handleEditDietApi = async (
    diet_code,
    diet_name,
    english,
    hindi,
    gujarati,
    id,
    doc_id
  ) => {
    const formData = new FormData();
    if (role === "doctor") {
      formData.append("diet[name]", diet_name);
      formData.append("diet[code]", diet_code);
      formData.append("diet[chart_english]", english);
      formData.append("diet[chart_hindi]", hindi);
      formData.append("diet[chart_gujarati]", gujarati);
      formData.append("diet[user_id]", main_id);
      axios.put(`api/v1/diets/${id}`, formData).then((res) => {
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
    } else {
      formData.append("diet[name]", diet_name);
      formData.append("diet[code]", diet_code);
      formData.append("diet[chart_english]", english);
      formData.append("diet[chart_hindi]", hindi);
      formData.append("diet[chart_gujarati]", gujarati);
      formData.append("diet[user_id]", doc_id);
      axios.put(`api/v1/diets/${id}`, formData).then((res) => {
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
            alert(err.response?.data?.message + "!");
          });
      }
    });
  };

  useEffect(() => {
    handleGetDiet();
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
            <div className="font-semibold text-xl">Diet List</div>
            <div className="flex gap-3">
              <AddNewDiet
                handleApi={handleAddDiet}
                name="Add Diet"
                title="Add New Diet"
                diet_code="Diet Code"
                diet_name="Diet Name"
                role={role}
                doctors={getDoctors}
                diet_describe_english="Details"
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
                  <ThComponent name="Diet Code" />
                  <ThComponent name="Diet Name" />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
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
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.chart_english,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.chart_hindi,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.chart_gujarati,
                                }}
                              />
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditDiet
                            see={editDiet}
                            function={() => {
                              handleEditDiet(val.id);
                            }}
                            handleApi={handleEditDietApi}
                            title="Edit Diet"
                            diet_code="Diet Code"
                            role={role}
                            doctors={getDoctors}
                            diet_name="Diet Name"
                            diet_describe_english="Details"
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
