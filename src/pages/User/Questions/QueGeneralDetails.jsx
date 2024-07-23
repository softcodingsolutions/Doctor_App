import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import axios from "axios";
import { useEffect } from "react";

function QueGeneralDetails({ user, onNext, onValidate }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const submittedData = (d) => {
    console.log(d);
    axios
      .get(
        `/api/v1/users/find_user?access_token=${localStorage.getItem(
          "access_token"
        )}`
      )
      .then(async (res) => {
        console.log(res);

        await axios
          .put(
            `/api/v2/users/update_personal_details?email=${localStorage.getItem(
              "client_email"
            )}`,
            {
              personal_detail: {
                city: d.city,
                age: d.age,
                gender: d.gender,
                overweight_since: d.overweight,
                language: d.language,
                reffered_by: d.refferedBy,
                weight: d.weight,
                height: d.height,
                address: d.address,
                whatsapp_number: d.whatsapp,
              },
              client_id: res.data?.client_id,
            }
          )
          .then((res) => {
            console.log(res);
            onNext();
          });
      });
    reset();
  };

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className=" flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2 ">
      <div className="w-full sm:flex items-end">
        <div className="sm:flex-grow flex justify-end ">
          <button type="button" className="block sm:hidden hover:scale-110">
            <img
              src={`https://assets.codepen.io/3685267/res-react-dash-sidebar-open.svg`}
              alt=""
              className="w-full h-full"
            />
          </button>
        </div>
        <div className="w-full flex-grow gap-1 overflow-auto flex rounded-lg bg-card h-[94vh] bg-white flex-wrap content-start p-2 px-4">
          <div className="text-xl font-semibold">General Details :-</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form onSubmit={handleSubmit(submittedData)} method="post">
              <div className="flex gap-10">
                <div className="flex flex-col ">
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.firstname}
                      defaultValue={user.first_name}
                      name="firstname"
                      type="text"
                      label="First Name"
                      placeholder="firstname"
                      hook={register("firstname", {
                        required: true,
                      })}
                      setValue={setValue}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.email}
                      name="email"
                      type="email"
                      label="Email"
                      defaultValue={user.email}
                      placeholder="name@email.com"
                      hook={register("email", {
                        required: true,
                      })}
                      setValue={setValue}
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
                      name="refferedBy"
                      type="text"
                      label="Reffered By"
                      placeholder="reffered by"
                      hook={register("refferedBy")}
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
                      errors={errors.height}
                      name="height"
                      type="number"
                      label="Height(cm)"
                      placeholder="height"
                      hook={register("height")}
                    />
                  </div>
                  <div className="flex gap-5 m-5">
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
                </div>
                <div className="flex flex-col ">
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      defaultValue={user.last_name}
                      errors={errors.lastname}
                      name="lastname"
                      type="text"
                      label="Last Name"
                      placeholder="lastname"
                      hook={register("lastname", {
                        required: true,
                      })}
                      setValue={setValue}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.mobile}
                      defaultValue={user.phone_number}
                      name="mobile"
                      type="number"
                      label="Phone Number"
                      placeholder="phone number"
                      hook={register("mobile", {
                        required: true,
                      })}
                      setValue={setValue}
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
                      name="language"
                      type="text"
                      label="Language"
                      placeholder="language"
                      hook={register("language")}
                    />
                  </div>
                  <div className="flex gap-5 m-5">
                    <label className="text-lg text-end w-1/3 mr-2">
                      Gender:
                    </label>
                    <div className="flex flex-col gap-2">
                      <select
                        name="gender"
                        defaultValue="select"
                        {...register("gender")}
                        className="py-1 px-2 rounded-md border border-black w-[40vh]"
                      >
                        <option value="select" disabled>
                          Select One
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <span className="text-sm  text-red-500 -mt-2.5">
                          {errors.gender?.message}
                        </span>
                      )}
                    </div>
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
                      errors={errors.whatsapp}
                      name="whatsapp"
                      type="number"
                      label="Whatsapp Number"
                      placeholder="whatsapp number"
                      hook={register("whatsapp")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center mt-12">
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
