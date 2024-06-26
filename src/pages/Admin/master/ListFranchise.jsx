import ThComponent from "../../../components/ThComponent";
import TdComponent from "../../../components/TdComponent";
import AddListFranchise from "../../../components/Admin/AddListFranchise";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function ListFranchise() {
  const [getFranchise, setGetFranchise] = useState([]);

  const handleAddFranchise = async (d) => {
    console.log(d);
    await axios
      .get("/api/v1/users/app_creds")
      .then((res) => {
        axios.post("/api/v1/users", {
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
            possibility_group: d.possibility_group,
            role: d.type_of_admin,
          },
          personal_detail: {
            city: d.city,
          },
          client_id: res.data?.client_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetFranchise = () => {
    axios
      .get("/api/v1/users")
      .then((res) => {
        // console.log(res?.data?.users);
        const filterUser = res?.data?.users.filter((user) => {
          return user.commission != null;
        });
        console.log(filterUser);
        setGetFranchise(filterUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetFranchise();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center">
            <div className="font-semibold text-xl">Franchise List</div>
            <div className="flex-grow" />
            <AddListFranchise
              handleApi={handleAddFranchise}
              name="Add Franchise"
              title="Add New Franchise"
              first_name="First Name"
              last_name="Last Name"
              email="Email"
              mobile="Mobile"
              city="City"
              state="State"
              pincode="Pincode"
              language="Language"
              password="Password"
              amount="Amount"
              commission="Commission"
              type_of_admin="Admin Type"
              possibility_group="Possibility Group"
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
                  <ThComponent name="Franchise Name" />
                  <ThComponent name="Email" />
                  <ThComponent name="Password" />
                  <ThComponent name="Mobile No." />
                  <ThComponent name="City" />
                  <ThComponent name="Possibility Group" />
                  <ThComponent name="Amount" />
                  <ThComponent />
                  <ThComponent />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
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
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={val.first_name + " " + val.last_name}
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.email} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.password} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.phone_number} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.personal_detail?.city} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={val.possibility_group ? "Yes" : "No"}
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={val.amount}
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => console.log("view details")}
                                className="font-semibold text-green-600 border border-gray-300 p-1 rounded-md hover:bg-[#33a92b] hover:text-white"
                              >
                                View Details
                              </button>
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => console.log("edit")}
                                className="font-semibold text-blue-800 border border-gray-300 p-1 rounded-md hover:bg-[#558ccb] hover:text-white"
                              >
                                <MdEdit size={20} />
                              </button>
                            }
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent
                            things={
                              <button
                                onClick={() => console.log("delete")}
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

export default ListFranchise;
