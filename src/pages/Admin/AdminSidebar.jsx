import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { FaLightbulb, FaWpforms } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { MdOutlineGppGood } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import icons_slime from "../../assets/images/icons_slime_converted.webp";

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
      to: "appointments",
      icons: <FaWpforms size={18} />,
    },
    {
      id: "2",
      title: "Patient List",
      to: "patients/all-users",
      icons: <IoPersonSharp size={18} />,
    },
    {
      id: "13",
      title: "Patient Visiting History",
      to: "list-follow-up",
      icons: <MdDashboard size={18} />,
    },
    {
      id: "3",
      title: "List Franchise",
      to: "list-franchise",
      icons: <CiViewList size={18} />,
    },
    {
      id: "15",
      title: "Analysis Reports",
      to: "analysis",
      icons: <BsGraphDown size={18} />,
    },
    {
      id: "25",
      title: "User Inquiry",
      to: "user-inqury",
      icons: <AiOutlineFileSearch size={19} />,
    },
  ];

  const other = [
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
      to: "list-franchise",
      icons: <CiViewList size={18} />,
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

  // const masterItems = [
  //   { id: "7", title: "Master", to: `master/questions`, icons: <FaLightbulb size={18} /> },
  //   { id: "8", title: "Treatment", to: "treatment/question-part1", icons: <MdOutlineGppGood size={18} /> },
  // ];

  // const surveyItems = [
  //   { id: "9", title: "Survey Master", to: `survey-master/health-problem`, icons: <FaLightbulb size={18} /> },
  //   { id: "10", title: "Survey Treatment", to: `survey-treatment/survey-weight-gain-questions`, icons: <MdOutlineGppGood size={18} /> },
  //   { id: "11", title: "User Data", to: `user-data`, icons: <AiFillDatabase size={18} /> },
  // ];

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleRedirect = () => {
    navigate("/admin/profile-setting");
  };

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card font-sans flex flex-col z-10 bg-[#1F2937] text-gray-100 transition-all duration-300",
        showSidebar ? "w-56" : "w-20"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex-shrink-0 overflow-hidden p-4  justify-between flex items-center border-b border-blue-gray-800 mb-4">
        {showSidebar ? (
          <img
            src={icons_slime}
            alt="Logo"
            className="h-[50px] bg-white  rounded-lg p-2"
          />
        ) : (
          ""
        )}

        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={onSidebarHide}
        >
          {showSidebar ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>
      {/* 
      <hr className="border mt-3 mb-3" /> */}
      {/* Sidebar Items */}
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col mt-3">
        {role === "doctor" && (
          <div>
            {showSidebar && (
              <div className="text-[#ffffff99] px-6 text-xs"> Main Menu </div>
            )}
            <div className="px-3 py-1 ">
              {doctorSidebarItems.map((i) => (
                <Link
                  to={i.to}
                  key={i.id}
                  className={clsx(
                    "flex items-center rounded-md px-3 py-2 hover:bg-gray-700 transition-all text-xs mt-1",
                    segment === i.to ? "bg-gray-800" : ""
                  )}
                >
                  {i.icons}
                  {showSidebar && <span className="ml-2 ">{i.title}</span>}
                </Link>
              ))}
            </div>
            {showSidebar && (
              <div className="text-[#ffffff99] px-6 text-xs">Other </div>
            )}
            <div className="px-3 py-1">
              {other.map((i) => (
                <Link
                  to={i.to}
                  key={i.id}
                  className={clsx(
                    "flex items-center rounded-md px-3 py-2 hover:bg-gray-700 transition-all text-xs mt-1",
                    segment === i.to ? "bg-gray-800" : ""
                  )}
                >
                  {i.icons}
                  {showSidebar && <span className="ml-2">{i.title}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {role === "super_admin" &&
          adminSidebarItems.map((i) => (
            <Link
              to={i.to}
              key={i.id}
              className={clsx(
                "flex items-center px-3 py-2 hover:bg-gray-700 transition-all",
                segment === i.to ? "bg-gray-800" : ""
              )}
            >
              {i.icons}
              {showSidebar && <span className="ml-2">{i.title}</span>}
            </Link>
          ))}

        {/* Treatment Flow */}
        {/* {role === "doctor" && (
          <Select
            style={{ backgroundColor: "transparent", color: "white" }}
            className="mt-4 mx-1"
            value={selected}
            placeholder="Treatment Flow"
          >
            {masterItems.map((res) => (
              <Option key={res.id} value={res.title}>
                <Link to={res.to} onClick={() => setSelected(res.title)}>
                  {res.icons}
                  {showSidebar && <span className="ml-2">{res.title}</span>}
                </Link>
              </Option>
            ))}
          </Select>
        )} */}

        {/* Survey Flow */}
        {/* {role === "super_admin" && (
          <Select
            style={{ backgroundColor: "transparent", color: "white" }}
            className="mt-4 mx-1"
            value={selected}
            placeholder="Survey Flow"
          >
            {surveyItems.map((res) => (
              <Option key={res.id} value={res.title}>
                <Link to={res.to} onClick={() => setSelected(res.title)}>
                  {res.icons}
                  {showSidebar && <span className="ml-2">{res.title}</span>}
                </Link>
              </Option>
            ))}
          </Select>
        )} */}
      </div>

      {/* Logout Section */}
      <div className="p-2 flex flex-col items-center">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex gap-1">
            <div className="p-2 rounded-full bg-[#506930] text-white cursor-pointer">
              {admin?.first_name?.[0]?.toUpperCase()}
              {admin?.last_name?.[0]?.toUpperCase()}
            </div>
            {showSidebar && (
              <span className="ml-2 font-bold">
                {admin?.first_name} {admin?.last_name}
              </span>
            )}
          </div>
          <div>
            <button onClick={() => handleRedirect()}>
              <IoSettingsSharp />
            </button>
          </div>
        </div>
        {showSidebar ? (
          <button
            onClick={handleLogoutClick}
            className="mt-2 p-2 w-full bg-white text-black font-semibold rounded shadow hover:bg-gray-800 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogoutClick}
            className="mt-2 p-2 mr-4 text-white font-bold rounded shadow hover:bg-gray-800 hover:text-white"
          >
            <MdLogout size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
