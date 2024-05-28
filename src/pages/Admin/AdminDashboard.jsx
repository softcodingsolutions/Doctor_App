import { useOutletContext } from "react-router-dom";

function AdminDashboard() {
  const context = useOutletContext();

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold">Hello Admin!</div>
              </div>
            </div>
            <button
              onClick={context[0]}
              type="button"
              className="block sm:hidden hover:scale-110"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
                className="w-full h-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
