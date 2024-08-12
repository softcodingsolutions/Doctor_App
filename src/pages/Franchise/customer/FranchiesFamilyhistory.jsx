import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import Swal from "sweetalert2";
import PrevPageButton from "../../../components/Admin/PrevPageButton";

function FranchiesFamilyhistory({
  onNext,
  onBack,
  onValidate,
  storedData,
  setStoreData,
}) {
  const [getFamily, setGetFamily] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const [selectedFamilyReasons, setSelectedFamilyReasons] = useState([]);

  const submittedData = async (data) => {
    const formData = {
      ...data,
      selected_family_reasons: selectedFamilyReasons,
    };

    setStoreData((prev) => ({
      ...prev,
      familyHistory: formData,
    }));

    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your family history has been saved.",
    });

    onNext();
    reset();
  };

  const handleChange = (event, newValue) => {
    setSelectedFamilyReasons(newValue);
    setValue("selected_family_reasons", newValue, { shouldValidate: true });
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
        alert(err.response?.data?.message + "!");
      });
  };

  useEffect(() => {
    handleGetFamily();

    if (storedData) {
      reset({
        additional_family_reasons: storedData.additional_family_reasons || "",
      });
      setSelectedFamilyReasons(storedData.selected_family_reasons || []);
    }
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex px-4 py-3 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Family History</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
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
                  value={selectedFamilyReasons}
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

export default FranchiesFamilyhistory;
