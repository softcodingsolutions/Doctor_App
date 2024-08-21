import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { reportButtons } from "../../../constants/admin/AdminConstants";
import InsideLoader from "../../InsideLoader";
import img from "../../../assets/images/doctor-img.jpg";

function CustomerUserDiagnosis() {
  const [selectedId, setSelectedId] = useState("2");
  const [getCustomer, setGetCustomer] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const id = localStorage.getItem("userId");
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
    if (button.id === "4") {
      return getAdmin.possibility_group === true || getAdmin.role === "doctor";
    }
    return true;
  });

  return (
    <>
      <div className="mx-5 w-full bg-white rounded-md px-2 py-3 flex items-center font-teachers">
        <img src={img} alt="img" className="size-24 ml-3" />

        <div className="flex flex-col gap-1.5 items-center">
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Case Number:
            </div>
            <div className="w-1/2 pl-3">{getCustomer?.case_number}</div>
          </div>
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Patient Name:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.first_name?.[0]?.toUpperCase() +
                getCustomer?.first_name?.slice(1) +
                " " +
                getCustomer?.last_name?.[0]?.toUpperCase() +
                getCustomer?.last_name?.slice(1)}
            </div>
          </div>

          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Phone Number:
            </div>
            <div className="w-1/2 pl-3">{getCustomer?.phone_number}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">Age:</div>
            <div className="w-1/2 pl-3">
              {getCustomer?.personal_detail?.age}
            </div>
          </div>
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Gender:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.personal_detail?.gender?.[0]?.toUpperCase() +
                getCustomer?.personal_detail?.gender?.slice(1)}
            </div>
          </div>
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Email:
            </div>
            <div className="w-1/2 pl-3">{getCustomer?.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Height:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.personal_detail?.height} cm
            </div>
          </div>

          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Weight:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.personal_detail?.weight} kgs
            </div>
          </div>

          <div className="flex justify-between items-center w-[16rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Created At:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.personal_detail?.created_at?.slice(0, 10)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center w-[17.5rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Registration Through:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer[1]?.creator === "doctor" ? "Doctor" : "Franchise"}
            </div>
          </div>

          <div className="flex justify-between items-center w-[17.5rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Package:
            </div>
            <div className="w-1/2 pl-3">
              {getCustomer?.user_packages?.[0]?.package_name ??
                "Will be given by the doctor"}
            </div>
          </div>

          <div className="flex justify-between items-center w-[17rem]">
            <div className="w-2/3 text-right break-words font-medium">
              Treatment Package:
            </div>
            <div className="w-1/2 pl-3 ">
              {getCustomer?.treatment_packages?.[0]?.treatment_package
                ?.weight_reason
                ? getCustomer?.treatment_packages?.[0]?.treatment_package
                    ?.weight_reason +
                  "-" +
                  getCustomer?.treatment_packages?.[0]?.treatment_package
                    ?.package_name
                : "Will be given by the doctor"}
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
                    selectedId === res.id
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
        </div>
      </div>

      {selectedId && <Outlet context={[id, getCustomer, handlegetUser]} />}
    </>
  );
}

export default CustomerUserDiagnosis;
