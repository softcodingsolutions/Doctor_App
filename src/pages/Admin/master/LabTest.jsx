import { useEffect, useState } from "react";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import AddLabTest from "../../../components/Admin/AddLabTest";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import EditLabTest from "../../../components/Admin/EditLabTest";
import InsideLoader from "../../InsideLoader";

function LabTest() {
  const [getTests, setGetTests] = useState([]);
  const [editTests, setEditTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const main_id = localStorage.getItem("main_id");
  const role = localStorage.getItem("role");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getTests.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getTests.length / rowsPerPage);

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

  const handleGetTests = () => {
    axios
      .get("/api/v1/labtest_managements")
      .then((res) => {
        console.log(res.data);
        setGetTests(res.data?.lab_managements);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddTests = (test_name, test_for, comments, doc_id) => {
    const formData = new FormData();
    formData.append("labtest_management[name]", test_name);
    formData.append("labtest_management[gender]", test_for);
    role === "doctor"
      ? formData.append("labtest_management[user_id]", main_id)
      : formData.append("labtest_management[user_id]", doc_id);
    formData.append("labtest_management[comments]", comments);
    axios
      .post("api/v1/labtest_managements", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your lab test has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetTests();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleEditTest = (val) => {
    setEditTests(getTests.filter((item) => item?.id === val));
  };

  const handleEditTestApi = (test_name, test_for, comments, id, doc_id) => {
    const formData = new FormData();
    formData.append("labtest_management[name]", test_name);
    formData.append("labtest_management[gender]", test_for);
    role === "doctor"
      ? formData.append("labtest_management[user_id]", main_id)
      : formData.append("labtest_management[user_id]", doc_id);
    formData.append("labtest_management[comments]", comments);
    axios
      .put(`api/v1/labtest_managements/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your lab test has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetTests();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const deleteTest = (val) => {
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
          .delete(`/api/v1/labtest_managements/${val}`)
          .then((res) => {
            console.log(res);
            handleGetTests();
            Swal.fire({
              title: "Deleted!",
              text: "Your lab test has been deleted.",
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
    handleGetTests();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Lab Test List</div>
            <AddLabTest
              handleApi={handleAddTests}
              name="Add New Test"
              title="Add Test"
              test_name="Test Name"
              gender="Gender"
              test_comments="Test Comments"
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
                  <ThComponent name="Test Name" />
                  <ThComponent name="Gender" />
                  <ThComponent name="Comments" />
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
                      No Tests Found!
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
                          <TdComponent things={val.name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              val.gender[0]?.toUpperCase() + val.gender.slice(1)
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.comments} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditLabTest
                            see={editTests}
                            function={() => {
                              handleEditTest(val.id);
                            }}
                            handleApi={handleEditTestApi}
                            title="Edit Test"
                            test_name="Test Name"
                            gender="Gender"
                            test_comments="Test Comments"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deleteTest(val.id)}
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

export default LabTest;
