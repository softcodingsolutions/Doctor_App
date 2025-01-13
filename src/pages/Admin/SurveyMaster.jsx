import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { masterButtons } from "../../constants/admin/SurveyConstants";

function SurveyMaster() {
  const context = useOutletContext();
  const location = useLocation();
  const pathName = location.pathname?.slice(21);
  const containerRef = useRef();

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div
            ref={containerRef}
            className="sm:flex-grow flex justify-between overflow-x-hidden"
          >
            <div className="grid grid-cols-4 transition-transform lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex">
              {masterButtons.map((res) => {
                return (
                  <Link
                    to={res.to}
                    key={res.id}
                    className={clsx(
                      "min-w-fit flex items-center justify-center col-span-2 shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
                      pathName == res.to
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

export default SurveyMaster;
