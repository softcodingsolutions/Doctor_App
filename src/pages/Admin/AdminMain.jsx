import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

function AdminMain() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [showSidebar, onSetShowSidebar] = useState(false);

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
        console.log(res.data?.user);
        setAdmin(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetAdmin();

    if (!localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="flex">
      <AdminSidebar
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

export default AdminMain;
