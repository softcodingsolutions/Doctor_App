import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { masterButtons } from "../../constants/admin/SurveyConstants";

const TRANSLATE_AMOUNT = 250;

function SurveyMaster() {
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
                      "min-w-fit flex items-center justify-center col-span-2 shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
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

export default SurveyMaster;
