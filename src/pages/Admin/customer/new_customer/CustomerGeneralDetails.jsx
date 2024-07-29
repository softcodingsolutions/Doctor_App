import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../../components/User/UserDetailsInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { Option, Select } from "@mui/joy";

function CustomerGeneralDetails({ onNext, onValidate }) {
  const [getAdmin, setGetAdmin] = useState([]);
  const [getDoctors, setGetDoctors] = useState([]);
  const [getDoctorId, setGetDoctorId] = useState("");
  const [doctorError, setDoctorError] = useState(false);
  const role = localStorage.getItem("role");
  const main_id = localStorage.getItem("main_id");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserSchema),
    mode: "onChange",
  });

  const handleGetAdmin = () => {
    axios
      .get(`/api/v2/users/search?id=${main_id}`)
      .then((res) => {
        console.log(res.data?.user);
        setGetAdmin(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleGetDoctors = () => {
    axios
      .get(`/api/v1/users`)
      .then((res) => {
        console.log(
          "Doctors: ",
          res.data?.users?.filter((user) => user.role === "doctor")
        );
        setGetDoctors(
          res.data?.users?.filter((user) => user.role === "doctor")
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const submittedData = async (d) => {
    if (role === "super_admin" && !getDoctorId) {
      setDoctorError(true);
      return;
    }

    console.log(d);
    try {
      const res = await axios.get(`/api/v1/users/app_creds`);
      if (role === "doctor") {
        await axios.post("/api/v1/users", {
          user: {
            first_name: d.firstname,
            last_name: d.lastname,
            email: d.email,
            phone_number: d.mobile,
            created_by_id: getAdmin.id,
            creator: getAdmin.role,
          },
          personal_detail: {
            city: d.city,
            age: d.age,
            address: d.address,
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
        localStorage.setItem("doctor_id", getAdmin.id);
      } else if (role === "super_admin") {
        await axios.post("/api/v1/users", {
          user: {
            first_name: d.firstname,
            last_name: d.lastname,
            email: d.email,
            phone_number: d.mobile,
            created_by_id: getDoctorId,
            creator: "doctor",
          },
          personal_detail: {
            city: d.city,
            age: d.age,
            address: d.address,
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
        localStorage.setItem("doctor_id", getDoctorId);
      }

      localStorage.setItem("client_email", d.email);

      reset();
      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAdmin();
    handleGetDoctors();
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">General Details</div>
            {role === "super_admin" && (
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">Select Doctor:</div>
                <Select
                  placeholder="Select"
                  value={getDoctorId}
                  onChange={(e, newValue) => {
                    setGetDoctorId(newValue);
                    setDoctorError(false);
                  }}
                >
                  {getDoctors?.map((res) => {
                    return (
                      <Option key={res.id} value={res.id}>
                        {res.first_name + " " + res.last_name}
                      </Option>
                    );
                  })}
                </Select>
                {doctorError && (
                  <span className="text-base text-red-500">
                    Please select a doctor.
                  </span>
                )}
              </div>
            )}
          </div>
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
                      defaultValue="select"
                      placeholder="Select one"
                      {...register("overweight")}
                      className="py-1 px-2 rounded-md border border-black"
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
                </div>
                <div className="flex flex-col">
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
                        <span className="text-base text-red-500 -mt-1.5">
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

export default CustomerGeneralDetails;
