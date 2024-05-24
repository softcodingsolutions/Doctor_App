import { useOutletContext } from "react-router-dom";
import TdComponent from "../../../../../components/TdComponent";
import ThComponent from "../../../../../components/ThComponent";
import { useEffect, useState } from "react";

function RTreatmentMedicine() {
  const context = useOutletContext();
  const [getMedicines, setGetMedicines] = useState([]);

  const handleGetMedicines = () => {
    if (context[0]) {
      const data = context[1].filter((pack) => {
        return context[0][0] === pack.package.weight_reason;
      });
      setGetMedicines(data[0]?.package?.medicines);
    }
  };

  useEffect(() => {
    handleGetMedicines();
  }, [context]);

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[67vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Medicines List</div>
          </div>

          <div className="animate-fade-left animate-delay-75 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[95%]">
            <table className="w-full min-w-[460px] z-0">
              <thead className="uppercase ">
                <tr className="bg-[#1F2937] text-white rounded-md">
                  <ThComponent
                    moreClasses={"rounded-tl-md rounded-bl-md"}
                    name="No."
                  />
                  <ThComponent name="Name" />
                  <ThComponent name="Content" />
                  <ThComponent
                    name="Quantity"
                    moreClasses={"rounded-tr-md rounded-br-md"}
                  />
                </tr>
              </thead>
              <tbody>
                {getMedicines.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium pt-[13rem] text-lg"
                      colSpan={8}
                    >
                      No Medicines Found!
                    </th>
                  </tr>
                ) : (
                  getMedicines.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_name} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_content} />
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <TdComponent things={val.medicine_quantity} />
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

export default RTreatmentMedicine;
