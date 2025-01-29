import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddListFranchise from "../../../components/Admin/AddListFranchise";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InsideLoader from "../../InsideLoader";
import { useOutletContext } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { Option, Select } from "@mui/joy";

function ListFranchise() {
  const context = useOutletContext();
  const [getFranchise, setGetFranchise] = useState([]);
  const [getDoctors, setGetDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [getFranchiseUsers, setGetFranchiseUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const navigate = useNavigate();

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  const handleGetFranchise = () => {
    axios
      .get("/api/v1/users/franchise_index")
      .then((res) => {
        let filteredData = res.data?.users || [];
        if (role === "super_admin" && getDoctorId) {
          filteredData =
            getDoctorId === "all"
              ? filteredData
              : filteredData.filter(
                  (user) => user.created_by_id == getDoctorId
                );
        } else if (role === "doctor") {
          filteredData = filteredData.filter(
            (user) => user.created_by_id == main_id
          );
        }
        setLoading(false);
        setGetFranchise(filteredData);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handleGetFranchise();
    handleGetDoctors();
  }, [getDoctorId]);

  const handleViewDetails = (id) => {
    localStorage.setItem("viewDetails", id);
    navigate(`/admin/view-franchise-users`);
  };

  const columns = [
    {
      accessorKey: "first_name",
      header: "Franchise Name",
      Cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "show_password", header: "Password" },
    { accessorKey: "phone_number", header: "Phone No." },
    {
      accessorKey: "personal_detail.city",
      header: "City",
      Cell: ({ row }) => row.original.personal_detail?.city || "",
      size: 100,
    },
    {
      accessorKey: "initial_amount",
      header: "Recharged Amount",
      Cell: ({ row }) =>
        row.original.initial_amount <= 0 ? "0" : row.original.initial_amount,
    },
    {
      accessorKey: "amount",
      header: "Balance",
      Cell: ({ row }) => (row.original.amount <= 0 ? "0" : row.original.amount),
    },
    {
      accessorKey: "commission",
      header: "%",
      Cell: ({ row }) => `${row.original.commission}%`,
      size: 100,
    },
    {
      accessorKey: "recharge",
      header: "Recharge",
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          color="success"
          onClick={() =>
            handleAddAmount(row.original.id, row.original.possibility_group)
          }
        >
          Recharge
        </Button>
      ),
    },
    {
      accessorKey: "patient_list",
      header: "Patient Lists",
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleViewDetails(row.original.id)}
        >
          Patient Lists
        </Button>
      ),
    },
    {
      accessorKey: "delete",
      header: "Delete",
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleFranchiseDelete(row.original.id)}
        >
          <MdDelete size={20} />
        </Button>
      ),
    },
  ];
  // const navigate = useNavigate();

  // const [getFranchise, setGetFranchise] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const [getDoctors, setGetDoctors] = useState([]);

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
                initial_amount: d.amount,
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

  // const handleGetFranchise = () => {
  //   axios
  //     .get("/api/v1/users/franchise_index")
  //     .then((res) => {
  //       if (role === "super_admin") {
  //         if (getDoctorId) {
  //           if (getDoctorId === "all") {
  //             console.log(res.data?.users);
  //             setLoading(false);
  //             setGetFranchise(res.data?.users);
  //           } else {
  //             console.log(
  //               "Particular Doctor: ",
  //               res.data?.users.filter(
  //                 (user) => user.created_by_id == getDoctorId
  //               )
  //             );
  //             setLoading(false);
  //             setGetFranchise(
  //               res.data?.users.filter(
  //                 (user) => user.created_by_id == getDoctorId
  //               )
  //             );
  //           }
  //         }
  //       } else if (role === "doctor") {
  //         console.log(
  //           "Doctor: ",
  //           res.data?.users.filter((user) => user.created_by_id == main_id)
  //         );
  //         setLoading(false);
  //         setGetFranchise(
  //           res.data?.users.filter((user) => user.created_by_id == main_id)
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //       alert(err.message);
  //     });
  // };

  // const handleViewDetails = (val) => {
  //   localStorage.setItem("viewDetails", val);
  //   navigate(`/admin/view-franchise-users`);
  // };

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

  // const handleGetDoctors = () => {
  //   axios
  //     .get(`/api/v1/users`)
  //     .then((res) => {
  //       console.log(
  //         "Doctors: ",
  //         res.data?.users?.filter((user) => user.role === "doctor")
  //       );
  //       setGetDoctors(
  //         res.data?.users?.filter((user) => user.role === "doctor")
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err.message);
  //     });
  // };

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

        <div className="rounded-lg bg-card h-[95vh] w-full bg-white">
          <div className="flex px-3 py-3 h-full flex-col space-y-4">
            <div className="flex  items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <div className="flex flex-col sm:flex-row items-center justify-end gap-2 mr-6">
                <div className="w-4 h-4 bg-red-300 border border-gray-800"></div>
                <div>- Possibility Group</div>
              </div> */}

              <div className="flex  ">
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
              <div className="w-full sm:w-fit">
                {role === "super_admin" && (
                  <Select
                    required
                    defaultValue={"all"}
                    placeholder="Select"
                    value={getDoctorId}
                    onChange={(e, newValue) => setGetDoctorId(newValue)}
                    className="w-full sm:w-auto"
                  >
                    <Option key={"all"} value="all">
                      All
                    </Option>
                    {getDoctors?.map((res) => (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>

            {/* <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[85%]">
              <table className="w-full  z-0">
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
                    <ThComponent name="Recharged Amount" />
                    <ThComponent name="Balance" />
                    <ThComponent name="%" />
                    <th
                      className={` uppercase tracking-wide text-sm font-medium  w-25 text-left`}
                      colSpan={2}
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
                              things={
                                val.initial_amount <= 0
                                  ? "0"
                                  : val.initial_amount
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
                          <td className="py-2 px-2 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() =>
                                    handleAddAmount(
                                      val.id,
                                      val.possibility_group
                                    )
                                  }
                                  className="font-semibold text-green-600 border text-sm border-gray-300 py-2 px-3 rounded-md hover:bg-[#33a92b] hover:text-white"
                                >
                                  Recharge
                                </button>
                              }
                            />
                          </td>
                          <td className="py-3 px-2 border-b border-b-gray-50">
                            <button
                              onClick={() => handleViewDetails(val.id)}
                              className="font-semibold text-green-600 border text-sm border-gray-300 py-2 px-3 rounded-md hover:bg-[#33a92b] hover:text-white"
                            >
                              Patient Lists
                            </button>
                          </td>
                          <td className="py-3  border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => handleFranchiseDelete(val.id)}
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
            </div> */}
            <MaterialReactTable
              columns={columns}
              data={getFranchise}
              state={{ isLoading: loading }}
              enableColumnResizing
              enableSorting
              initialState={{
                showColumnFilters: true,
                showGlobalFilter: true,
                density: "compact",
              }}
              muiTableBodyCellProps={{
                sx: { padding: "16px" },
              }}
              enablePagination={false}
              enableDensityToggle={false}
              renderTopToolbarCustomActions={() => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <CiViewList size={25} />
                  <label className="text-lg font-bold tracking-wide">
                    Franchise List
                  </label>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFranchise;
