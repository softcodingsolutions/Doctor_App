import { useNavigate } from "react-router-dom";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormLabel, Option, Select } from "@mui/joy";

function QueCheckout() {
  const navigate = useNavigate();
  const email = localStorage.getItem("client_email");
  const { register, handleSubmit, reset } = useForm();
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

  const submittedData = async (d) => {
    console.log(d);
    try {
      await axios
        .put(`/api/v2/users/update_personal_details?email=${email}`, {
          personal_detail: {
            family_reasons: JSON.stringify(d),
          },
        })
        .then((res) => {
          console.log("Family History: ", res);
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
      navigate("../complains");
    } catch (error) {
      console.error(error);
    }
    reset();
    navigate("../../customers/all-users");
  };

  useEffect(() => {
    handleGetPackages();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Checkout:-</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
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
                  {...register("package")}
                  name="package"
                  defaultValue="select"
                  sx={{
                    paddingY: 1,
                    paddingX: 2,
                    borderRadius: "md",
                    border: "1px solid black",
                    width: "100%",
                  }}
                >
                  <Option value="select" disabled>
                    Select One
                  </Option>
                  {getPackages.map((pkg) => (
                    <Option key={pkg.value} value={pkg.package_name}>
                      {pkg.package_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="md:flex w-full  justify-between">
                <UserDetailsInput
                  name="FromDate"
                  type="date"
                  label="From Date"
                  placeholder="From date"
                  hook={register("FromDate")}
                />
                <UserDetailsInput
                  name="ToDate"
                  type="date"
                  label="To Date"
                  placeholder="To date"
                  hook={register("ToDate")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="possibilitygroup"
                  type="text"
                  label="Possibility Group"
                  placeholder="NaN"
                  hook={register("possibilitygroup")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="packagevalue"
                  type="text"
                  label="Package Value"
                  placeholder="0"
                  hook={register("packagevalue")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="packagetotal"
                  type="text"
                  label="Package Total"
                  placeholder="0"
                  hook={register("packagetotal")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="discount"
                  type="number"
                  label="Discount"
                  placeholder="0"
                  hook={register("discount")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="grandtotal"
                  type="number"
                  label="Grand Total"
                  placeholder="NaN"
                  hook={register("grandtotal")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <label className="text-lg text-end w-1/8 mr-2">
                  Payment Method:
                </label>
                <Select
                  {...register("payment_method")}
                  name="payment_method"
                  defaultValue="select"
                  sx={{
                    paddingY: 1,
                    paddingX: 2,
                    borderRadius: "md",
                    border: "1px solid black",
                    width: "100%",
                  }}
                >
                  <Option value="select" disabled>
                    Select One
                  </Option>
                  <Option value="online">Online</Option>
                  <Option value="cash">Cash</Option>
                  <Option value="cheque">Select</Option>
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
