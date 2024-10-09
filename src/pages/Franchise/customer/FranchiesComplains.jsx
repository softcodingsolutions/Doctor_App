import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PrevPageButton from "../../../components/Admin/PrevPageButton";

function FranchiesComplains({
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
      .get(`/api/v1/complaints?user_id=${localStorage.getItem("doctor_id")}}`)
      .then((res) => {
        console.log("Complain: ", res.data);
        setGetComplain(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message + "!");
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
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
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
                  value={selectedComplains}
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

                <div className="mt-2">
                  <h3 className="font-semibold">Selected Complains:</h3>
                  <ul className="list-disc list-inside">
                    {selectedComplains.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 mt-5">
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

export default FranchiesComplains;
