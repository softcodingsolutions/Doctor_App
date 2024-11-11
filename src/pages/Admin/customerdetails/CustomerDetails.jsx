import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import {
  packagesButton,
  reportButtons,
} from "../../../constants/admin/AdminConstants";
import InsideLoader from "../../InsideLoader";
import male from "../../../assets/images/male.avif";
import female from "../../../assets/images/female.avif";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiWeight } from "react-icons/gi";

const CustomerDetails = () => {
  const [selectedId, setSelectedId] = useState("21");
  const [getCustomer, setGetCustomer] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const pathname =
    role === "doctor" || role === "franchise" || role === "super_admin"
      ? location.pathname.split("/customer-details/")[1]
      : location.pathname.split("/recp-customer-details/")[1];

  const [loading, setLoading] = useState(true);
  const handlegetUser = () => {
    axios

      .get(`/api/v2/users/search?id=${id}`)
      .then((res) => {
        setGetCustomer(res.data?.user);
        if (res.data?.user?.creator === "doctor") {
          localStorage.setItem("doctor_id", res.data?.user.created_by_id);
          setLoading(false);
        } else if (res.data?.user?.creator === "franchise") {
          axios
            .get(`/api/v2/users/search?id=${res.data?.user?.created_by_id}`)
            .then((res) => {
              setLoading(false);
              localStorage.setItem("doctor_id", res.data?.user?.created_by_id);
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message + "!");
      });

    axios
      .get(`/api/v2/users/search?id=${localStorage.getItem("main_id")}`)
      .then((res) => {
        setGetAdmin(res.data?.user);
      })
      .catch((err) => {
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  if (loading) {
    return <InsideLoader />;
  }

  const reportButtonsMain = packagesButton.filter((button) => {
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
      <div className="flex flex-col md:flex-row w-full h-[80%]">
        <div className="flex flex-col items-start m-2 h-[97%] bg-white gap-1 ml-2 w-full md:w-[20%] rounded-md">
          {reportButtonsMain.map((res) => {
            return (
              <Link
                to={res.to}
                onClick={() => setSelectedId(res.id)}
                key={res.id}
                className={clsx(
                  "w-full flex items-center justify-start  cursor-pointer hover:bg-[#1F2937] hover:text-white rounded-md p-3",
                  pathname === res.to ? "bg-[#1F2937] text-white" : "bg-white"
                )}
              >
                {res.icons}
                <span className="ml-1.5">{res.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex w-full md:w-[80%] p-2 bg-white mt-0 md:mt-2 mr-2 mb-2 rounded-md">
          {selectedId && <Outlet context={[id, getCustomer, handlegetUser]} />}
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
