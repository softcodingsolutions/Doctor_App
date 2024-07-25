import { useEffect, useState } from "react";
import FranchiseSidebar from "./FranchiseSidebar";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function FranchiseMain() {
  const navigate = useNavigate();
  const [franchise, setFranchise] = useState();
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
        setFranchise(res.data?.user);
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
    <div className="flex font-teachers">
      <FranchiseSidebar
        franchise={franchise}
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Outlet context={[onSidebarHide, franchise]} />
    </div>
  );
}

export default FranchiseMain;
