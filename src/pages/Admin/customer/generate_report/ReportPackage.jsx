import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import InsideLoader from "../../../InsideLoader";

function ReportPackage() {
  const [getPackages, setGetPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useOutletContext();
  const role = localStorage.getItem("role");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getPackages.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getPackages.length / rowsPerPage);

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

  console.log("User", context[1]);

  const handleGetPackages = () => {
    axios
      .get(
        `/api/v1/payment_packages?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log("Packages to be given to users", res.data);
        setGetPackages(res.data?.payment_packages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGiveUserPackage = async (val) => {
    console.log(val);
    const duration = Number(val.duration);

    const today = new Date();

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + duration);

    const startDateString = today.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    console.log("Starting Date:", startDateString);
    console.log("Ending Date:", endDateString);
    try {
      const formData = new FormData();
      formData.append("user_package[user_id]", context[1].id);
      formData.append("user_package[package_price]", val.price);
      formData.append("user_package[no_of_days]", duration);
      formData.append("user_package[package_name]", val.name);
      formData.append("user_package[starting_date]", startDateString);
      formData.append("user_package[ending_date]", endDateString);
      await axios
        .post("/api/v1/user_packages", formData)
        .then((res) => {
          console.log(res);
          if (res.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Package Assigned!",
              text: `${
                context[1]?.first_name + " " + context[1]?.last_name
              } has been assigned the package from ${startDateString} to ${endDateString}.`,
              showConfirmButton: true,
            });
            handleGetPackages();
            context[2]();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message + "!");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivatePackage = async (val) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(val, "deactivate");
        const formdata = new FormData();
        // 1 = Deactivate Value
        formdata.append("package_status", 1);
        axios
          .put(`/api/v1/user_packages/change_status?id=${val}`, formdata)
          .then((res) => {
            console.log(res);
            Swal.fire(
              "Deactivated!",
              "The package has been deactivated.",
              "success"
            );
            window.location.reload(); 
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Failed to deactivate the package.", "error");
          });
      }
    });
  };
  

  useEffect(() => {
    handleGetPackages();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="w-full p-2">
      <div className="animate-fade-left animate-delay-75   rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[90%]">
        <table className="w-full min-w-[460px] z-0">
          <thead className="uppercase ">
            <tr className="bg-[#1F2937] text-white rounded-md">
              <ThComponent
                moreClasses={"rounded-tl-md rounded-bl-md"}
                name="No."
              />
              <ThComponent name="Package Name" />
              <ThComponent name="Number of days" />
              <ThComponent name="Price" />
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
                  No Packages Found!
                </th>
              </tr>
            ) : (
              paginateCustomers().map((val, index) => {
                const isUserPackage =
                  context[1]?.user_packages?.package_name == val.name;
                const packageId = context[1]?.user_packages?.id;
                return (
                  <tr
                    className={`${isUserPackage ? "bg-gray-400" : ""} w-full`}
                    key={val.id}
                  >
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">{index + 1}</div>
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.name} />
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.duration} />
                    </td>
                    <td className="py-3 px-4 border-b border-b-gray-50">
                      <TdComponent things={val.price} />
                    </td>
                    {!isUserPackage ? (
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <button
                          onClick={() => handleGiveUserPackage(val)}
                          className="border border-gray-300 hover:text-white hover:bg-green-500 p-1 rounded-md"
                        >
                          Select
                        </button>
                      </td>
                    ) : (
                      <td className="py-3 px-4 border-b border-b-gray-50">
                        <button
                          onClick={() => handleDeactivatePackage(packageId)} // Fix: Use arrow function
                          className="border border-gray-700 hover:bg-red-700 p-1 rounded-md"
                        >
                          Deactivate
                        </button>
                      </td>
                    )}
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
  );
}

export default ReportPackage;
