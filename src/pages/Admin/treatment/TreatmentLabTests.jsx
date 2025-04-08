import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveTreatmentButtons from "../../../components/Admin/SaveTreatmentButtons";
import Swal from "sweetalert2";
import InsideLoader from "../../InsideLoader";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function TreatmentLabTests() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [getTests, setGetTests] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("userId");
  const [getUser, setGetUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

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

  const handleGetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${user_id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetUser(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetTests = () => {
    axios
      .get("/api/v1/labtest_managements")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setGetTests(res.data?.lab_managements);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCheckboxes((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const handleSave = async () => {
    const selectedTests = selectedCheckboxes
      .map((id) => getTests.find((com) => com.id === Number(id)))
      .filter((com) => com);
    if (selectedTests.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Lab Test Selected",
        text: "Please select at least one test to save.",
      });
    }
    console.log("Selected Lab Test: ", selectedTests);

    const formData = new FormData();
    formData.append("user_labtest[labtest]", JSON.stringify(selectedTests));
    formData.append("user_labtest[user_id]", user_id);

    try {
      const response = await axios.post("/api/v1/user_labtests", formData);
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added!",
          text: `Your lab test has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        context?.[2]();
        handleGetTests();
        handleGetUser();
        navigate("/admin/patients/customer-details/progress-questions");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSelectedCheckboxes([]);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetTests();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  const givenLabTestIds =
    getUser?.user_labtests?.[getUser?.user_labtests?.length - 1]?.labtest || [];

  console.log(givenLabTestIds);

  return (
    <div className="flex px-4 py-3  flex-col space-y-3">
      <div className="flex gap-2 text-center items-center justify-between">
        <div className="font-[550] text-lg">
          No. of tests checked: {selectedCheckboxes?.length}
        </div>
      </div>
      <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto">
        <table className="w-full  z-0">
          <thead className="uppercase ">
            <tr className="bg-[#1F2937] text-white rounded-md">
              <ThComponent
                moreClasses={"rounded-tl-md rounded-bl-md"}
                name="Select"
              />
              <ThComponent name="Test Name" />
              <ThComponent name="Gender" />
              <ThComponent
                moreClasses={"rounded-tr-md rounded-br-md"}
                name="Comments"
              />
            </tr>
          </thead>
          <tbody>
            {paginateCustomers().length === 0 ? (
              <tr>
                <th
                  className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                  colSpan={8}
                >
                  No Lab Tests Found!
                </th>
              </tr>
            ) : (
              paginateCustomers().map((val) => {
                const isGiven = givenLabTestIds.find(
                  (test) => test.id === val.id
                );
                return (
                  <tr
                    className={`${isGiven ? "bg-gray-400" : ""} w-full`}
                    key={val.id}
                  >
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <input
                        value={val.id}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        className="size-4"
                      />
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.name} />
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent
                        things={
                          val.gender?.[0]?.toUpperCase() + val.gender?.slice(1)
                        }
                      />
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.comments} />
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
      <div className="flex items-center justify-between">
        <div className="font-[550] text-lg flex items-center invisible">
          Already Given Lab Tests -{" "}
          <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
        </div>
        <SaveTreatmentButtons function={handleSave} />{" "}
        <div className="font-[550] text-lg flex items-center">
          Already Given Lab Tests -{" "}
          <div className="ml-2 bg-gray-400 border border-gray-200 size-5"></div>
        </div>
      </div>
    </div>
  );
}
export default TreatmentLabTests;
