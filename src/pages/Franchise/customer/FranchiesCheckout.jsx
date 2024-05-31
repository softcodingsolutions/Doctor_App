import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import axios from "axios";

function FranchiesCheckout() {
  const context = useOutletContext();
//   const [packages,setPackages] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submittedData = (d) => {
    console.log(d);
    // navigate("../current-diet")
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
          // navigate("../current-diet");
        });
    });
    reset();
  };

  const handleBack = () =>{
    navigate('../diagnosis')
  }
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex p-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold">Checkout:-</div>
          <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center justify-between"
              method="post"
            >
              <div className="md:flex w-full justify-between">
              <label className="text-lg text-end w-1/8 mr-2">Package:</label>
                  <select
                    name="package"
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
              <div className="md:flex w-full  justify-between">
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
              </div>
              <div className="md:flex w-full justify-between">
              <UserDetailsInput
                  name="packagetotal"
                  type="text"
                  label="Package Total"
                  placeholder="0"
                  hook={register("packagetotal")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="discount"
                  type="number"
                  label="Discount"
                  placeholder="0"
                  hook={register("discount")}
                />
              </div>
              <div className="md:flex w-full justify-between">
                <UserDetailsInput
                  name="grandtotal"
                  type="number"
                  label="Grand Total"
                  placeholder="Nan"
                  hook={register("grandtotal")}
                />
              </div>
              <div className="md:flex w-full justify-between">
              <label className="text-lg text-end w-1/8 mr-2">Payment Method:</label>
                  <select
                    name="method"
                    defaultValue="online"
                    className="py-1 px-2 rounded-md border border-black w-full"
                  >
                    <option value="online">Online</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                </select>
              </div>
              <div className="md:flex w-full justify-between gap-2">
                  <label>Note</label>
                  <textarea rows={3} className='border-2 border-black w-full p-2'/>
               </div>
              <div className="flex w-full justify-center gap-2">
              <button name='Back' className='w-[20rem] p-1 text-white bg-black rounded-md border border-gray-500 font-medium text-lg hover:scale-105' onClick={handleBack}>Back</button>
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiesCheckout;
