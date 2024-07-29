import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
function AdminListFollowUp() {
  const context = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full p-2 ">
          <div className="rounded-lg bg-card h-[95vh] bg-white">
            <div className="flex p-4 h-full flex-col space-y-4">
              <div className="flex gap-5 p-2 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  placeholder="Search User through First Name/Phone Number/Email/Case Number"
                  className="py-1 px-2 rounded-md border border-black w-full"
                />
              </div>
              <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[99%]">
                <table className="w-full min-w-[460px] z-0">
                  <thead className="uppercase ">
                    {/* <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="Case No."
                  />
                  <ThComponent name="Name" />
                  <ThComponent name="Email" />
                  <ThComponent name="Mobile" />
                  <ThComponent name="City" />
                  <ThComponent
                    moreClasses={"rounded-tr-md rounded-br-md"}
                    name="Registration Through"
                  />
                </tr> */}
                  </thead>
                  <tbody>
                    {/* {getParticularCustomer.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[16rem] text-xl"
                      colSpan={8}
                    >
                      No Customers Found!
                    </th>
                  </tr>
                ) : (
                  getParticularCustomer.map((val) => {
                    return (
                      val.role === "patient" && (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center text-lg">
                              {val.case_number}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50 break-all">
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
                            <TdComponent things={val.phone_number} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.personal_detail?.city} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            {val.creator === "super_admin" && (
                              <TdComponent things={"Admin"} />
                            )}
                            {val.creator === "doctor" && (
                              <TdComponent things={"Doctor"} />
                            )}
                            {val.creator === "franchise" && (
                              <TdComponent things={"Franchise"} />
                            )}
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                val.personal_detail?.package?.payment_method
                                  ?.charAt(0)
                                  .toUpperCase() +
                                  val.personal_detail?.package?.payment_method?.slice(
                                    1
                                  ) ?? "null"
                              }
                            />
                          </td>
                        </tr>
                      )
                    );
                  })
                )} */}
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

export default AdminListFollowUp;
