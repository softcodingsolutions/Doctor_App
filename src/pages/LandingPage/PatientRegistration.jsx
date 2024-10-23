import { useNavigate } from "react-router-dom";

function PatientRegistration() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/signup");
  };
  return (
    <div className=" bg-gray-900 flex flex-col w-full items-center justify-evenly ">
      <div className="grid grid-col-2  justify-center ">
        <h2 className="text-green-300 text-4xl font-poppins font-semibold pb-12 ">
          Patient Registration
        </h2>
        <p className="text-md  text-gray-400 w-[150%] text-xl font-medium pb-2">
          Take benefit of our online consultation program across the world, 100%
          dedicated consulting and guidance provided by expert doctors
        </p>
        <button
          className="bg-green-500 w-52 mt-5 rounded-xl text-white font-semibold font-teachers p-2 text-xl hover:bg-white hover:text-green-500"
          onClick={handleRedirect}
        >
          Register Now
        </button>
      </div>
      <hr />
    </div>
  );
}

export default PatientRegistration;
