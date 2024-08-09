import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../constants/admin/AdminConstants";
import InsideLoader from "../InsideLoader";

function UserDiagnosis() {
  const context = useOutletContext();
  const [selectedId, setSelectedId] = useState("1");
  const [getCustomer, setGetCustomer] = useState([]);
  const id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetCustomer(res.data?.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  const reportButtonsMain = reportButtons.filter((button) => {
    if (
      button.id === "2" ||
      button.id === "4" ||
      button.id === "5" ||
      button.id === "6"
    ) {
      return (
        getCustomer.role === "super_admin" ||
        getCustomer.possibility_group === true
      );
    }
    return true;
  });

  if (loading) {
    return <InsideLoader />;
  }

  return (
    <div className="flex w-full font-poppins">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <div className="w-fit p-1">
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
        <>
          <div className="w-full sm:flex items-end">
            <div className="sm:flex-grow flex justify-between overflow-x-hidden">
              <div className="flex flex-wrap justify-center transition-transform gap-3 p-1 w-full">
                {reportButtonsMain.map((res) => {
                  return (
                    <Link
                      to={res.to}
                      onClick={() => setSelectedId(res.id)}
                      key={res.id}
                      className={clsx(
                        "min-w-fit flex items-center justify-center col-span-2 border shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
                        selectedId === res.id
                          ? "bg-[#1F2937] text-white"
                          : "bg-white"
                      )}
                    >
                      {res.icons}
                      <span className="ml-1.5 font-poppins">{res.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedId && <Outlet context={[id, getCustomer]} />}
        </>
      </div>
    </div>
  );
}

export default UserDiagnosis;
