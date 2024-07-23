import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { useEffect, useState } from "react";

function FranchiesComplains({ onNext, onBack, onValidate }) {
  const email = localStorage.getItem("client_email");
  const [getComplain, setGetComplain] = useState([]);
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
    console.log(d);
    try {
      await axios
        .put(`/api/v2/users/update_personal_details?email=${email}`, {
          personal_detail: {
            complaints: JSON.stringify(d),
          },
        })
        .then((res) => {
          console.log(res);
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
    setValue("selected_complains", newValue);
    console.log(newValue);
  };

  const handleGetComplain = () => {
    axios
      .get("/api/v1/complaints")
      .then((res) => {
        console.log("Complain: ", res.data);
        setGetComplain(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    handleGetComplain();
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Complains</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
              method="post"
            >
              <div className="flex flex-col gap-2 justify-between w-full">
                <h2>
                  Choose the complain below if you have any of your complain is
                  mentioned.
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
                  {getComplain.map((res) => {
                    return (
                      <Option key={res.id} value={res.details}>
                        {res.details}
                      </Option>
                    );
                  })}
                </Select>
                <div className="flex flex-col gap-2 mt-10">
                  <label>Other Complain:</label>
                  <textarea
                    rows={3}
                    className="border-2 w-full rounded-md p-2"
                    {...register("additional_complains")}
                  />
                  <h2 className="font-semibold text-md">
                    If your complain is not mentioned, write it in box.
                  </h2>
                </div>
              </div>
              <div className="flex w-full justify-center gap-3">
                <button
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

export default FranchiesComplains;
