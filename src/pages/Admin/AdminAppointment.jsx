import { Outlet, useOutletContext } from "react-router-dom";

function AdminAppointment() {
  const context = useOutletContext();

  return (
    <div className="flex w-full h-full">
      <Outlet />
    </div>
  );
}

export default AdminAppointment;
