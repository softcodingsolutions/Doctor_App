import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { IoIosPaper } from "react-icons/io";
import { FaClinicMedical } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { MdApps } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { IoCloseOutline, IoPersonSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { GrVirtualMachine } from "react-icons/gr";

import { SiPowerapps } from "react-icons/si";

function RecepsitnistSidebar({ onSidebarHide, showSidebar, admin }) {
  const navigate = useNavigate();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [selected, setSelected] = useState(
    localStorage.getItem("sidebarSelected_id") || "1"
  );

  const sidebarItems = [
    {
      id: "1",
      title: "Home",
      to: "appointment/home",
      icons: <MdApps size={19} />,
    },
    {
      id: "5",
      title: "Patient List",
      to: "/receptionist/patients/all-users",
      icons: <IoPersonSharp size={18} />,
    },
    {
      id: "2",
      title: "Consulting Appointment",
      to: "appointment/create-appointment",
      icons: <SiPowerapps size={18} />,
    },
    {
      id: "7",
      title: "Indoor Activity",
      to: "appointment/create-machine-appointment",
      icons: <GrVirtualMachine size={18} />,
    },
    {
      id: "6",
      title: "Consulting / Machine Details",
      to: `/receptionist/appointment/data-entry`,
      icons: <FaLightbulb size={18} />,
    },
    {
      id: "4",
      title: "Generate Bill",
      to: "./generatebill",
      icons: <MdMenuBook size={18} />,
    },
    {
      id: "3",
      title: "Medical Inventory",
      to: "medical-inventory",
      icons: <FaClinicMedical size={18} />,
    },
    {
      id: "8",
      title: "Send Message",
      to: "send-message",
      icons: <IoIosSend size={18} />,
    },
  ];

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleLogoutMenu = () => {
    setIsLogoutMenuOpen(!isLogoutMenuOpen);
  };

  useEffect(() => {
    localStorage.setItem("sidebarSelected_id", selected);
  }, [selected]);

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-[#1F2937] text-gray-100",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <div className="flex w-70 sm:hidden xl:flex p-5 items-center justify-center shadow-sm bg-white  rounded-md">
            <img
              className="h-16 sm:h-full"
              src="https://slimandsmile.com/assets/admin/global/img/logo.jpg"
              alt="img"
            />
          </div>
          <div className="hidden sm:flex xl:hidden items-center justify-center shadow-sm bg-white p-3 rounded-md">
            <FaPlus size={30} className="text-black" />
          </div>

          <div className="flex-grow sm:hidden xl:block text-black" />
          <IoCloseOutline
            size={25}
            className="block sm:hidden cursor-pointer ml-1 hover:scale-110"
            onClick={onSidebarHide}
          />
        </div>
      </div>

      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        {sidebarItems.map((i) => (
          <Link
            to={i.to}
            key={i.id}
            className={clsx(
              "w-full flex items-center px-2 text-base py-1.5 sm:px-0 xl:px-2 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-2 cursor-pointer",
              selected === i.id ? "sidebar-item-selected" : "sidebar-item"
            )}
            onClick={() => setSelected(i.id)}
          >
            {i.icons}
            <div className="block sm:hidden xl:block ml-2 font-sans">
              {i.title}
            </div>
            <div className="block sm:hidden xl:block flex-grow " />
          </Link>
        ))}

        <div className="flex-grow" />
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex flex-col items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <div className="flex flex-row">
            <div
              onClick={() =>
                toggleLogoutMenu(setIsLogoutMenuOpen, isLogoutMenuOpen)
              }
              className={
                "size-fit p-1.5 rounded-full bg-[#506930] cursor-pointer border flex items-center justify-center"
              }
            >
              <div className="text-lg font-semibold">
                {admin?.first_name?.toUpperCase()[0]}
                {admin?.last_name?.toUpperCase()[0]}
              </div>
            </div>
            <div className="block sm:hidden xl:block ml-2 font-bold ">
              {admin?.first_name} {admin?.last_name}{" "}
              <span className="font-normal text-[0.80rem]">(Receptionist)</span>
            </div>
          </div>
          {/* <div className="flex-grow block sm:hidden xl:block" /> */}

          <div
            onClick={() => handleLogoutClick()}
            className="rounded-br-none left-3/4 bottom-11 p-1 cursor-pointer shadow-lg text-black text-center sm:left-16 sm:bottom-11 xl:left-56 xl:bottom-10 mt-2 mr-2 border border-gray-400 bg-white rounded-md sm:rounded-bl-none w-full z-50 hover:bg-black hover:border-gray-900 hover:text-gray-100"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecepsitnistSidebar;
