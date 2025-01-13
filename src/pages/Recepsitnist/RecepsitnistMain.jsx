import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecepsitnistSidebar from "./RecepsitnistSidebar";
import axios from "axios";
import Loader from "../Loader";

function RecepsitnistMain() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const onSidebarHide = () => {
    onSetShowSidebar(true);
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
    <div className="flex font-sans">
      <RecepsitnistSidebar
        admin={admin}
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Outlet context={[onSidebarHide, admin]} />
    </div>
  );
}

export default RecepsitnistMain;
