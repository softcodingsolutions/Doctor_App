import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewPackage from "../../../components/Admin/AddNewPackage";
import EditPackage from "../../../components/Admin/EditPackage";
import { Option, Select } from "@mui/joy";
import InsideLoader from "../../InsideLoader";

function Packages() {
  const [getPackages, setGetPackages] = useState([]);
  const [editPackage, setEditPackage] = useState([]);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleGetPackages = () => {
    axios
      .get("/api/v1/payment_packages")
      .then((res) => {
        if (role === "super_admin") {
          if (getDoctorId) {
            if (getDoctorId === "all") {
              console.log(res.data);
              setGetPackages(res.data?.payment_packages);
              setLoading(false);
            } else {
              console.log(
                "Particular Doctor Package: ",
                res.data?.payment_packages?.filter(
                  (pac) => pac.user_id == getDoctorId
                )
              );
              setGetPackages(
                res.data?.payment_packages?.filter(
                  (pac) => pac.user_id == getDoctorId
                )
              );
              setLoading(false);
            }
          }
        } else if (role === "doctor") {
          console.log(
            "Particular Doctor Package: ",
            res.data?.payment_packages?.filter((pac) => pac.user_id == main_id)
          );
          setGetPackages(
            res.data?.payment_packages?.filter((pac) => pac.user_id == main_id)
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

  const handleAddPackage = (package_name, package_days, price) => {
    const formData = new FormData();
    formData.append("payment_package[name]", package_name);
    formData.append("payment_package[duration]", package_days);
    formData.append(
      "payment_package[user_id]",
      localStorage.getItem("main_id")
    );
    formData.append("payment_package[price]", price);
    axios
      .post("api/v1/payment_packages", formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added!",
            text: "Your package has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetPackages();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleEditPackage = (val) => {
    setEditPackage(getPackages.filter((item) => item?.id === val));
  };

  const handleEditPackageApi = (package_name, package_days, price, id) => {
    const formData = new FormData();
    formData.append("payment_package[name]", package_name);
    formData.append("payment_package[duration]", package_days);
    formData.append(
      "payment_package[user_id]",
      localStorage.getItem("main_id")
    );
    formData.append("payment_package[price]", price);
    axios
      .put(`api/v1/user_packages/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            text: "Your package has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        handleGetPackages();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const deletePackage = (val) => {
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
          .delete(`/api/v1/user_packages/${val}`)
          .then((res) => {
            console.log(res);
            handleGetPackages();
            Swal.fire({
              title: "Deleted!",
              text: "Your package has been deleted.",
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
    handleGetPackages();
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
            <div className="font-semibold text-xl">Packages List</div>
            <div className="flex gap-3">
              <AddNewPackage
                handleApi={handleAddPackage}
                name="Add New Package"
                title="Add Package"
                package_name="Name"
                package_days="Days"
                price="Price"
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
                  <ThComponent name="Package Name" />
                  <ThComponent name="Number of days" />
                  <ThComponent name="Price" />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {getPackages.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Packages Found!
                    </th>
                  </tr>
                ) : (
                  getPackages.map((val, index) => {
                    return (
                      <tr key={val.id}>
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
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <EditPackage
                            see={editPackage}
                            function={() => {
                              handleEditPackage(val.id);
                            }}
                            handleApi={handleEditPackageApi}
                            title="Edit Package"
                            package_name="Name"
                            package_days="Days"
                            price="Price"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => deletePackage(val.id)}
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

export default Packages;
