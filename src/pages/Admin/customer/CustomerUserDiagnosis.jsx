import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../../constants/admin/AdminConstants";
import InsideLoader from "../../InsideLoader";
import male from "../../../assets/images/male.avif";
import female from "../../../assets/images/female.avif";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiWeight } from "react-icons/gi";

function CustomerUserDiagnosis() {
  const [selectedId, setSelectedId] = useState("2");
  const [getCustomer, setGetCustomer] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const id = localStorage.getItem("userId");
  const location = useLocation();
  const pathname = location.pathname?.split("/user-diagnosis/")[1];
  const [loading, setLoading] = useState(true);

  const handlegetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        console.log("User to diagnos: ", res.data?.user);
        setGetCustomer(res.data?.user);
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
      <div className="mx-2 w-full bg-white rounded-md px-2 py-2 flex items-center gap-1.5 font-sans overflow-x-auto">
        {getCustomer.personal_detail?.gender === "male" ? (
          <img src={male} alt="img" className="size-24 ml-2" />
        ) : (
          <img src={female} alt="img" className="size-24 ml-2" />
        )}

        <div className="flex flex-col gap-1.5 justify-center h-32 w-[16rem] text-balance">
          <div className="flex w-80">
            <div className="text-right break-words font-small text-md">
              Case Number:
            </div>
            <div className=" pl-1.5 text-md">{getCustomer?.case_number}</div>
          </div>
          <div className="flex">
            <div className="text-right break-words font-medium text-md">
              Name:
            </div>
            <div className=" pl-1.5 text-md">
              {getCustomer?.first_name?.[0]?.toUpperCase() +
                getCustomer?.first_name?.slice(1) +
                " " +
                getCustomer?.last_name?.[0]?.toUpperCase() +
                getCustomer?.last_name?.slice(1)}
            </div>
          </div>
          <div className="flex">
            <div className="text-right break-words font-medium mt-1">
              <MdEmail />
            </div>
            <div className="pl-1.5 text-md">{getCustomer?.email}</div>
          </div>
          <div className="flex">
            <div className="text-right  break-words font-medium mt-1">
              <BsFillTelephoneFill />
            </div>
            <div className="ml-1 pl-1.5 text-md">
              {getCustomer?.phone_number}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center h-32 w-[16rem]">
          {/* <div className="flex">
            <div className="text-right break-words font-medium">Gender:</div>
            <div className="pl-1.5">
              {getCustomer?.personal_detail?.gender?.[0]?.toUpperCase() +
                getCustomer?.personal_detail?.gender?.slice(1)}
            </div>
          </div> */}

          <div className="flex">
            <div className=" text-right break-words font-medium text-md">
              Age:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.personal_detail?.age}
            </div>
          </div>
          <div className="flex">
            <div className="text-right break-words font-medium text-md">
              Height:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.personal_detail?.height} cm
            </div>
          </div>

          <div className="flex">
            <div className="text-right break-words font-medium ">
              <GiWeight size={22} />
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.personal_detail?.weight} kgs
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center h-32 w-[16rem]">
          <div className="flex w-80">
            <div className="text-right break-words font-medium text-md ">
              Created At:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.personal_detail?.created_at
                ?.slice(0, 10)
                ?.split("-")
                ?.reverse()
                ?.join("-")}
            </div>
          </div>
          <div className="flex">
            <div className="text-right break-words font-medium text-md">
              Starting Date:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.user_packages?.[0]?.starting_date
                ?.slice(0, 10)
                ?.split("-")
                ?.reverse()
                ?.join("-")}
            </div>
          </div>

          <div className="flex">
            <div className="text-right break-words font-medium text-md">
              Ending Date:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.user_packages?.[0]?.ending_date
                ?.slice(0, 10)
                ?.split("-")
                ?.reverse()
                ?.join("-")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center h-28 w-[19rem]">
          <div className="flex">
            <div className="text-right break-words font-medium text-md">
              Package:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer?.user_packages?.[0]?.package_name ?? "Not Assigned"}
            </div>
          </div>
          <div className="flex ">
            <div className="text-right break-words font-medium text-md">
              Treatment Package:
            </div>
            <div className="pl-1.5 text-md">
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
            <div className="text-right break-words font-medium text-md">
              Registration Through:
            </div>
            <div className="pl-1.5 text-md">
              {getCustomer[1]?.creator === "doctor" ? "Doctor" : "Franchise"}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:flex items-end mt-3">
        <div className="sm:flex-grow flex justify-between overflow-x-hidden">
          <div className="flex flex-wrap justify-center transition-transform gap-3 p-1 w-full">
            {reportButtonsMain.map((res) => {
              return (
                <Link
                  to={res.to}
                  onClick={() => setSelectedId(res.id)}
                  key={res.id}
                  className={clsx(
                    "min-w-fit flex items-center justify-center col-span-2 shadow-md cursor-pointer hover:bg-[#1F2937] hover:text-white p-2 rounded-md",
                    pathname === res.to ? "bg-[#1F2937] text-white" : "bg-white"
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
