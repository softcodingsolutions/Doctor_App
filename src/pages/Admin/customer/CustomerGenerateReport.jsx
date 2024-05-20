import { useState } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { Link, Outlet, useLocation } from "react-router-dom";
import { reportButtons } from "../../../constants/admin/AdminConstants";

function CustomerGenerateReport() {
  const [selectedId, setSelectedId] = useState("1");
  const { state } = useLocation();
  const { id } = state;

  return (
    <>
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between overflow-x-hidden">
          <div className="flex flex-wrap justify-center transition-transform gap-3 p-1 w-full">
            {reportButtons.map((res) => {
              return (
                <Link
                  to={res.to}
                  onClick={() => setSelectedId(res.id)}
                  key={res.id}
                  className={clsx(
                    "min-w-fit flex items-center justify-center col-span-2 border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
                    selectedId === res.id
                      ? "bg-[#1F2937] text-white"
                      : "bg-white"
                  )}
                >
                  {res.icons}
                  <span className="ml-1.5">{res.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {id && <Outlet context={[id]} />}
    </>
  );
}

export default CustomerGenerateReport;
