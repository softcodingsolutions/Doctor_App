import { Outlet, useOutletContext } from "react-router-dom";

function Appointment() {
  const context = useOutletContext();

  return (
    <>
      <Outlet />
    </>
  );
}

export default Appointment;
