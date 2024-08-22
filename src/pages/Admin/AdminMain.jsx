import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import Loader from "../Loader";

function AdminMain() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [doctorNewUser, setDoctorNewUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
        setLoading(false);
      });
  };

  const handleDoctorNewUser = () => {
    if (role === "doctor") {
      axios.get(`/api/v1/users?user_id=${main_id}`).then((res) => {
        const newUsers = res.data?.users?.filter(
          (user) => user.treatment_packages.length === 0
        );
        setDoctorNewUser(newUsers);
        console.log(newUsers);
      });
    }
  };

  useEffect(() => {
    handleDoctorNewUser();
  }, [trigger]);

  useEffect(() => {
    handleGetAdmin();

    if (!localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/");
    }

    if (localStorage.getItem("role" == "franchise")) {
      navigate("/franchise/dashboard");
    } else if (localStorage.getItem("role" == "receptionist")) {
      navigate("/receptionist/appointment/home");
    } else if (localStorage.getItem("role" == "patient")) {
      navigate("/user/dashboard");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex font-teachers">
      <AdminSidebar
        admin={admin}
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
        newUser={doctorNewUser}
      />
      <Outlet
        context={[
          onSidebarHide,
          admin,
          handleDoctorNewUser,
          doctorNewUser,
          setTrigger,
        ]}
      />
    </div>
  );
}

export default AdminMain;
