import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../../constants/admin/AdminConstants";
import InsideLoader from "../../InsideLoader";
import male from "../../../assets/images/male_converted.webp";
import female from "../../../assets/images/female_converted.webp";
import { BsFillTelephoneFill } from "react-icons/bs";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { SlGraph } from "react-icons/sl";
import { GiWeight } from "react-icons/gi";
import { CiCalendar } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";

function CustomerUserDiagnosis() {
  localStorage.getItem("caseNumber");
  const [selectedId, setSelectedId] = useState("2");
  const [getCustomer, setGetCustomer] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const id = localStorage.getItem("userId");
  const location = useLocation();
  const pathname = location.pathname?.split("/user-diagnosis/")[1];
  const [loading, setLoading] = useState(true);
  const [showPart1, setShowPart1] = useState([]);
  const [showPart2, setShowPart2] = useState(false);
  const [pastHistory, setPastHistory] = useState([]);
  const [show, setShow] = useState(true);

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetCustomer(res.data?.user);
        localStorage.setItem("caseNumber", res.data?.user?.case_number);
        setShowPart1(
          res.data?.user?.personal_detail?.user_selected_questions_one
        );
        setShowPart2(
          res.data?.user?.personal_detail?.user_selected_questions_two
        );
        setPastHistory(
          res.data?.user?.personal_detail?.family_reasons
            ?.selected_family_reasons
        );
        if (res.data?.user?.creator === "doctor") {
          localStorage.setItem("doctor_id", res.data?.user.created_by_id);
          setLoading(false);
        } else if (res.data?.user?.creator === "franchise") {
          axios
            .get(`/api/v2/users/search?id=${res.data?.user?.created_by_id}`)
            .then((res) => {
              console.log(
                "User created by franchise's doctor: ",
                res.data?.user
              );
              setLoading(false);
              localStorage.setItem("doctor_id", res.data?.user?.created_by_id);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });

    axios
      .get(`/api/v2/users/search?id=${localStorage.getItem("main_id")}`)
      .then((res) => {
        console.log("Admin: ", res.data?.user);
        setGetAdmin(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  const reportButtonsMain = reportButtons.filter((button) => {
    if (button.id === "7" && getCustomer?.treatment_packages?.length === 0) {
      return false;
    }

    if (button.id === "4") {
      return getAdmin.possibility_group === true || getAdmin.role === "doctor";
    }

    return true;
  });

  return (
    <div className="flex flex-col   gap-2">
      {/* Personal Details Card */}
      <div className="bg-card text-card-foreground bg-white shadow-sm  border-slate-200 flex  pb-5 border-b-2   flex-col md:flex-row justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-20  border-4 border-white shadow-sm">
            {getCustomer.personal_detail?.gender === "male" ? (
              <img src={male} alt="img" className="aspect-square h-full " />
            ) : (
              <img src={female} alt="img" className="aspect-square h-full " />
            )}
          </span>
          <div>
            <div className=" text-md font-semibold">
              {getCustomer?.first_name?.[0]?.toUpperCase() +
                getCustomer?.first_name?.slice(1) +
                " " +
                getCustomer?.last_name?.[0]?.toUpperCase() +
                getCustomer?.last_name?.slice(1)}
            </div>

            <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-normal text-xs px-2 py-0 h-5 bg-blue-50 text-blue-700 border-blue-200">
              Case Number: {getCustomer?.case_number}
            </div>
            <div className="flex flex-col mt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <MdEmail />
                {getCustomer?.email}
              </div>
              <div className="flex items-center gap-1">
                <BsFillTelephoneFill /> {getCustomer?.phone_number}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-1.5 justify-center  w-full md:w-[16rem] text-balance">
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
        </div> */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <IoPersonSharp />
            </div>
            <div className="flex gap-1 ">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Age:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {" "}
                {getCustomer?.personal_detail?.age}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <SlGraph />
            </div>
            <div className="flex gap-1 ">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Height:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {" "}
                {getCustomer?.personal_detail?.height} cm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <GiWeight />
            </div>
            <div className="flex gap-1 ">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Weight:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {" "}
                {getCustomer?.personal_detail?.weight} kgs
              </span>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-2 justify-center h-auto w-full md:w-[16rem]">
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
              <GiWeight size={25} />
            </div>
            <div className="pl-1.5 text-sm md:text-md mt-1">
              {getCustomer?.personal_detail?.weight} kgs
            </div>
          </div>
        </div> */}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <CiCalendar />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Created At:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {" "}
                {getCustomer?.personal_detail?.created_at
                  ?.slice(0, 10)
                  ?.split("-")
                  ?.reverse()
                  ?.join("-")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <CiCalendar />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Starting Date:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {getCustomer?.user_packages?.starting_date
                  ?.slice(0, 10)
                  ?.split("-")
                  ?.reverse()
                  ?.join("-")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <CiCalendar />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                {" "}
                Ending Date:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {getCustomer?.user_packages?.ending_date
                  ?.slice(0, 10)
                  ?.split("-")
                  ?.reverse()
                  ?.join("-")}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2 justify-center h-auto w-full md:w-[16rem]">
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
        </div> */}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <CiFileOn />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                {" "}
                Package:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {" "}
                {getCustomer?.user_packages?.package_name ?? "Not Assigned"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <CiFileOn />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                Treatment Package:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {getCustomer?.treatment_packages?.[0]?.treatment_package
                  ?.weight_reason
                  ? getCustomer?.treatment_packages?.[0]?.treatment_package
                      ?.weight_reason +
                    "-" +
                    getCustomer?.treatment_packages?.[0]?.treatment_package
                      ?.package_name
                  : "Not Assigned"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-400 text-[#64748B] text-sm">
              <IoPersonSharp />
            </div>
            <div className="flex gap-1">
              <span className="text-sm font-semibold text-slate-500 text-black">
                {" "}
                Registration Through:
              </span>
              <span className="text-sm font-medium text-gray-700">
                {getCustomer?.creator === "doctor" ? "Doctor" : "Franchise"} (
                {getCustomer?.doctor.first_name})
              </span>
            </div>
          </div>
        </div>
        {/* 
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
        </div> */}
      </div>

      {/* Report Buttons Section */}
      <div className=" rounded-lg border bg-white shadow-sm rounde-md overflow-auto">
        <div className="flex  ">
          {reportButtonsMain.map((res) => (
            <Link
              to={res.to}
              onClick={() => setSelectedId(res.id)}
              key={res.id}
              className={clsx(
                "w-full flex items-center justify-center  cursor-pointer p-1.5 rounded-md",
                pathname === res.to
                  ? "bg-[#EFF6FF] w-10 text-[#2563EB] border-b border-[#2563EB] h-full rounded-b-none"
                  : "bg-white hover:bg-[#e3eaf3] "
              )}
            >
              {res.icons}
              <span className="ml-1.5">{res.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Report Section */}
      <div className=" rounded-lg h-[25rem] overflow-y-auto">
        {selectedId && <Outlet context={[id, getCustomer, handlegetUser]} />}
      </div>

      {/* <div className="flex h-[25rem] ">
        <div className="flex flex-col gap-1">
          {reportButtonsMain.map((res) => (
            <Link
              to={res.to}
              onClick={() => setSelectedId(res.id)}

              key={res.id}
              className={clsx(
                "flex items-center w-32 p-1 rounded-md cursor-pointer",
                pathname === res.to
                  ? "bg-[#1F2937] text-white"
                  : "hover:bg-[#1F2937] hover:text-white"
              )}
            >
              {res.icons}
              <span className="ml-1">{res.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex-1  p-2 rounded-lg overflow-y-auto ">
          {selectedId && <Outlet context={[id, getCustomer, handlegetUser]} />}
        </div>
      </div> */}
    </div>
  );
}

export default CustomerUserDiagnosis;
