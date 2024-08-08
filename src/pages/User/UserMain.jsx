import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";

function UserMain() {
  const navigate = useNavigate();
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [user, setUser] = useState(0);

  const onSidebarHide = () => {
    onSetShowSidebar(true);
  };

  const handleGetUser = () => {
    axios
      .get(
        `/api/v1/users/find_user?access_token=${localStorage.getItem(
          "access_token"
        )}`
      )
      .then((res) => {
        console.log(res.data?.user);
        setUser(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handleGetUser();

    if (localStorage.getItem("role" == "franchise")) {
      navigate("/franchise/dashboard");
    } else if (localStorage.getItem("role" == "receptionist")) {
      navigate("/receptionist/appointment/home");
    } else if (
      localStorage.getItem("role" == "super_admin") ||
      localStorage.getItem("role" == "doctor")
    ) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <div className="flex">
      <UserSidebar
        user={user}
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Outlet context={[onSidebarHide, user]} />
    </div>
  );
}

export default UserMain;
