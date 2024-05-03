import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";

const masterButtons = [
  {
    id: "1",
    name: "General Details",
    to: "general-details",
  },
  {
    id: "2",
    name: "Current Diet",
    to: "current-diet",
  },
  {
    id: "3",
    name: "Family History",
    to: "family-history",
  },
  {
    id: "4",
    name: "Complains",
    to: "complains",
  },
  {
    id: "5",
    name: "Questions",
    to: "user-questions",
  },
  {
    id: "6",
    name: "Diagnosis",
    to: "diagnosis",
  },
  {
    id: "7",
    name: "Checkout",
    to: "checkout",
  },
];

function UserQuestions() {
  const context = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div className="flex w-full p-4">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" flex-grow overflow-auto flex rounded-lg bg-card h-[94vh] bg-white flex-wrap content-start p-2">
        <div className="w-full sm:flex px-1.5 pb-2 items-end">
          <div className="sm:flex-grow flex justify-between overflow-x-hidden">
            <div className="flex w-full flex-wrap items-center justify-center gap-3 p-1 min-w-fit">
              {masterButtons.map((res) => {
                return (
                  <Link
                    to={res.to}
                    onClick={() => setSelectedId(res.id)}
                    key={res.id}
                    className={clsx(
                      "min-w-fit flex items-center justify-center border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white px-5 py-2 rounded-md",
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

export default UserQuestions;
