import { Option, Select } from "@mui/joy";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function UserFamilyHistory({ onNext, onBack, onValidate }) {
  const [getFamily, setGetFamily] = useState([]);
  const email = localStorage.getItem("client_email");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const submittedData = async (d) => {
    console.log("Family History: ", d);
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
          alert(err.message);
        });
      reset();
      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue("selected_family_reasons", newValue);
    console.log(newValue);
  };

  const handleGetFamily = () => {
    axios
      .get(
        `/api/v1/family_reasons?user_id=${localStorage.getItem("doctor_id")}`
      )
      .then((res) => {
        console.log("Family Reason: ", res.data?.family_reasons);
        setGetFamily(res.data?.family_reasons);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handleGetFamily();
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full">
      <div className="rounded-lg bg-card h-[84vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Family History</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between text-lg"
              method="post"
            >
              <div className="flex flex-col gap-2 justify-between w-full">
                <h2>
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
                  {getFamily.map((res) => {
                    return (
                      <Option key={res.id} value={res.details_in_english}>
                        {res.details_in_english}
                      </Option>
                    );
                  })}
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

export default UserFamilyHistory;
