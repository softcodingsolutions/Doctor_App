import { Link, Outlet, useOutletContext } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { AiOutlineMedicineBox } from "react-icons/ai";
import {
  MdError,
  MdFamilyRestroom,
  MdFoodBank,
  MdOutlinePostAdd,
} from "react-icons/md";
import { GrTest, GrYoga } from "react-icons/gr";
import { LiaCapsulesSolid } from "react-icons/lia";
import { BsNintendoSwitch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
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
  {
    id: "7",
    name: "Dos/Don'ts",
    icons: <BsNintendoSwitch size={18} />,
    to: "dos-donts",
  },
  {
    id: "8",
    name: "Family Reason",
    icons: <MdFamilyRestroom size={18} />,
    to: "family-reason",
  },
  {
    id: "9",
    name: "Complains",
    icons: <MdError size={18} />,
    to: "complains",
  },
  {
    id: "10",
    name: "Weight Reason",
    icons: <MdOutlinePostAdd size={18} />,
    to: "weight-reason",
  },
  {
    id: "11",
    name: "Lab Tests",
    icons: <GrTest size={18} />,
    to: "lab-tests",
  },
];

const TRANSLATE_AMOUNT = 260;

function AdminMaster() {
  const context = useOutletContext();
  const [selectedId, setSelectedId] = useState(
    localStorage.getItem("selectedMaster_id")
      ? localStorage.getItem("selectedMaster_id")
      : "1"
  );
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);
    localStorage.setItem("selectedMaster_id", selectedId);
    return () => {
      observer.disconnect();
    };
  }, [translate, selectedId]);

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
            <div
              style={{ transform: `translateX(-${translate}px)` }}
              className="grid grid-cols-4 transition-transform lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-3 p-1 min-w-fit xl:flex"
            >
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
            {isLeftVisible && (
              <div className=" absolute left-[16rem] top-[1.2rem] p-1 h-11 hidden xl:flex items-center justify-start bg-gradient-to-r w-14 from-white from-60% to-transparent">
                <FaChevronLeft
                  onClick={() => {
                    setTranslate((translate) => {
                      const newTranslate = translate - TRANSLATE_AMOUNT;
                      if (newTranslate <= 0) return 0;
                      return newTranslate;
                    });
                  }}
                  className="aspect-square cursor-pointer w-auto h-fit p-2 hover:bg-gray-200 rounded-full"
                />
              </div>
            )}
            {isRightVisible && (
              <div className="absolute right-4 top-[1.2rem] p-1 h-11 hidden xl:flex items-center justify-end bg-gradient-to-l w-14 from-white from-70% to-transparent">
                <FaChevronRight
                  onClick={() => {
                    setTranslate((translate) => {
                      if (containerRef.current === null) return translate;
                      const newTranslate = translate + TRANSLATE_AMOUNT;
                      const edge = containerRef.current.scrollWidth;
                      const width = containerRef.current.clientWidth;
                      if (newTranslate + width >= edge) {
                        console.log(edge - width);
                        return edge - width + 160;
                      }
                      return newTranslate;
                    });
                  }}
                  className="aspect-square cursor-pointer w-auto h-fit p-2 hover:bg-gray-200 rounded-full"
                />
              </div>
            )}
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
