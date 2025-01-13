import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { packagesButton } from "../../constants/admin/AdminConstants";
import InsideLoader from "../InsideLoader";
import male from "../../assets/images/male.avif";
import female from "../../assets/images/female.avif";
import { BsFillTelephoneFill } from "react-icons/bs";
import ChatComponent from "../../components/Chat/ChatComponent";
import { MdEmail } from "react-icons/md";
import { GiWeight } from "react-icons/gi";

function UserDiagnosis() {
  const context = useOutletContext();
  const [getCustomer, setGetCustomer] = useState([]);
  const id = localStorage.getItem("main_id");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedId, setSelectedId] = useState("12");
  const pathname = location.pathname?.split("/user-diagnosis/")[1];
  const role = localStorage.getItem("role");
  console.log(pathname);

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetCustomer(res.data?.user);
        localStorage.setItem("caseNumber", res.data?.user?.case_number);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  const reportButtonsMain = packagesButton.filter((button) => {
    if (
      button.id === "21" ||
      button.id === "23" ||
      button.id === "26" ||
      button.id === "13"
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
    <div className="flex w-full font-sans">
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
          <div className="mx-2 w-full bg-white rounded-md px-2 py-2 flex flex-col md:flex-row items-center gap-2 font-sans overflow-x-auto">
            {getCustomer.personal_detail?.gender === "male" ? (
              <img src={male} alt="img" className="size-24 ml-2" />
            ) : (
              <img src={female} alt="img" className="size-24 ml-2" />
            )}

            <div className="flex flex-col gap-1.5 justify-center h-auto w-full md:w-[16rem] text-balance">
              <div className="flex w-full">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Case Number:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.case_number}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Name:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.first_name?.[0]?.toUpperCase() +
                    getCustomer?.first_name?.slice(1) +
                    " " +
                    getCustomer?.last_name?.[0]?.toUpperCase() +
                    getCustomer?.last_name?.slice(1)}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold mt-1 text-sm md:text-md">
                  <MdEmail />
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.email}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold mt-1 text-sm md:text-md">
                  <BsFillTelephoneFill />
                </div>
                <div className="ml-1 pl-1.5 text-sm md:text-md">
                  {getCustomer?.phone_number}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center h-auto w-full md:w-[16rem]">
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Age:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.personal_detail?.age}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Height:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.personal_detail?.height} cm
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  <GiWeight size={28} />
                </div>
                <div className="pl-1.5 text-sm mt-1 md:text-md">
                  {getCustomer?.personal_detail?.weight} kgs
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center h-auto w-full md:w-[16rem]">
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Created At:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.personal_detail?.created_at
                    ?.slice(0, 10)
                    ?.split("-")
                    ?.reverse()
                    ?.join("-")}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Starting Date:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.user_packages?.starting_date
                    ?.slice(0, 10)
                    ?.split("-")
                    ?.reverse()
                    ?.join("-")}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Ending Date:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.user_packages?.ending_date
                    ?.slice(0, 10)
                    ?.split("-")
                    ?.reverse()
                    ?.join("-")}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center h-auto w-full md:w-[19rem]">
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Package:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.user_packages?.package_name ?? "Not Assigned"}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Treatment Package:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.treatment_packages?.[0]?.treatment_package
                    ?.weight_reason
                    ? getCustomer?.treatment_packages?.[0]?.treatment_package
                        ?.weight_reason +
                      "-" +
                      getCustomer?.treatment_packages?.[0]?.treatment_package
                        ?.package_name
                    : "Not Assigned"}
                </div>
              </div>
              <div className="flex">
                <div className="text-right break-words font-semibold text-sm md:text-md">
                  Registration Through:
                </div>
                <div className="pl-1.5 text-sm md:text-md">
                  {getCustomer?.creator === "doctor" ? "Doctor" : "Franchise"} (
                  {getCustomer?.doctor.first_name})
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full h-[80%]">
            <div className="flex flex-col items-start m-2 h-[97%] bg-white gap-1 rounded-md w-full lg:w-[20%]">
              {reportButtonsMain.map((res) => {
                return (
                  <Link
                    to={res.to}
                    onClick={() => setSelectedId(res.id)}
                    key={res.id}
                    className={clsx(
                      "w-full flex items-center justify-start  cursor-pointer hover:bg-[#1F2937] hover:text-white rounded-md p-3",
                      pathname === res.to
                        ? "bg-[#1F2937] text-white"
                        : "bg-white"
                    )}
                  >
                    {res.icons}
                    <span className="ml-1.5">{res.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex w-full lg:w-[80%] p-2 bg-white mt-2 mr-2 mb-2 rounded-md">
              {selectedId && (
                <Outlet context={[id, getCustomer, handlegetUser]} />
              )}
              {role === "patient" && <ChatComponent />}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default UserDiagnosis;
