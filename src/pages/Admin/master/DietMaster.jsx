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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getDiet.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getDiet.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                {paginateCustomers().length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Diet Found!
                    </th>
                  </tr>
                ) : (
                  paginateCustomers().map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </div>{" "}
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
          {/* Pagination Controls */}
          {totalPages !== 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DietMaster;
