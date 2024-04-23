import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

function UserMain() {
  const [showSidebar, onSetShowSidebar] = useState(false);

  const onSidebarHide = () => {
    onSetShowSidebar(true);
  };

  return (
    <div className="flex">
      <UserSidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Outlet context={[onSidebarHide]} />
    </div>
  );
}

export default UserMain;
