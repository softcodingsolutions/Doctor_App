import { MdDelete } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewPackage from "../../../components/Admin/AddNewPackage";
import EditPackage from "../../../components/Admin/EditPackage";

function Packages() {
  const [getPackages, setGetPackages] = useState([]);
  const [editPackage, setEditPackage] = useState([]);

  const handleGetPackages = () => {
    axios
      .get("/api/v1/user_packages")
      .then((res) => {
        console.log(res.data);
        setGetPackages(res.data?.user_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleAddPackage = (package_name, package_days, price) => {
    const formData = new FormData();
    formData.append("user_package[package_name]", package_name);
    formData.append("user_package[no_of_days]", package_days);
    formData.append("user_package[package_price]", price);
    axios
      .post("api/v1/user_packages", formData)
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
        alert(err.message);
      });
  };

  const handleEditPackage = (val) => {
    setEditPackage(getPackages.filter((item) => item?.id === val));
  };

  const handleEditPackageApi = (package_name, package_days, price, id) => {
    const formData = new FormData();
    formData.append("user_package[package_name]", package_name);
    formData.append("user_package[no_of_days]", package_days);
    formData.append("user_package[package_price]", price);
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
        alert(err.message);
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
            alert(err.message);
            console.log(err);
            alert(err.message);
          });
      }
    });
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Packages List</div>
            <AddNewPackage
              handleApi={handleAddPackage}
              name="Add New Package"
              title="Add Package"
              package_name="Name"
              package_days="Days"
              price="Price"
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
                          <TdComponent things={val.package_name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.no_of_days} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.package_price} />
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
