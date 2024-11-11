import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../../constants/admin/AdminConstants";
import InsideLoader from "../../InsideLoader";
import male from "../../../assets/images/male.avif";
import female from "../../../assets/images/female.avif";
import { BsFillTelephoneFill } from "react-icons/bs";
import TdComponent from "../../../components/TdComponent";
import ThComponent from "../../../components/ThComponent";
import { MdEmail } from "react-icons/md";
import { GiWeight } from "react-icons/gi";

function CustomerUserDiagnosis() {
  localStorage.getItem("caseNumber")
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
        localStorage.setItem("caseNumber",res.data?.user?.case_number);
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
              <GiWeight size={25} />
            </div>
            <div className="pl-1.5 text-sm md:text-md mt-1">
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
      <div className="flex flex-col md:flex-row mx-1 rounded-md gap-4 font-sans w-full h-[40%] p-2 overflow-hidden">
        {/* Questions List Section */}
        <div className="bg-white rounded-md p-4 w-full md:w-1/2 overflow-auto">
          <div className="animate-fade-left animate-delay-75 rounded-md animate-once animate-ease-out overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-sm">Questions List</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShow(!show)}
                  className={`p-2 border-2 rounded-md transition-transform duration-200 ${
                    show ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                  } hover:scale-105 border-gray-300`}
                >
                  Part 1
                </button>
                <button
                  onClick={() => setShow(!show)}
                  className={`p-2 border-2 rounded-md transition-transform duration-200 ${
                    !show ? "scale-105 bg-gray-700 text-white" : "bg-gray-50"
                  } hover:scale-105 border-gray-300`}
                >
                  Part 2
                </button>
              </div>
            </div>

            <table className="w-full z-0">
              <tbody>
                {show ? (
                  showPart1.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium py-20 text-sm text-center"
                        colSpan={3}
                      >
                        No Questions found in Part 1!
                      </th>
                    </tr>
                  ) : (
                    showPart1.map((val, index) => (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-gray-50 text-center text-2xl">
                          *
                        </td>
                        <td className="py-3 px-4 border-b border-gray-50 text-sm">
                          <TdComponent things={val} />
                        </td>
                      </tr>
                    ))
                  )
                ) : showPart2.length === 0 ? (
                  <tr>
                    <th
                      className="uppercase tracking-wide font-medium py-20 text-sm text-center"
                      colSpan={3}
                    >
                      No Questions found in Part 2!
                    </th>
                  </tr>
                ) : (
                  showPart2.map((val, index) => (
                    <tr key={val.id}>
                      <td className="py-2 px-4 border-b border-gray-50 text-center text-sm">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-50 text-sm">
                        <TdComponent things={val} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Family History Section */}
        <div className="bg-white rounded-md p-5 w-full md:w-1/2 overflow-auto">
          <div className="font-semibold text-sm mb-2">Family History</div>
          <div className="animate-fade-left animate-delay-75 rounded-md animate-once animate-ease-out overflow-auto">
            <table className="w-full min-w-[460px] z-0">
              <tbody>
                {showPart1 ? (
                  pastHistory.length === 0 ? (
                    <tr>
                      <th
                        className="uppercase tracking-wide font-medium py-20 text-lg text-center"
                        colSpan={2}
                      >
                        No Family Reason Found!
                      </th>
                    </tr>
                  ) : (
                    pastHistory.map((val, index) => (
                      <tr key={val.id}>
                        <td className="py-2 px-4 border-b border-gray-50 text-center text-2xl">
                          *
                        </td>
                        <td className="py-3 px-4 border-b border-gray-50">
                          <TdComponent things={val} />
                        </td>
                      </tr>
                    ))
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 p-3 items-end">
        <div className="sm:flex-grow flex justify-between overflow-x-hidden">
          <div
            className={`grid grid-cols-3 gap-2 w-full ${
              selectedId ? "merged-height" : ""
            }`}
          >
            {reportButtonsMain.map((res) => {
              return (
                <Link
                  to={res.to}
                  onClick={() => setSelectedId(res.id)}
                  key={res.id}
                  className={clsx(
                    "min-w-fit flex items-center justify-center shadow-md cursor-pointer p-2 rounded-md",
                    pathname === res.to
                      ? "bg-[#1F2937] text-white h-full rounded-b-none" 
                      : "bg-white h-auto hover:bg-[#1F2937] hover:text-white"
                  )}
                >
                  {res.icons}
                  <span className="ml-1.5">{res.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {selectedId && <Outlet context={[id, getCustomer, handlegetUser]} />}
    </>
  );
}

export default CustomerUserDiagnosis;
