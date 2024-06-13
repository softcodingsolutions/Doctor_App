import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../../components/User/UserDetailsInput";
import axios from "axios";

function CustomerGeneralDetails({onNext}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

    const submittedData = async (d) => {
      console.log(d);
      try {
        const res = await axios.get(`/api/v1/users/app_creds`);
        await axios.post("/api/v1/users", {
          user: {
            first_name: d.firstname,
            last_name: d.lastname,
            email: d.email,
            phone_number: d.mobile,
            address: d.address,
          },
          personal_detail: {
            city: d.city,
            age: d.age,
            gender: d.gender,
            overweight_since: d.overweight,
            language: d.language,
            reffered_by: d.refferedBy,
            weight: d.weight,
            height: d.height,
            whatsapp_number: d.whatsapp,
          },
          client_id: res.data?.client_id,
        });
        localStorage.setItem("client_email", d.email);
        reset();
        onNext(); 
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4 ">
          <div className="text-xl font-semibold">General Details</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[88%]">
            <form onSubmit={handleSubmit(submittedData)} method="post">
              <div className="flex gap-10">
                <div className="flex flex-col ">
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.firstname}
                      name="firstname"
                      type="text"
                      label="First Name"
                      placeholder="firstname"
                      hook={register("firstname", {
                        required: true,
                        minLength: 2,
                      })}
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
                      errors={errors.lastname}
                      name="lastname"
                      type="text"
                      label="Last Name"
                      placeholder="lastname"
                      hook={register("lastname", {
                        required: true,
                        minLength: 2,
                      })}
                    />
                  </div>
                  <div className="flex gap-5 m-2">
                    <UserDetailsInput
                      errors={errors.mobile}
                      name="mobile"
                      type="text"
                      label="Phone Number"
                      placeholder="phone number"
                      hook={register("mobile", {
                        required: true,
                      })}
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

export default CustomerGeneralDetails;
