import axios from "axios";
import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import { Option, Select } from "@mui/joy";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function UserComplains({
  onNext,
  onBack,
  onValidate,
  storedData,
  setStoreData,
}) {
  const [getComplain, setGetComplain] = useState([]);
  const [selectedComplains, setSelectedComplains] = useState([]);
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
    const formData = {
      ...d,
      selected_complains: selectedComplains,
    };

    setStoreData((prev) => ({
      ...prev,
      complains: formData,
    }));

    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your complains has been saved.",
    });
    onNext();
    reset();
  };

  const handleChange = (event, newValue) => {
    setSelectedComplains(newValue);
    setValue("selected_complains", newValue, { shouldValidate: true });
  };

  const handleGetComplain = () => {
    axios
      .get(`/api/v1/complaints?user_id=${localStorage.getItem("doctor_id")}`)
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

    if (storedData) {
      reset({
        additional_complains: storedData.additional_complains || "",
      });
      setSelectedComplains(storedData.selected_complains || []);
    }
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-4">
      <div className="rounded-lg bg-card h-[84vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Complains</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between text-lg"
              method="post"
            >
              <div className="flex flex-col gap-2 justify-between w-full">
                <h2 className="">
                  Choose the complain below if you have any of your complain is
                  mentioned:
                </h2>
                <Select
                  placeholder="Choose..."
                  multiple
                  onChange={handleChange}
                  value={selectedComplains}
                  sx={{
                    maxWidth: "72rem",
                  }}
                  slotProps={{
                    listbox: {
                      sx: {
                        width: "100%",
                      },
                    },
                  }}
                >
                  {" "}
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

export default UserComplains;
