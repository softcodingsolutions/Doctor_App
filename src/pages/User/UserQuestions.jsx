import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../components/User/UserDetailsInput";

function UserQuestions() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const submittedData = (d) => {
    console.log(d);
    reset();
  };

  return (
    <div className="flex w-full p-3">
      <div className="w-full hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2 ">
        <div className="w-full sm:flex items-end">
          <div className="sm:flex-grow flex justify-end ">
            <button
              onClick={context[0]}
              type="button"
              className="block sm:hidden hover:scale-110"
            >
              <img
                src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
                alt=""
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="w-full flex-grow space-y-2.5 overflow-auto flex rounded-lg bg-card h-[94vh] bg-white flex-wrap content-start p-2 px-4">
            <div className="text-xl font-semibold">General Details :-</div>
            <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
              <form
                onSubmit={handleSubmit(submittedData)}
                className="w-[80%] h-full flex flex-col items-center justify-between"
                method="post"
              >
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="firstname"
                    type="text"
                    label="First Name"
                    placeholder="firstname"
                    hook={register("firstname")}
                  />
                  {errors.firstname && (
                    <span className="text-s text-red-500  -mt-2.5">
                      {errors.firstname?.message}
                    </span>
                  )}
                  <UserDetailsInput
                    name="lastname"
                    type="text"
                    label="Last Name"
                    placeholder="lastname"
                    hook={register("lastname")}
                  />
                  {errors.firstname && (
                    <span className="text-s text-red-500  -mt-2.5">
                      {errors.firstname?.message}
                    </span>
                  )}
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="name@email.com"
                    hook={register("email")}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500  -mt-2.5">
                      {errors.email?.message}
                    </span>
                  )}
                  <UserDetailsInput
                    name="mobile"
                    type="text"
                    label="Mobile Number"
                    placeholder="mobile number"
                    hook={register("mobile")}
                  />
                </div>
                {errors.mobile && (
                  <span className="text-sm  text-red-500 -mt-2.5">
                    {errors.mobile?.message}
                  </span>
                )}
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="address"
                    type="text"
                    label="Address"
                    placeholder="address"
                    hook={register("address")}
                  />
                  <UserDetailsInput
                    name="city"
                    type="text"
                    label="City"
                    placeholder="city"
                    hook={register("city")}
                  />
                </div>
                {errors.city && (
                  <span className="text-sm text-red-500 -mt-2.5">
                    {errors.city?.message}
                  </span>
                )}
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    req="required"
                    name="Reffered By"
                    type="text"
                    label="Reffered By"
                    placeholder="reffered by"
                    hook={register("refferedby")}
                  />
                  <UserDetailsInput
                    name="language"
                    type="text"
                    label="Language"
                    placeholder="language"
                    hook={register("language")}
                  />
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="age"
                    type="number"
                    label="Age"
                    placeholder="age"
                    hook={register("Age")}
                  />
                  {errors.age && (
                    <span className="text-sm text-red-500 -mt-2.5">
                      {errors.age?.message}
                    </span>
                  )}
                  <div className="flex px-2 items-center justify-between w-full">
                    <label className="text-lg text-end w-1/3 mr-2">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      placeholder="Select one"
                      {...register("gender")}
                      className="py-1 px-2 rounded-md border border-black w-full"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  {errors.height && (
                    <span className="text-sm text-red-500 -mt-2.5">
                      {errors.height?.message}
                    </span>
                  )}
                </div>
                <div className="md:flex w-full justify-between">
                  <UserDetailsInput
                    name="height"
                    type="number"
                    label="Height(cm)"
                    placeholder="height(cm)"
                    hook={register("height(cm)")}
                  />
                  {errors.height && (
                    <span className="text-sm text-red-500 -mt-2.5">
                      {errors.height?.message}
                    </span>
                  )}
                  <UserDetailsInput
                    name="weight"
                    type="number"
                    label="Weight(Kg)"
                    placeholder="weight(Kg)"
                    hook={register("Weight(Kg)")}
                  />
                  {errors.weight && (
                    <span className="text-sm text-red-500 -mt-2.5">
                      {errors.weight?.message}
                    </span>
                  )}
                </div>
                <div className="">
                  <label className="text-lg text-end w-1/3 mr-2">
                    Overweight Since:
                  </label>
                  <select
                    name="overweight"
                    placeholder="Select one"
                    {...register("overweight")}
                    className="py-1 px-2 rounded-md border border-black"
                  >
                    <option value="1-5">1-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                  </select>
                </div>
                {errors.height && (
                  <span className="text-sm text-red-500 -mt-2.5">
                    {errors.height?.message}
                  </span>
                )}
                <div className="flex w-full justify-center">
                  <SaveUserDetailsButton name="Save & Continue" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserQuestions;
