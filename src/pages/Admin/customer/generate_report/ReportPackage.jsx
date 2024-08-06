import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

function ReportPackage() {
  const [getPackages, setGetPackages] = useState([]);
  const context = useOutletContext();
  console.log("User", context[1]);

  const handleGetPackages = () => {
    axios
      .get(
        `/api/v1/payment_packages?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log("Packages to be given to users", res.data);
        setGetPackages(res.data?.payment_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
          alert(err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
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
                    const isUserPackage =
                      context[1]?.user_packages?.[0]?.package_name == val.name;
                    return (
                      <tr
                        className={`${
                          isUserPackage ? "bg-gray-400" : ""
                        } w-full`}
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
                          <td className="py-3 px-4 border-b border-b-gray-50"></td>
                        )}
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

export default ReportPackage;
