import { MdDelete, MdEdit } from "react-icons/md";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { useEffect, useState } from "react";
import AddDosDonts from "../../../components/Admin/AddDosDonts";

function DosDonts() {
  const [getDos, setGetDos] = useState([]);
  const [getDonts, setGetDonts] = useState([]);
  const [showDos, setShowDos] = useState(true);
  const [showDonts, setShowDonts] = useState(false);

  const handleGetDos = () => {};

  const handleAddDosDonts = () => {};

  const editDosDonts = (val) => {};

  const deleteDosDonts = (val) => {};

  useEffect(() => {
    handleGetDos();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[85vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-8">
          <div>
            <div className="flex items-center">
              <div className="font-semibold text-xl">Questions List</div>
              <div className="flex-grow" />
              <div className="space-x-1">
                <button
                  onClick={() => {
                    setShowDonts(false);
                    setShowDos(true);
                  }}
                  className={`px-3 py-1.5 border-[1.5px] rounded-md ${
                    showDos ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                  } hover:scale-105 border-x-gray-300`}
                >
                  Dos
                </button>
                <button
                  onClick={() => {
                    setShowDos(false);
                    setShowDonts(true);
                  }}
                  className={`px-3 py-1.5 rounded-md ${
                    showDonts
                      ? "scale-105 bg-gray-700 text-white"
                      : "bg-gray-50"
                  } hover:scale-105  border-x-gray-300 border-[1.5px]`}
                >
                  Don'ts
                </button>
              </div>
              <div className="flex-grow" />
              <AddDosDonts
                handleApi={handleAddDosDonts}
                name="Add Do/Don't"
                title="Add New Do/Don't"
                do_dont="Do/Don't"
                details="Details"
              />
            </div>
          </div>

          <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="In English" />
                  <ThComponent name="In Hindi" />
                  <ThComponent name="In Gujarati" />
                  <ThComponent name="For" />
                  <ThComponent />
                  <ThComponent />
                  <ThComponent moreClasses={"rounded-tr-md rounded-br-md"} />
                </tr>
              </thead>
              <tbody>
                {showDos ? (
                  getDos.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Dos Found!
                      </th>
                    </tr>
                  ) : (
                    getDos.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={`${val.gender[0].toUpperCase()}${val.gender.slice(
                                1
                              )}`}
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => editDosDonts(val.id)}
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
                                  onClick={() => deleteDosDonts(val.id)}
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
                  )
                ) : null}
                {showDonts ? (
                  getDonts.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                        colSpan={8}
                      >
                        No Don'ts Found!
                      </th>
                    </tr>
                  ) : (
                    getDonts.map((val, index) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-2 px-4 border-b border-b-gray-50">
                            <div className="flex items-center">{index + 1}</div>
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent things={val.question} />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={`${val.gender[0].toUpperCase()}${val.gender.slice(
                                1
                              )}`}
                            />
                          </td>
                          <td className="py-3 px-4 border-b border-b-gray-50">
                            <TdComponent
                              things={
                                <button
                                  onClick={() => editDosDonts(val.id, val.part)}
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
                                  onClick={() => deleteDosDonts(val.id)}
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
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DosDonts;
