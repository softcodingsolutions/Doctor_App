import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useState, useRef } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { masterButtons } from "../../constants/admin/AdminConstants";

function AdminMaster() {
  const location = useLocation();
  const pathName = location.pathname?.slice(14);
  const context = useOutletContext();

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className=" flex justify-between w-full overflow-x-auto">
            <div className="grid grid-cols-4 gap-1 p-1 lg:grid-cols-10  w-full ">
              {masterButtons.map((res) => (
                <Link
                  to={res.to}
                  key={res.id}
                  className={clsx(
                    "flex items-center justify-center col-span-2 shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-1 rounded-md",
                    pathName === res.to ? "bg-[#1F2937] text-white" : "bg-white"
                  )}
                >
                  {res.icons}
                  <span className="ml-1.5">{res.name}</span>
                </Link>
              ))}
            </div>
            <button
              onClick={context[0]}
              type="button"
              className="absolute end-5 top-6 sm:hidden hover:scale-110 w-fit"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
              />
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMaster;
