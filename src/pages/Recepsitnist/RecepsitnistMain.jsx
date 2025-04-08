import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecepsitnistSidebar from "./RecepsitnistSidebar";
import axios from "axios";
import Loader from "../Loader";

function RecepsitnistMain() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleGetAdmin = () => {
    axios
      .get(
        `/api/v1/users/find_user?access_token=${localStorage.getItem(
          "access_token"
        )}`
      )
      .then((res) => {
        console.log("receptionist", res.data?.user);
        setAdmin(res.data?.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAdmin();

    if (!localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/");
    }
    if (
      localStorage.getItem("role") === "super_admin" ||
      localStorage.getItem("role") === "doctor"
    ) {
      navigate("/admin/dashboard");
    } else if (localStorage.getItem("role") === "franchise") {
      navigate("/franchise/dashboard");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex font-sans  bg-white  h-screen">
      <div className="">
        <RecepsitnistSidebar
          admin={admin}
          onSidebarHide={toggleSidebar}
          showSidebar={showSidebar}
        />
      </div>
      {/* Main Content (Outlet) */}
      <div
        className={`transition-all duration-300 flex-1  bg-white w-full  ${
          showSidebar ? "ml-60 m-8" : "ml-20 p-5"
        } `}
      >
        <Outlet context={[toggleSidebar, admin, showSidebar]} />
      </div>
    </div>
  );
}

export default RecepsitnistMain;
