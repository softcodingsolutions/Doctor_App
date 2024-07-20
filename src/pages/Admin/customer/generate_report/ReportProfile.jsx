import { useOutletContext } from "react-router-dom";

function ReportProfile() {
  const getCustomer = useOutletContext();

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[82vh] bg-white">
        <div className="flex p-5 h-full flex-col items-center space-y-8">
          <div className="flex flex-col text-lg font-bold justify-center w-5/6 gap-3 mt-1">
            <div className="flex justify-between">
              <div>
                Patient Name:{" "}
                {getCustomer[1]?.first_name + " " + getCustomer[1]?.last_name}
              </div>
              <div>Case Number: {getCustomer[1]?.case_number}</div>
            </div>
            <div className="flex justify-between">
              <div>
                Gender:{" "}
                {getCustomer[1]?.personal_detail &&
                  getCustomer[1]?.personal_detail?.gender[0]?.toUpperCase() +
                    getCustomer[1].personal_detail?.gender?.substring(1)}
              </div>
              <div>
                Customer Type:{" "}
                {getCustomer[1]?.role?.charAt(0).toUpperCase() +
                  getCustomer[1]?.role?.slice(1) ?? "null"}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Age: {getCustomer[1]?.personal_detail?.age}</div>
              <div>
                Date:{" "}
                {getCustomer[1]?.personal_detail?.created_at?.slice(0, 10)}
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                Current Weight: {getCustomer[1]?.personal_detail?.weight} kg
              </div>
              <div>Height: {getCustomer[1]?.personal_detail?.height} cm</div>
            </div>
            <div className="flex justify-between">
              <div>
                Package:{" "}
                {getCustomer[1]?.personal_detail?.package?.package_name}
              </div>
              <div>
                Treatment Name:{" "}
                {
                  getCustomer[1]?.treatment_packages?.[0]?.treatment_package
                  ?.weight_reason + "-" + getCustomer[1]?.treatment_packages?.[0]?.treatment_package
                    ?.package_name
                }
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                Registration Through:{" "}
                {getCustomer[1]?.creator === "super_admin"
                  ? "Admin"
                  : "Franchise"}
              </div>
              <div>Email: {getCustomer[1]?.email}</div>
            </div>
            <div className="flex justify-between">
              <div>Phone Number: {getCustomer[1]?.phone_number}</div>
              <div>
                Whatsapp Number:{" "}
                {getCustomer[1]?.personal_detail?.whatsapp_number}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportProfile;
