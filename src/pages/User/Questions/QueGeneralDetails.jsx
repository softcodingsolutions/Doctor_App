import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { Textarea } from "@headlessui/react";

function QueGeneralDetails({ onNext, onValidate, setStoreData, storedData }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserSchema),
    mode: "onChange",
  });
  const doctorName = localStorage.getItem("doctorFirstName");

  const submittedData = (d) => {
    setStoreData((prev) => ({
      ...prev,
      generalDetails: d,
    }));
    localStorage.setItem("user_selected_language", d.language);
    localStorage.setItem("user_selected_gender", d.gender);
    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your info has been saved.",
    });

    onNext();
    reset();
  };

  useEffect(() => {
    console.log("Effect ran with storedData:", storedData);
    if (storedData) {
      reset({
        firstname: storedData?.firstname || "",
        lastname: storedData?.lastname || "",
        email: storedData?.email || "",
        mobile: storedData?.mobile || "",
        address: storedData?.address || "",
        refferedBy: storedData?.refferedBy || "",
        age: storedData?.age || "",
        height: storedData?.height || "",
        overweight: storedData?.overweight || "select",
        city: storedData?.city || "",
        language: storedData?.language || "",
        gender: storedData?.gender || "select",
        weight: storedData?.weight || "",
      });
    } else {
      console.log("Stored data is not available");
    }
  }, [storedData, reset]);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start ">
      <div className="w-full sm:flex items-end">
       
        <div className="w-full flex-grow gap-1 overflow-auto flex rounded-lg bg-card h-[88vh]   flex-wrap content-start p-2 px-4">
          <div className="text-xl font-semibold p-2 text-[#1F2937]">General Details </div>
          <div className="w-full flex justify-center border rounded-md animate-once animate-ease-out overflow-auto p-4">
            <form onSubmit={handleSubmit(submittedData)} method="post" className="w-full flex justify-center flex-col ">
              <div className={`flex'flex-col text-lg`}>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                  <div className="flex flex-col w-full">
                    {/* first name */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.firstname}
                        name="firstname"
                        type="text"
                        label="First Name"
                        placeholder=""
                        hook={register("firstname", {
                          required: true,
                        })}
                      />
                    </div>
                    {/* age */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.age}
                        name="age"
                        type="number"
                        label="Age"
                        placeholder=""
                        hook={register("age")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    {/* last name */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.lastname}
                        name="lastname"
                        type="text"
                        label="Last Name"
                        placeholder=""
                        hook={register("lastname", {
                          required: true,
                        })}
                      />
                    </div>
                    {/* language */}
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}  gap-16`}>
                      <div className="flex flex-col m-2">
                        <label className="text-sm text-[#1F2937] font-semibold mr-2">Language:</label>
                        <div className="flex gap-2 mt-2">
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              value="english"
                              {...register("language", { required: "Please select a language" })}
                              className="mr-2 "
                            />
                            English
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              value="hindi"
                              {...register("language")}
                              className="mr-2"
                            />
                            Hindi
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              value="gujarati"
                              {...register("language")}
                              className="mr-2"
                            />
                            Gujarati
                          </label>
                        </div>
                        {errors.language && (
                          <span className="text-red-500 text-sm">{errors.language?.message}</span>
                        )}
                      </div>
                      {/* gender */}
                      <div className="flex flex-col m-2">
                        {/* gender */}
                        <label className="text-sm text-[#1F2937] font-semibold mr-2">Gender:</label>
                        <div className="flex gap-2 mt-2">
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              value="male"
                              {...register("gender")}
                              className="mr-2 text-sm"
                            />
                            Male
                          </label>
                          <label className="flex items-center   text-sm">
                            <input
                              type="radio"
                              value="female"
                              {...register("gender")}
                              className="mr-2 text-sm"
                            />
                            Female
                          </label>
                          {errors.gender && (
                            <span className="text-base text-red-500 -mt-1.5">
                              {errors.gender?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
            
                </div>
                
                {/* address */}
                <div className="flex flex-col  m-2">
                  {/* <UserDetailsInput
                    name="address"
                    type="text"
                    label="Address"
                    placeholder="address"
                    hook={register("address")}
                  /> */}
                  <label className="text-sm text-[#1F2937] font-semibold mr-2">Address:</label>
                  <Textarea
                    hook={register("address")}
                    type="textarea"
                    name="address"
                    placeholder=""
                    autoComplete="off"
                    rows={3}
                    className="py-1 px-2 rounded-md border  w-full text-sm"
                  >
                    </Textarea>
                </div>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                  <div className="flex flex-col w-full">
                    {/* city */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.city}
                        name="city"
                        type="text"
                        label="City"
                        placeholder=""
                        hook={register("city")}
                      />
                    </div>
                    {/* email */}
                    <div className="flex flex-col  m-2">
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
                    {/* refferedby */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        name="refferedBy"
                        type="text"
                        label="Reffered By"
                        placeholder=""
                        hook={register("refferedBy")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    {/* mobile */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.mobile}
                        name="mobile"
                        type="number"
                        label="Phone Number"
                        placeholder="00 000 000 00"
                        hook={register("mobile", {
                          required: true,
                        })}
                      />
                    </div>

                    {/* height */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.height}
                        name="height"
                        type="number"
                        label="Height(cm)"
                        placeholder=""
                        hook={register("height")}
                      />
                    </div>
                    {/* weight */}
                    <div className="flex flex-col  m-2">
                      <UserDetailsInput
                        errors={errors.weight}
                        name="weight"
                        type="number"
                        label="Weight(Kg)"
                        placeholder=""
                        hook={register("weight")}
                      />
                    </div>
                  </div>
                </div>
                {/* overweight */}
                {doctorName?.toLowerCase() === "bhavesh" && (
                  <div className="flex flex-col ">
                    <label className="text-sm text-[#1F2937] font-semibold mr-2">
                      Overweight Since:
                    </label>
                    <select
                      name="overweight"
                      defaultValue="select"
                      placeholder="Select one"
                      {...register("overweight")}
                      className="py-1 px-2 rounded-md text-sm border  "
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

              <div className="flex w-full justify-center mt-3">
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueGeneralDetails;
