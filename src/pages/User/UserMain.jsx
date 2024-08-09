import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";
import Loader from "../Loader";

function UserMain() {
  const navigate = useNavigate();
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
        setLoading(false);
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
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

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
