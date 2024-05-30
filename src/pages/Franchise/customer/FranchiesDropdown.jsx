import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import axios from "axios";

function FranchiesDropdown() {
  const context = useOutletContext();
  const navigate = useNavigate();
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
    navigate("../current-diet")
    axios.get(`/api/v1/users/app_creds`).then((res) => {
      console.log(res);
      axios
        .post("/api/v1/users", {
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
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("client_email", res.data?.user?.user?.email)
          navigate("../current-diet");
        });
    });
    reset();
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">General Details :-</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
              method="post"
            >
              <div className="md:flex w-full justify-between">
              <label className="text-lg text-end w-1/8 mr-2">Package:</label>
                  <select
                    name="gender"
                    defaultValue="select"
                    className="py-1 px-2 rounded-md border border-black w-full"
                  >
                    <option value="select" disabled>
                      Select One
                    </option>
                    <option value="Franchisee_package">FRANCHISEE PACKAGE</option>
                    <option value="mh-b-2">MH-B-2</option>
                    <option value="mh-c-3">MH-C-3</option>
                    <option value="mh-f-6">MH-F-6</option>
                    <option value="anand 30">Anand 30</option>
                    <option value="anand 60">Anand 60</option>
                    <option value="anand 120">Anand 120</option>
                    <option value="anand od">Anand OD</option>
                    <option value="mh-outdoor">MH-OUTDOOR</option>
                    <option value="mh-a-1">MH-A-1</option>
                </select>
              </div>
              <div className="md:flex w-full justify-between">
              <UserDetailsInput
                  name="FromDate"
                  type="date"
                  label="From Date"
                  placeholder="From date"
                  hook={register("fromdate")}
                />
            <label>Validate</label>
            <div className="border-2 w-20 rounded border-black"></div>
            <UserDetailsInput
                  name="ToDate"
                  type="date"
                  label="To Date"
                  placeholder="To date"
                  hook={register("todate")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="possibilitygroup"
                  type="text"
                  label="Possibility Group"
                  placeholder="NaN"
                  hook={register("possibilitygroup")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="packagevalue"
                  type="text"
                  label="Package Value"
                  placeholder="0"
                  hook={register("packagevalue")}
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
                  errors={errors.age}
                  name="age"
                  type="number"
                  label="Age"
                  placeholder="age"
                  hook={register("age")}
                />
                <div className="flex px-2 items-center justify-between w-full">
                  <label className="text-lg text-end w-1/3 mr-2">Gender:</label>
                  <select
                    name="gender"
                    defaultValue="select"
                    {...register("gender")}
                    className="py-1 px-2 rounded-md border border-black w-full"
                  >
                    <option value="select" disabled>
                      Select One
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                {errors.gender && (
                  <span className="text-sm  text-red-500 -mt-2.5">
                    {errors.gender?.message}
                  </span>
                )}
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  errors={errors.height}
                  name="height"
                  type="number"
                  label="Height(cm)"
                  placeholder="height"
                  hook={register("height")}
                />

                <UserDetailsInput
                  errors={errors.weight}
                  name="weight"
                  type="number"
                  label="Weight(Kg)"
                  placeholder="weight"
                  hook={register("weight")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <label className="text-lg">Overweight Since:</label>
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
                <UserDetailsInput
                  errors={errors.whatsapp}
                  name="whatsapp"
                  type="number"
                  label="Whatsapp Number"
                  placeholder="whatsapp number"
                  hook={register("whatsapp")}
                />
              </div>
              <div className="flex w-full justify-center">
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiesDropdown;
