import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddListFranchise from "../../../components/Admin/AddListFranchise";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Option, Select } from "@mui/joy";
import ViewFranchiseDetails from "../../../components/Admin/ViewFranchiseDetails";
import InsideLoader from "../../InsideLoader";
import { useOutletContext } from "react-router-dom";

function ListFranchise() {
  const context = useOutletContext();
  const [getFranchise, setGetFranchise] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [getFranchiseUsers, setGetFranchiseUsers] = useState([]);

  const handleAddFranchise = async (d) => {
    console.log(d);
    setLoading(true);
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
          alert(err.response?.data?.message + "!");
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
          alert(err.response?.data?.message + "!");
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
              setGetFranchise(res.data?.users);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor: ",
                res.data?.users.filter(
                  (user) => user.created_by_id == getDoctorId
                )
              );
              setGetFranchise(
                res.data?.users.filter(
                  (user) => user.created_by_id == getDoctorId
                )
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Doctor: ",
            res.data?.users.filter((user) => user.created_by_id == main_id)
          );
          setGetFranchise(
            res.data?.users.filter((user) => user.created_by_id == main_id)
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
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
        alert(err.response?.data?.message + "!");
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
                <div className="flex gap-3">
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
                      <ThComponent name="Franchise Name" />
                      <ThComponent name="Email" />
                      <ThComponent name="Password" />
                      <ThComponent name="Mobile No." />
                      <ThComponent name="City" />
                      <ThComponent name="Possibility Group" />
                      <ThComponent name="Amount" />
                      <ThComponent name="Commission (in %)" />
                      <ThComponent />
                      <ThComponent />
                      <ThComponent />
                      <ThComponent
                        moreClasses={"rounded-tr-md rounded-br-md"}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {getFranchise.length === 0 ? (
                      <tr>
                        <th
                          className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                          colSpan={10}
                        >
                          No Franchise Found!
                        </th>
                      </tr>
                    ) : (
                      getFranchise.map((val, index) => {
                        return (
                          <tr key={val.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
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
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.email} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.show_password} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.phone_number} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  val.personal_detail?.city[0]?.toUpperCase() +
                                  val.personal_detail?.city?.slice(1)
                                }
                              />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={val.possibility_group ? "Yes" : "No"}
                              />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={val.amount <= 0 ? "0" : val.amount}
                              />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent things={val.commission} />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  <button
                                    onClick={() => handleAddAmount(val.id)}
                                    className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-[#33a92b] hover:text-white"
                                  >
                                    Add Amount
                                  </button>
                                }
                              />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <ViewFranchiseDetails
                                function={() => {
                                  handleGetFranchiseUsers(val.id);
                                }}
                                franchiseId={val.id}
                                users={getFranchiseUsers}
                              />
                            </td>
                            <td className="py-3 px-4 border-b border-b-gray-50">
                              <TdComponent
                                things={
                                  <button
                                    onClick={() =>
                                      handleFranchiseDelete(val.id)
                                    }
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
      </div>
    </div>
  );
}

export default ListFranchise;
