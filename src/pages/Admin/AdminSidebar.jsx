import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { FaLightbulb, FaWpforms } from "react-icons/fa";
import { IoPersonSharp, IoCloseOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { MdOutlineGppGood } from "react-icons/md";
import { Option, Select } from "@mui/joy";
import { MdManageAccounts } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import img from "../../assets/images/icons_slime.png";
import { BsGraphDown } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

function AdminSidebar({ onSidebarHide, showSidebar, admin }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [selected, setSelected] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const segment = pathname.split("/admin/")[1];

  const doctorSidebarItems = [
    {
      id: "1",
      title: "Dashboard",
      to: "dashboard",
      icons: <IoMdHome size={18} />,
    },
    {
      id: "14",
      title: "Appointments",
      icons: <FaWpforms size={18} />,
      to: "appointments",
    },
    {
      id: "2",
      title: "Patient List",
      to: "patients/all-users",
      icons: <IoPersonSharp size={18} />,
    },
    {
      id: "13",
      title: "List Follow Up",
      to: "list-follow-up",
      icons:  <MdDashboard size={18} />,
    },
    {
      id: "3",
      title: "List Franchise",
      icons: <CiViewList size={18} />,
      to: "list-franchise",
    },
  
    {
      id: "15",
      title: "Analysis Reports",
      icons: <BsGraphDown size={18} />,
      to: "analysis",
    },
  ];

  const adminSidebarItems = [
    {
      id: "4",
      title: "Create Role",
      to: "create-role/role-assign",
      icons: <MdManageAccounts size={18} />,
    },
    {
      id: "5",
      title: "List Franchise",
      icons: <CiViewList size={18} />,
      to: "list-franchise",
    },
    {
      id: "6",
      title: "Patient List",
      to: "recpatients/recall-users",
      icons: <IoPersonSharp size={18} />,
    },
    {
      id: "12",
      title: "Medicine List",
      to: "admin-medicine-inventory",
      icons: <IoPersonSharp size={18} />,
    },
  ];

  const masterItems = [
    {
      id: "7",
      title: "Master",
      to: `master/questions`,
      icons: <FaLightbulb size={18} />,
    },
    {
      id: "8",
      title: "Treatment",
      to: "treatment/question-part1",
      icons: <MdOutlineGppGood size={18} />,
    },
  ];

  const surveyItems = [
    {
      id: "9",
      title: "Survey Master",
      to: `survey-master/health-problem`,
      icons: <FaLightbulb size={18} />,
    },
    {
      id: "10",
      title: "Survey Treatment",
      to: `suvrey-treatment/survey-weight-gain-questions`,
      icons: <MdOutlineGppGood size={18} />,
    },
    {
      id: "11",
      title: "User Data",
      to: `user-data`,
      icons: <AiFillDatabase size={18} />,
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
        "fixed inset-y-0 left-0 bg-card font-sans w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-[#1F2937] text-gray-100",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <div className="flex w-70 sm:hidden xl:flex p-5 items-center justify-center shadow-sm bg-white  rounded-md">
            <img className="h-16 sm:h-full" src={img} alt="img" />
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
        {/* doctor side items */}
        {role === "doctor" &&
          doctorSidebarItems.map((i) => (
            <Link
              to={i.to}
              key={i.id}
              className={clsx(
                "w-full mt-6 flex items-center px-3 py-1.5 sm:px-0 xl:px-3 text-base justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
                segment === i.to ? "sidebar-item-selected" : "sidebar-item"
              )}
              onClick={() => setSelected(0)}
            >
              {i.icons}
              <div className="block sm:hidden xl:block ml-2 relative">
                {i.title}
              </div>

              <div className="block sm:hidden xl:block flex-grow" />
            </Link>
          ))}

        {/* admin side items */}
        {role === "super_admin" &&
          adminSidebarItems.map((i) => (
            <Link
              to={i.to}
              key={i.id}
              className={clsx(
                "w-full mt-6 flex items-center px-3 py-1.5 sm:px-0 xl:px-3 text-base justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
                segment === i.to ? "sidebar-item-selected" : "sidebar-item"
              )}
              onClick={() => setSelected(0)}
            >
              {i.icons}
              <div className="block sm:hidden xl:block ml-2">{i.title}</div>
              <div className="block sm:hidden xl:block flex-grow" />
            </Link>
          ))}

        {/* treatment flow */}
        {role === "doctor" && (
          <Select
            style={{ backgroundColor: "transparent", color: "white" }}
            className={clsx("xl:mt-4 mt-6 mx-1")}
            value={selected}
            placeholder="Treatment Flow"
          >
            {masterItems.map((res) => (
              <Option key={res.id} value={res.title}>
                {" "}
                <Link
                  to={res.to}
                  key={res.id}
                  className={"w-full flex items-center space-x-2"}
                  onClick={() => {
                    setSelected(res.title);
                    localStorage.removeItem("doctor_id");
                  }}
                >
                  <div className="font-sans">{res.icons}</div>
                  <div className="font-sans"> {res.title}</div>
                </Link>
              </Option>
            ))}
          </Select>
        )}

        {/* survey flow */}
        {role === "super_admin" && (
          <Select
            style={{ backgroundColor: "transparent", color: "white" }}
            className={clsx("xl:mt-4 mt-6 mx-1")}
            value={selected}
            placeholder="Survey Flow"
          >
            {surveyItems.map((res) => (
              <Option key={res.id} value={res.title}>
                {" "}
                <Link
                  to={res.to}
                  key={res.id}
                  className={"w-full flex items-center space-x-2"}
                  onClick={() => setSelected(res.title)}
                >
                  <div className="font-sans">{res.icons}</div>
                  <div className="font-sans">{res.title}</div>
                </Link>
              </Option>
            ))}
          </Select>
        )}
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
              {admin?.first_name?.toUpperCase()[0]}
              {admin?.last_name?.toUpperCase()[0]}
            </div>
          </div>
          <div className="block sm:hidden xl:block ml-2 font-bold">
            {admin?.first_name?.toUpperCase()[0] + admin?.first_name?.slice(1)}{" "}
            {admin?.last_name?.toUpperCase()[0] + admin?.last_name?.slice(1)}{" "}
            {role === "super_admin" ? (
              <span className="font-normal text-[0.80rem]">(Admin)</span>
            ) : (
              <span className="font-normal text-[0.80rem]">(Doctor)</span>
            )}
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
              onClick={handleLogoutClick}
              className="absolute rounded-br-none left-3/4 bottom-11 p-1 cursor-pointer shadow-lg text-black text-center sm:left-16 sm:bottom-11 xl:left-56 xl:bottom-10 mt-2 mr-2 border border-gray-400 bg-white rounded-md sm:rounded-bl-none w-20 z-50 hover:bg-black hover:border-gray-900 hover:text-gray-100"
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
