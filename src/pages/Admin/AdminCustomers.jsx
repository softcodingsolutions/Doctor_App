import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

function AdminCustomers() {
  const context = useOutletContext();
  const navigate = useNavigate();

  const handleAddUsers = () => {
    navigate("../new-user/general-details");
  };

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-1">
          <div className="grid grid-cols-4 transition-transform lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 gap-3 min-w-fit xl:flex"></div>
          <button
            onClick={handleAddUsers}
            className="border border-gray-300 p-1 rounded-md bg-green-600 text-white hover:scale-105"
          >
            Add New
          </button>
          <button
            onClick={context[0]}
            type="button"
            className="absolute end-5 top-8 sm:hidden hover:scale-110 w-fit"
          >
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
            />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminCustomers;
