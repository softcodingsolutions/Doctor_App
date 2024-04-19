import { Link, Outlet, useOutletContext } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdFoodBank } from "react-icons/md";
import { GrYoga } from "react-icons/gr";
import { LiaCapsulesSolid } from "react-icons/lia";
import { useState } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";

const masterButtons = [
  {
    id: "1",
    name: "List Franchise",
    icons: <CiViewList size={18} />,
    to: "list-franchise",
  },
  {
    id: "2",
    name: "Questions",
    icons: <FaRegQuestionCircle size={18} />,
    to: "questions",
  },
  {
    id: "3",
    name: "Medicines",
    icons: <AiOutlineMedicineBox size={18} />,
    to: "medicine",
  },
  {
    id: "4",
    name: "Diet",
    icons: <MdFoodBank size={18} />,
    to: "diet",
  },
  {
    id: "5",
    name: "Exercise/Yoga",
    icons: <GrYoga size={18} />,
    to: "exercise-yoga",
  },
  {
    id: "6",
    name: "Nutrition/Supplements",
    icons: <LiaCapsulesSolid size={18} />,
    to: "nutrition-supplements",
  },
];

function AdminMaster() {
  const context = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between ">
            <div className="grid grid-cols-4 xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-2.5 p-1 min-w-fit">
              {masterButtons.map((res) => {
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
            <button
              onClick={context[0]}
              type="button"
              className="absolute end-5 sm:hidden hover:scale-110 w-fit"
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
