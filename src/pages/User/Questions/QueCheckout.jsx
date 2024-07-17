import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormLabel, Option, Select } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function QueCheckout() {
  const navigate = useNavigate();
  const email = localStorage.getItem("client_email");
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [getPackages, setGetPackages] = useState([]);

  const handleGetPackages = () => {
    axios
      .get("/api/v1/user_packages")
      .then((res) => {
        console.log(res.data);
        setGetPackages(res.data?.user_packages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetPrice = (name) => {
    const packageDetail = getPackages.find(
      (pack) => pack.package_name === name
    );

    if (packageDetail) {
      setValue("package_value", packageDetail.package_price);
      setValue("package_total", packageDetail.package_price);
      setValue("grand_total", packageDetail.package_price);
    }
  };

  const calculateGrandTotal = (packagePrice, discount) => {
    const discountAmount = (packagePrice * discount) / 100;
    return packagePrice - discountAmount;
  };

  const watchDiscount = watch("discount", 0);
  const watchPackagePrice = watch("package_total", 0);

  useEffect(() => {
    const newGrandTotal = calculateGrandTotal(watchPackagePrice, watchDiscount);
    setValue("grand_total", newGrandTotal);
  }, [watchDiscount, watchPackagePrice, setValue]);

  const submittedData = async (d) => {
    console.log(d);
    try {
      await axios
        .put(`/api/v2/users/update_personal_details?email=${email}`, {
          personal_detail: {
            package: JSON.stringify(d),
          },
        })
        .then((res) => {
          console.log("Checkout: ", res);
          localStorage.removeItem("client_email");
          navigate("../../admin/customers/all-users");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Checkout:- </div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
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
                      key={pkg.value}
                      onClick={() => handleGetPrice(pkg.package_name)}
                      value={pkg.package_name}
                    >
                      {pkg.package_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="md:flex w-full  justify-between">
                <UserDetailsInput
                  name="from_date"
                  type="date"
                  label="From Date"
                  placeholder="From date"
                  hook={register("from_date")}
                />
                <UserDetailsInput
                  name="to_date"
                  type="date"
                  label="To Date"
                  placeholder="To date"
                  hook={register("to_date")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="possibility_group"
                  type="text"
                  label="Possibility Group"
                  placeholder="NaN"
                  hook={register("possibility_group")}
                />
              </div>
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
              <div className="flex w-full justify-center gap-2">
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
