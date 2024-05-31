import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrentDietSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";

function FranchiesCurrentdiet() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CurrentDietSchema),
  });
  const submittedData = async (d) => {
    console.log(d);
    navigate("../family-history");
    try {
      // Add API call to save diet details
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate("../general-details");
  };
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Current Diet</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
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
                    label="Morning ** "
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
                    label="Lunch ** "
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
                    label="Dinner ** "
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
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center gap-3">
                <button
                  type="button"
                  className="w-[20rem] p-1 text-white bg-black rounded-md border border-gray-500 font-medium text-lg hover:scale-105"
                  onClick={handleBack}
                >
                  Back
                </button>
                <SaveUserDetailsButton name="Save & Continue"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiesCurrentdiet;
