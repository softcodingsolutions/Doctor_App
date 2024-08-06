import { useOutletContext } from "react-router-dom";

function ReportProfile() {
  const getCustomer = useOutletContext();

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[82vh] bg-white">
        <div className="flex p-5 h-full flex-col items-center">
          <div className="flex w-4/5 justify-between text-lg font-semibold mt-1">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">
                  Patient Name:
                </div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.first_name + " " + getCustomer[1]?.last_name}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">Gender:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail &&
                    getCustomer[1]?.personal_detail?.gender[0]?.toUpperCase() +
                      getCustomer[1].personal_detail?.gender?.substring(1)}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">Age:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail?.age}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">
                  Current Weight:
                </div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail?.weight} kg
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">Package:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.user_packages?.[0]?.package_name ?? "Null"}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right ">Registration Through:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.creator === "doctor"
                    ? "Doctor"
                    : "Franchise"}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-2/3 text-right break-words">
                  Phone Number:
                </div>
                <div className="w-1/2 pl-3">{getCustomer[1]?.phone_number}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">Case Number:</div>
                <div className="w-1/2 pl-3">{getCustomer[1]?.case_number}</div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">
                  Customer Type:
                </div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.role?.charAt(0).toUpperCase() +
                    getCustomer[1]?.role?.slice(1) ?? "null"}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">Date:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail?.created_at?.slice(0, 10)}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">Height:</div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail?.height} cm
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">
                  Treatment Name:
                </div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.treatment_packages?.[0]?.treatment_package
                    ?.weight_reason
                    ? getCustomer[1]?.treatment_packages?.[0]?.treatment_package
                        ?.weight_reason +
                      "-" +
                      getCustomer[1]?.treatment_packages?.[0]?.treatment_package
                        ?.package_name
                    : "Null"}
                </div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">Email:</div>
                <div className="w-1/2 pl-3">{getCustomer[1]?.email}</div>
              </div>
              <div className="flex justify-between w-[25rem]">
                <div className="w-1/2 text-right break-words">
                  Whatsapp Number:
                </div>
                <div className="w-1/2 pl-3">
                  {getCustomer[1]?.personal_detail?.whatsapp_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportProfile;
