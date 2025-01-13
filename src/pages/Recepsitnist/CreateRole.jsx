import { Outlet, useOutletContext } from "react-router-dom";

function AdminTreatment() {
  const context = useOutletContext();

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-2">
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

export default AdminTreatment;
