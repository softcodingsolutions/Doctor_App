import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";

function FranchiesGeneraldetails({
  onNext,
  onValidate,
  setStoreData,
  storedData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });
  const context = useOutletContext();

  const submittedData = async (d) => {
    setStoreData((prev) => ({
      ...prev,
      generalDetails: d,
    }));
    localStorage.setItem('user_selected_language',d.language)
    localStorage.setItem('user_selected_gender',d.gender)
    localStorage.setItem("client_email", d.email);
    localStorage.setItem("doctor_id", context[1]?.created_by_id);

    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your info has been saved.",
    });

    reset();
    onNext();
  };

  useEffect(() => {
    if (storedData) {
      reset({
        firstname: storedData.firstname || "",
        lastname: storedData.lastname || "",
        email: storedData.email || "",
        mobile: storedData.mobile || "",
        address: storedData.address || "",
        refferedBy: storedData.refferedBy || "",
        age: storedData.age || "",
        height: storedData.height || "",
        overweight: storedData.overweight || "select",
        city: storedData.city || "",
        language: storedData.language || "",
        gender: storedData.gender || "select",
        weight: storedData.weight || "",
      });
    }
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="text-xl font-semibold">General Details</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form onSubmit={handleSubmit(submittedData)} method="post">
              <div className="flex gap-10 text-lg">
                <div className="flex flex-col">
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.firstname}
                      name="firstname"
                      type="text"
                      label="First Name"
                      placeholder="firstname"
                      hook={register("firstname", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.lastname}
                      name="lastname"
                      type="text"
                      label="Last Name"
                      placeholder="lastname"
                      hook={register("lastname", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.age}
                      name="age"
                      type="number"
                      label="Age"
                      placeholder="age"
                      hook={register("age")}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      name="address"
                      type="text"
                      label="Address"
                      placeholder="address"
                      hook={register("address")}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.city}
                      name="city"
                      type="text"
                      label="City"
                      placeholder="city"
                      hook={register("city")}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.email}
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="name@email.com"
                      hook={register("email", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.mobile}
                      name="mobile"
                      type="number"
                      label="Phone Number"
                      placeholder="phone number"
                      hook={register("mobile", {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col mt-2  ml-20">
                    <div>
                      <label className="text-sm text-end mr-2">Language:</label>
                      <select
                        name="language"
                        defaultValue="select"
                        placeholder="Select any language"
                        {...register("language")}
                        className="py-1 px-2 rounded-md border border-black text-sm"
                      >
                        <option value="select" disabled>
                          Select Any Language
                        </option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="gujarati">Gujarati</option>
                      </select>
                    </div>
                    <div>
                      {errors.language && (
                        <span className=" text-red-500  text-sm">
                          {errors.language?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 m-5">
                    <div className="flex">
                      <div className="text-end w-1/3 mr-2">
                        <label className="text-sm ">Gender:</label>
                      </div>
                      <div className="flex-col gap-2 w-[21.5rem] ml-8 text-sm">
                        <div className="flex">
                          <div>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="male"
                                {...register("gender")}
                                className="mr-2"
                              />
                              Male
                            </label>
                          </div>
                          <div className="ml-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="female"
                                {...register("gender")}
                                className="mr-2"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                        <div>
                          {errors.gender && (
                            <span className="text-base text-red-500 -mt-1.5 text-sm">
                              {errors.gender?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.height}
                      name="height"
                      type="number"
                      label="Height(cm)"
                      placeholder="height"
                      hook={register("height")}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.weight}
                      name="weight"
                      type="number"
                      label="Weight(Kg)"
                      placeholder="weight"
                      hook={register("weight")}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      name="refferedBy"
                      type="text"
                      label="Reffered By"
                      placeholder="reffered by"
                      hook={register("refferedBy")}
                    />
                  </div>
                  {context[1]?.doctor?.first_name?.toLowerCase() ===
                    "bhavesh" && (
                    <div className="flex gap-5 m-5">
                      <label className="text-sm text-end w-1/3 mr-2">
                        Overweight Since:
                      </label>
                      <select
                        name="overweight"
                        defaultValue="select"
                        placeholder="Select one"
                        {...register("overweight")}
                        className="py-1 px-2 rounded-md border text-sm border-black"
                      >
                        <option value="select" disabled>
                          Select One
                        </option>
                        <option value="1-5">1-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="16-20">16-20 years</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full justify-center mt-8">
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiesGeneraldetails;
