import { useEffect, useState } from "react";
import TdComponent from "../../../../components/TdComponent";
import ThComponent from "../../../../components/ThComponent";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function ReportPackage() {
  const [getPackages, setGetPackages] = useState([]);
  const context = useOutletContext();
  console.log("User",context[1]);
  const handleGetPackages = () => {
    axios
      .get("/api/v1/user_packages")
      .then((res) => {
        console.log("Packages to be given to users",res.data?.user_packages);
        setGetPackages(res.data?.user_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGiveUserPackage = (val) => {
    console.log(val);
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
                          <button
                            onClick={() => handleGiveUserPackage(val.id)}
                            className="border border-gray-300 hover:text-white hover:bg-green-500 p-1 rounded-md"
                          >
                            Select
                          </button>
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

export default ReportPackage;
