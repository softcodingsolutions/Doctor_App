import { useEffect, useState } from "react";
import FranchiseSidebar from "./FranchiseSidebar";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader";

function FranchiseMain() {
  const navigate = useNavigate();
  const [franchise, setFranchise] = useState();
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
        console.log(res.data?.user);
        setFranchise(res.data?.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetAdmin();

    if (!localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex font-sans">
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
