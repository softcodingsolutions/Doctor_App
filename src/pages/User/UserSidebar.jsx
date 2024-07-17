import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus} from "react-icons/fa6";
import { useState } from "react";
import { MdOutlineMedicalInformation } from "react-icons/md";

function UserSidebar({ onSidebarHide, showSidebar, user }) {
  const navigate = useNavigate();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [selected, setSelected] = useState("0");

  const sidebarItems = [
    {
      id: "0",
      title: "Dashboard",
      to: "dashboard",
      icons: <IoMdHome size={18} />,
    },
    {
      id: "1",
      title: "Diagnosis Details",
      to: "user-diagnosis/profile",
      icons: <MdOutlineMedicalInformation size={18} />,
    },
  ];

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleLogoutMenu = () => {
    setIsLogoutMenuOpen(!isLogoutMenuOpen);
  };

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-gray-800 text-gray-100",
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
              "w-full mt-6 flex items-center px-3 py-1.5 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
              selected === i.id ? "sidebar-item-selected" : "sidebar-item"
            )}
            onClick={() => setSelected(i.id)}
          >
            {i.icons}
            <div className="block sm:hidden xl:block ml-2">{i.title}</div>
            <div className="block sm:hidden xl:block flex-grow" />
          </Link>
        ))}
        <div className="flex-grow" />
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <div
            onClick={() =>
              toggleLogoutMenu(setIsLogoutMenuOpen, isLogoutMenuOpen)
            }
            className={
              "size-fit p-1.5 rounded-full bg-[#506930] cursor-pointer border flex items-center justify-center"
            }
          >
            <div className="text-lg font-semibold">
              {user.first_name?.toUpperCase()[0]}
              {user.last_name?.toUpperCase()[0]}
            </div>
          </div>
          <div className="block sm:hidden xl:block ml-2 font-bold ">
            {user.first_name} {user.last_name}
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          <img
            src={`https://assets.codepen.io/3685267/res-react-dash-options.svg`}
            alt=""
            onClick={() =>
              toggleLogoutMenu(setIsLogoutMenuOpen, isLogoutMenuOpen)
            }
            className={"block sm:hidden xl:block size-3 cursor-pointer"}
          />
          {isLogoutMenuOpen && (
            <div
              onClick={() => handleLogoutClick()}
              className="absolute rounded-br-none left-3/4 bottom-11 p-1 cursor-pointer text-black text-center sm:left-16 sm:bottom-11 xl:left-56 xl:bottom-10 mt-2 mr-2 border border-black bg-white rounded-md sm:rounded-bl-none w-20 z-50 hover:bg-black hover:text-gray-100"
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
