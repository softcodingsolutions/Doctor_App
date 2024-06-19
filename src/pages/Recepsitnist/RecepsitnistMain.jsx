import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecepsitnistSidebar from "./RecepsitnistSidebar";
import axios from "axios";

function RecepsitnistMain() {
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
        console.log("Admin", res.data?.user);
        setAdmin(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
