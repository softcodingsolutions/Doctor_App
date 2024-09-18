import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddListFranchise from "../../../components/Admin/AddListFranchise";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ViewFranchiseDetails from "../../../components/Admin/ViewFranchiseDetails";
import InsideLoader from "../../InsideLoader";
import { useOutletContext } from "react-router-dom";
import { Option, Select } from "@mui/joy";

function ListFranchise() {
  const context = useOutletContext();
  const [getFranchise, setGetFranchise] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [getFranchiseUsers, setGetFranchiseUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const paginateCustomers = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return getFranchise.slice(indexOfFirstRow, indexOfLastRow);
  };

  const totalPages = Math.ceil(getFranchise.length / rowsPerPage);

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

  const handleAddFranchise = async (d) => {
    setLoading(true);
    console.log(d);
    if (role === "doctor") {
      await axios
        .get("/api/v1/users/app_creds")
        .then((res) => {
          axios
            .post("/api/v1/users", {
              user: {
                first_name: d.first_name,
                last_name: d.last_name,
                email: d.email,
                phone_number: d.mobile,
                address: d.address,
                password: d.password,
                pincode: d.pincode,
                state: d.state,
                amount: d.amount,
                commission: d.commission,
                possibility_group: d.possibility_group === "yes" ? true : false,
                role: d.type_of_admin,
                created_by_id: main_id,
                creator: "doctor",
                show_password: d.password,
              },
              personal_detail: {
                city: d.city,
              },
              client_id: res.data?.client_id,
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              handleGetFranchise();
              Swal.fire({
                title: "Added!",
                text: "New franchise has been added.",
                icon: "success",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert(err.message);
        });
    } else {
      await axios
        .get("/api/v1/users/app_creds")
        .then((res) => {
          axios
            .post("/api/v1/users", {
              user: {
                first_name: d.first_name,
                last_name: d.last_name,
                email: d.email,
                phone_number: d.mobile,
                address: d.address,
                password: d.password,
                pincode: d.pincode,
                state: d.state,
                amount: d.amount,
                commission: d.commission,
                possibility_group: d.possibility_group === "yes" ? true : false,
                role: d.type_of_admin,
                created_by_id: d.doctor_id,
                creator: "doctor",
                show_password: d.password,
              },
              personal_detail: {
                city: d.city,
              },
              client_id: res.data?.client_id,
            })
            .then((res) => {
              console.log(res);
              handleGetFranchise();
              Swal.fire({
                title: "Added!",
                text: "New franchise has been added.",
                icon: "success",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  const handleGetFranchise = () => {
    axios
      .get("/api/v1/users/franchise_index")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data?.users);
              setLoading(false);
              setGetFranchise(res.data?.users);
            } else {
              console.log(
                "Particular Doctor: ",
                res.data?.users.filter(
                  (user) => user.created_by_id == getDoctorId
                )
              );
              setLoading(false);
              setGetFranchise(
                res.data?.users.filter(
                  (user) => user.created_by_id == getDoctorId
                )
              );
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Doctor: ",
            res.data?.users.filter((user) => user.created_by_id == main_id)
          );
          setLoading(false);
          setGetFranchise(
            res.data?.users.filter((user) => user.created_by_id == main_id)
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetFranchiseUsers = (val) => {
    axios
      .get(`/api/v1/users/find_doc_franchise_users?id=${val}`)
      .then((res) => {
        console.log("Franchise Users", res?.data?.users);
        setGetFranchiseUsers(res?.data?.users);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleAddAmount = async (val) => {
    const { value: formValues } = await Swal.fire({
      title: "Amount",
      html: `
      <div class="flex flex-col items-center justify-center text-black">
        <div>
          Add Amount: <input id="swal-input1" type="number" min={0} class="swal2-input">
        </div>
      </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value >= 0
            ? document.getElementById("swal-input1").value
            : -document.getElementById("swal-input1").value,
        ];
      },
    });

    axios
      .put(
        `/api/v1/users/add_amount_to_franchise?id=${val}&amount=${formValues[0]}`
      )
      .then((res) => {
        console.log(res);
        handleGetFranchise();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleFranchiseDelete = (val) => {
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
          .delete(`/api/v1/users/${val}`)
          .then((res) => {
            console.log(res);
            handleGetFranchise();
            Swal.fire({
              title: "Deleted!",
              text: "Your franchise has been deleted.",
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

  useEffect(() => {
    handleGetFranchise();
    handleGetDoctors();
  }, [getDoctorId]);

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-1">
          <button
            onClick={context[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-[91vh] bg-white">
            <div className="flex px-4 py-3 h-full flex-col space-y-4">
              <div className="flex items-center">
                <div className="font-semibold text-xl">Franchise List</div>
                <div className="flex-grow" />
                <div className="flex items-center justify-end gap-2 mr-6">
                  <div className="w-4 h-4 bg-red-300 border border-gray-800">
                    {" "}
                  </div>
                  <div>- Possibility Group</div>
                </div>
                <div className="w-fit">
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
                <div className="flex gap-3 px-3">
                  <AddListFranchise
                    handleApi={handleAddFranchise}
                    name="Add Franchise"
                    role={role}
                    title="Add New Franchise"
                    first_name="First Name"
                    last_name="Last Name"
                    email="Email"
                    mobile="Mobile"
                    city="City"
                    state="State"
                    doctors={getDoctors}
                    pincode="Pincode"
                    language="Language"
                    password="Password"
                    amount="Amount"
                    commission="Commission"
                    type_of_admin="Admin Type"
                    possibility_group="Possibility Group"
                  />
                </div>
              </div>

              <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[75%]">
                <table className="w-full min-w-[500px]  z-0">
                  <thead className="uppercase ">
                    <tr className="bg-[#1F2937] text-white rounded-md">
                      <ThComponent
                        name="Franchise Name"
                        moreClasses={"rounded-tl-md rounded-bl-md"}
                      />
                      <ThComponent name="Email" />
                      <ThComponent name="Password" />
                      <ThComponent name="Mobile No." />
                      <ThComponent name="City" />
                      <ThComponent name="Amount" />
                      <ThComponent name="%" />
                      <th
                        className={` uppercase tracking-wide text-sm font-medium py-3 px-2 text-left`}
                      />
                      <th
                        className={` uppercase tracking-wide text-sm font-medium py-3 px-2 text-left`}
                      />
                      <th
                        className={` uppercase rounded-tr-md rounded-br-md tracking-wide text-sm font-medium py-3 px-2 text-left`}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {paginateCustomers().length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                          colSpan={10}
                        >
                          No Franchise Found!
                        </th>
                      </tr>
                    ) : (
                      paginateCustomers().map((val, index) => {
                        return (
                          <tr
                            className={`${
                              val.possibility_group
                                ? "border-l-4 border-red-300  hover:bg-gray-200"
                                : "hover:bg-gray-200"
                            }`}
                            key={val.id}
                          >
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  val.first_name[0]?.toUpperCase() +
                                  val.first_name?.slice(1) +
                                  " " +
                                  val.last_name[0]?.toUpperCase() +
                                  val.last_name?.slice(1)
                                }
                              />
                            </td>
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent things={val.email} />
                            </td>
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent things={val.show_password} />
                            </td>
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent things={val.phone_number} />
                            </td>
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  val.personal_detail?.city[0]?.toUpperCase() +
                                  val.personal_detail?.city?.slice(1)
                                }
                              />
                            </td>

                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent
                                things={val.amount <= 0 ? "0" : val.amount}
                              />
                            </td>
                            <td className="py-1 px-2 border-b border-b-gray-50">
                              <TdComponent things={val.commission + "%"} />
                            </td>
                            <td className="py-3 px-2 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  <button
                                    onClick={() => handleAddAmount(val.id)}
                                    className="font-semibold text-green-600 border text-sm border-gray-300 py-2 px-3 rounded-md hover:bg-[#33a92b] hover:text-white"
                                  >
                                    Add Amount
                                  </button>
                                }
                              />
                            </td>
                            <td className="py-3 px-2 border-b border-b-gray-50">
                              <ViewFranchiseDetails
                                function={() => {
                                  handleGetFranchiseUsers(val.id);
                                }}
                                franchiseId={val.id}
                                users={getFranchiseUsers}
                              />
                            </td>
                            <td className="py-3 pl-2 pr-4 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  <button
                                    onClick={() =>
                                      handleFranchiseDelete(val.id)
                                    }
                                    className="font-semibold text-red-600 border border-gray-300 p-2 rounded-md hover:bg-[#c43e19] hover:text-white"
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
      </div>
    </div>
  );
}

export default ListFranchise;
