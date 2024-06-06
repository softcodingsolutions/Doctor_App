import { useState } from "react";
import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";

function FranchiesFamilyhistory({ onNext, onBack }) {
  const email = localStorage.getItem("client_email");

  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const submittedData = async (d) => {
    d.family_reasons = selectedDiseases;
    console.log(d);
    try {
      await axios
        .put(`/api/v2/users/update_personal_details?email=${email}`, {
          personal_detail: {
            family_reasons: JSON.stringify(d),
          },
        })
        .then((res) => {
          console.log("family history", res);
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedDiseases(newValue);
    setValue("family_reasons", newValue);
    console.log(newValue);
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Family History</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
              method="post"
            >
              <div className="flex flex-col gap-2 justify-between w-full">
                <h2 className="">
                  Choose the disease if any of your family member has or had
                  that disease
                </h2>
                <Select
                  multiple
                  placeholder="Choose..."
                  onChange={handleChange}
                  sx={{
                    minWidth: "13rem",
                  }}
                  slotProps={{
                    listbox: {
                      sx: {
                        width: "100%",
                      },
                    },
                  }}
                >
                  <Option value="hypertension">Hypertension</Option>
                  <Option value="diabetes">Diabetes</Option>
                  <Option value="hypo_throdism">Hypo Throdism</Option>
                  <Option value="pcod">PCOD</Option>
                  <Option value="heart_problem">Heart Problem</Option>
                  <Option value="over_weight">Over Weight</Option>
                </Select>
                <div className="flex flex-col gap-2 mt-10">
                  <label>Family Disease</label>
                  <textarea
                    rows={3}
                    className="border-2 w-full rounded-md p-2"
                    {...register("additional_family_reasons")}
                  />
                  <h2 className="font-semibold text-md">
                    If the disease is not mentioned above, please write them in
                    the box separated by comma (e.g., Diabetes, Heart
                    Problem,...)
                  </h2>
                </div>
              </div>
              <div className="flex w-full justify-center gap-3">
                <button
                  type="button"
                  name="Back"
                  className="w-[20rem] p-1 text-white bg-black rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                  onClick={onBack}
                >
                  Back
                </button>
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiesFamilyhistory;
