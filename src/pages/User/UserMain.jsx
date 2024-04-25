import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";

function UserMain() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [user, setUser] = useState(true);

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
      });
  };

  useEffect(() => {
    handleGetUser();
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
