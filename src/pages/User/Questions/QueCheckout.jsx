import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormLabel, Option, Select } from "@mui/joy";
import PrevPageButton from "../../../components/Admin/PrevPageButton";

function QueCheckout({ setStoreData, onBack, handleCallUserApi }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [getPackages, setGetPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleGetPackages = () => {
    axios
      .get(
        `/api/v1/payment_packages?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log(res.data);
        setGetPackages(res.data?.payment_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
      });
  };

  const handleGetPrice = (name) => {
    const packageDetail = getPackages.find((pack) => pack.name === name);
    console.log("Package", packageDetail);

    if (packageDetail) {
      const today = new Date();
      const fromDate = today.toISOString().split("T")[0];
      const toDate = new Date();
      toDate.setDate(today.getDate() + packageDetail.duration);
      const toDateString = toDate.toISOString().split("T")[0];

      setValue("package_value", packageDetail.price);
      setValue("package_total", packageDetail.price);
      setValue("grand_total", packageDetail.price);
      setValue("from_date", fromDate);
      setValue("to_date", toDateString);
      setValue("duration", packageDetail.duration);

      setSelectedPackage(packageDetail);
    }
  };

  const calculateGrandTotal = (packagePrice, discount) => {
    const discountAmount = (packagePrice * discount) / 100;
    return packagePrice - discountAmount;
  };

  const watchDiscount = watch("discount", 0);
  const watchPackagePrice = watch("package_total", 0);
  const watchFromDate = watch("from_date");

  useEffect(() => {
    const newGrandTotal = calculateGrandTotal(watchPackagePrice, watchDiscount);
    setValue("grand_total", newGrandTotal);
  }, [watchDiscount, watchPackagePrice, setValue]);

  useEffect(() => {
    if (selectedPackage && watchFromDate) {
      const fromDate = new Date(watchFromDate);
      console.log("From Date:", fromDate);
      const toDate = new Date(fromDate);
      toDate.setDate(fromDate.getDate() + Number(selectedPackage.duration));
      const toDateString = toDate.toISOString().split("T")[0];
      setValue("to_date", toDateString);
    }
  }, [watchFromDate, selectedPackage, setValue]);

  const submittedData = async (d) => {
    console.log(d);
    setStoreData((prev) => ({
      ...prev,
      checkout: d,
    }));
    handleCallUserApi(d);
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Checkout:- </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[90%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between text-lg"
              method="post"
            >
              <div className="md:flex w-full justify-between gap-2">
                <FormLabel
                  sx={{
                    fontSize: "1.125rem",
                    textAlign: "end",
                    marginBottom: 1,
                  }}
                >
                  Package:
                </FormLabel>
                <Select
                  {...register("package_name")}
                  name="package_name"
                  required
                  placeholder="Select Package"
                  sx={{
                    paddingY: 1,
                    paddingX: 2,
                    borderRadius: "md",
                    border: "1px solid black",
                    width: "100%",
                  }}
                >
                  {getPackages.map((pkg) => (
                    <Option
                      key={pkg.id}
                      onClick={() => handleGetPrice(pkg.name)}
                      value={pkg.name}
                    >
                      {pkg.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="md:flex w-full  justify-between">
                <>
                  <label className="text-lg text-end w-1/3 mr-2">
                    From Date:
                  </label>
                  <input
                    {...register("from_date")}
                    type="date"
                    name="from_date"
                    placeholder="From date"
                    autoComplete="off"
                    id="from_date"
                    className="py-1 px-2 rounded-md border border-black w-[40vh]"
                  />
                </>
                <>
                  <label className="text-lg text-end w-1/3 mr-2">
                    To Date:
                  </label>
                  <input
                    {...register("to_date")}
                    type="date"
                    name="to_date"
                    placeholder="To date"
                    autoComplete="off"
                    id="to_date"
                    className="py-1 px-2 rounded-md border border-black w-[40vh]"
                  />
                </>
              </div>
              {/* <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="possibility_group"
                  type="text"
                  label="Possibility Group"
                  placeholder="NaN"
                  hook={register("possibility_group")}
                />
              </div> */}
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="package_value"
                  type="text"
                  label="Package Value"
                  placeholder="NaN"
                  hook={register("package_value")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="package_total"
                  type="text"
                  label="Package Total"
                  placeholder="NaN"
                  hook={register("package_total")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="discount"
                  type="number"
                  label="Discount"
                  placeholder="In Percentage"
                  hook={register("discount")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="grand_total"
                  type="number"
                  label="Grand Total"
                  placeholder="NaN"
                  hook={register("grand_total")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <label className="text-lg text-end w-1/8 mr-2">
                  Payment Method:
                </label>
                <Select
                  required
                  {...register("payment_method")}
                  name="payment_method"
                  placeholder="Select Method"
                  sx={{
                    paddingY: 1,
                    paddingX: 2,
                    borderRadius: "md",
                    border: "1px solid black",
                    width: "100%",
                  }}
                >
                  <Option value="online">Online</Option>
                  <Option value="cash">Cash</Option>
                </Select>
              </div>
              <div className="md:flex w-full justify-between gap-2">
                <label>Note: </label>
                <textarea
                  rows={3}
                  className="border-2 border-black w-full p-2 rounded-md"
                />
              </div>
              <div className="flex w-full justify-center gap-3 mt-2">
                <PrevPageButton back={onBack} />
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueCheckout;
