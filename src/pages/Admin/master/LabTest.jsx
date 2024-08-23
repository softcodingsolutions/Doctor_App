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
            text: "Your family reason has been added.",
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
            text: "Your family reason has been updated.",
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
                {getTests.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Tests Found!
                    </th>
                  </tr>
                ) : (
                  getTests.map((val, index) => {
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
        </div>
      </div>
    </div>
  );
}

export default LabTest;
