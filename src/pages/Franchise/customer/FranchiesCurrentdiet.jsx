import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrentDietSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useEffect } from "react";
import Swal from "sweetalert2";
import PrevPageButton from "../../../components/Admin/PrevPageButton";

function FranchiesCurrentdiet({
  onNext,
  onBack,
  onValidate,
  storedData,
  setStoreData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CurrentDietSchema),
  });

  const submittedData = async (d) => {
    setStoreData((prev) => ({
      ...prev,
      diet: d,
    }));

    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your diet has been saved.",
    });
    onNext();
    reset();
  };

  useEffect(() => {
    if (storedData) {
      reset({
        Morning: storedData.Morning || "",
        MidMorning: storedData.MidMorning || "",
        Lunch: storedData.Lunch || "",
        MidAfternoon: storedData.MidAfternoon || "",
        Evening: storedData.Evening || "",
        Dinner: storedData.Dinner || "",
        PostDinner: storedData.PostDinner || "",
      });
    }
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Current Diet</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
              method="post"
            >
              <div>
                Enter all your meal details from Breakfast to Dinner <br />
                સવારથી સાંજની બધી ખાવા-પીવાની આદત ભરો
              </div>
              <div className="flex flex-col gap-10 justify-between w-full">
                <h2 className="text-[red]">YOUR LAST WEEK DIET....</h2>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    errors={errors.Morning}
                    name="Morning"
                    type="text"
                    label="Morning** "
                    hook={register("Morning", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    name="MidMorning"
                    type="text"
                    label="Mid Morning "
                    hook={register("MidMorning", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    errors={errors.Lunch}
                    name="Lunch"
                    type="text"
                    label="Lunch** "
                    hook={register("Lunch", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    name="MidAfternoon"
                    type="text"
                    label="Mid Afternoon"
                    hook={register("MidAfternoon", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="Evening"
                    type="text"
                    label="Evening "
                    hook={register("Evening", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    errors={errors.Dinner}
                    name="Dinner"
                    type="text"
                    label="Dinner** "
                    hook={register("Dinner", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="PostDinner"
                    type="text"
                    label="Post Dinner"
                    hook={register("PostDinner", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <div className="invisible ml-40">
                    <label className="text-lg text-end w-1/3 mr-2"></label>
                    <div className="flex flex-col">
                      <input className="py-1 px-2 rounded-md border border-black w-[40vh]" />
                    </div>
                  </div>
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

export default FranchiesCurrentdiet;
