import { Outlet, useOutletContext } from "react-router-dom";

function RecepsitnistCustomers() {
  const context = useOutletContext();
  const [toggleSidebar, admin, showSidebar] = useOutletContext();

  return (
    <>
      <Outlet context={[toggleSidebar, admin, showSidebar]}  />
    </>
  );
}

export default RecepsitnistCustomers;
