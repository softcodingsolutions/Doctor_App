import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { FaLightbulb, FaWpforms } from "react-icons/fa";
import { IoPersonSharp, IoCloseOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdOutlineGppGood } from "react-icons/md";
import { Option, Select } from "@mui/joy";
import { MdManageAccounts } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import img from "../../assets/images/icons_slime.png";

function AdminSidebar({ onSidebarHide, showSidebar, admin }) {
  const navigate = useNavigate();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [selected, setSelected] = useState(
    localStorage.getItem("sidebarSelected_id") || "1"
  );
  const role = localStorage.getItem("role");

  const handleSelectChange = (event) => {
    if (event) {
      setSelected(event.target.value);
    }
  };

  const sidebarItems = [
    {
      id: "1",
      title: "Dashboard",
      to: "dashboard",
      icons: <IoMdHome size={18} />,
    },
    {
      id: "2",
      title: "Customers",
      to: "customers/all-users",
      icons: <IoPersonSharp size={18} />,
    },
    {
      id: "4",
      title: "List Follow Up",
      to: "list-follow-up",
      icons: <FaWpforms size={18} />,
    },
    {
      id: "7",
      title: "Create Role",
      to: "create-role/role-assign",
      icons: <MdManageAccounts size={18} />,
    },
    {
      id: "6",
      title: "Appointment",
      to: `appointment/data-entry`,
      icons: <FaLightbulb size={18} />,
    },
  ].filter((item) => {
    if (item.id === "7" && localStorage.getItem("role") !== "super_admin") {
      return false;
    }
    return true;
  });

  const masterItems = [
    {
      id: "3",
      title: "Master",
      to: `master/list-franchise`,
      icons: <FaLightbulb size={18} />,
    },
    {
      id: "5",
      title: "Treatment",
      to: "treatment/question-part1",
      icons: <MdOutlineGppGood size={18} />,
    },
  ];

  const surveyItems = [
    {
      id: "8",
      title: "Survey Master",
      to: `survey-master/health-problem`,
      icons: <FaLightbulb size={18} />,
    },
    {
      id: "9",
      title: "Survey Treatment",
      to: `suvrey-treatment/survey-weight-gain-questions`,
      icons: <MdOutlineGppGood size={18} />,
    },
    {
      id: "10",
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

  useEffect(() => {
    localStorage.setItem("sidebarSelected_id", selected);
  }, [selected]);

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card font-poppins w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-[#1F2937] text-gray-100",
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
        {sidebarItems.map((i) => (
          <Link
            to={i.to}
            key={i.id}
            className={clsx(
              "w-full mt-6 flex items-center px-3 py-1.5 sm:px-0 xl:px-3 text-base justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
              selected === i.id ? "sidebar-item-selected" : "sidebar-item"
            )}
            onClick={() => setSelected(i.id)}
          >
            {i.icons}
            <div className="block sm:hidden xl:block ml-2">{i.title}</div>
            <div className="block sm:hidden xl:block flex-grow" />
          </Link>
        ))}

        {/* treatment flow */}
        <Select
          style={{ backgroundColor: "transparent", color: "white" }}
          className={clsx("xl:mt-4 mt-6 mx-1")}
          value={selected}
          placeholder="Treatment Flow"
          onChange={handleSelectChange}
        >
          {masterItems.map((res) => (
            <Option key={res.id} value={res.id}>
              {" "}
              <Link
                to={res.to}
                key={res.id}
                className={"w-full flex items-center space-x-2"}
                onClick={() => {
                  localStorage.removeItem("doctor_id");
                  setSelected(res.id);
                }}
              >
                <div className="font-poppins">{res.icons}</div>
                <div className="font-poppins"> {res.title}</div>
              </Link>
            </Option>
          ))}
        </Select>

        {/* survey flow */}
        {role === "super_admin" && (
          <Select
            style={{ backgroundColor: "transparent", color: "white" }}
            className={clsx("xl:mt-4 mt-6 mx-1")}
            value={selected}
            placeholder="Survey Flow"
            onChange={handleSelectChange}
          >
            {surveyItems.map((res) => (
              <Option key={res.id} value={res.id}>
                {" "}
                <Link
                  to={res.to}
                  key={res.id}
                  className={"w-full flex items-center space-x-2"}
                  onClick={() => setSelected(res.id)}
                >
                  <div className="font-poppins">{res.icons}</div>
                  <div className="font-poppins">{res.title}</div>
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
          <div className="block sm:hidden xl:block ml-2 font-bold ">
            {admin?.first_name?.toUpperCase()[0] + admin?.first_name?.slice(1)}{" "}
            {admin?.last_name?.toUpperCase()[0] + admin?.last_name?.slice(1)}{" "}
            {role === "super_admin" ? (
              <span className="font-normal text-[0.65rem]">(Admin)</span>
            ) : (
              <span className="font-normal text-[0.65rem]">(Doctor)</span>
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
              onClick={() => handleLogoutClick()}
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
