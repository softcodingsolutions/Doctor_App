import { Outlet } from "react-router-dom";

function NewCustomer() {
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default NewCustomer;
