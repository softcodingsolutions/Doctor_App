import { useOutletContext, useNavigate } from "react-router-dom";

export default function SurveyResult() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const weight = parseFloat(localStorage.getItem("user_weight"));
  const height = parseFloat(localStorage.getItem("user_height")) / 100;
  const dont = context?.[3]?.data?.details?.package?.dont;
  const dos = context?.[3]?.data?.details?.package?.do;
  const exercise = context?.[3]?.data?.details?.package?.exercise;

  const handleBMI = (w, h) => {
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      return bmi.toFixed(2);
    }
    return "Invalid input";
  };

  const handleNext = () => {
    navigate("/survey");
  };

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <header className="bg-[#FEFAF6] h-16 flex p-2">
          <div className="flex justify-start w-full mb-2">
            <img
              src="https://slimandsmile.com/assets/front/images/logo.png"
              alt="Slim and Smile Logo"
              className="h-16 "
            />
          </div>
          <div className="flex justify-start mr-52 w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl text-[#1F2937] font-bold text-center">
              Surveillance @ Overweight
            </h1>
          </div>
        </header>
        <div className="flex flex-col justify-center rounded-md bg-[#F6F5F2] border px-4 py-5 sm:px-10 sm:py-6 shadow-sm">
          {/* BMI and Reason Section */}
          <div className="flex flex-col p-5 max-w-screen mx-auto">
            <div className="flex flex-col mb-4">
              <h1 className="text-lg sm:text-xl text-[#1F2937] font-semibold tracking-wide">
                Your BMI Count is: {handleBMI(weight, height)}
              </h1>
            </div>
            <div className="flex flex-col mb-4">
              <h1 className="text-lg sm:text-xl text-[#1F2937] font-semibold tracking-wide">
                Your closest possibility of weight gain reason:
              </h1>
              <h2 className="text-lg sm:text-xl font-semibold text-deep-orange-400 tracking-wide">
                {context?.[3]?.data?.details?.package?.survey_weigh_reason}
              </h2>
            </div>
          </div>

          {/* Dos Section */}
          <div className="flex flex-col p-4 max-w-screen-lg mx-auto">
            <div className="text-lg sm:text-xl text-[#1F2937] font-semibold tracking-wide mb-2">
              Dos
            </div>
            <div className="w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 overflow-auto">
              <table className="w-full min-w-[460px] p-2">
                <thead className="uppercase bg-[#799351] text-white rounded-md">
                  <tr>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In English
                    </th>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In Gujarati
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dos?.length > 0 ? (
                    dos.map((data, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_english}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_gujarati}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-3 px-4 text-center">
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Donts Section */}
          <div className="flex flex-col p-4 max-w-screen-lg mx-auto">
            <div className="text-lg sm:text-xl text-[#1F2937] font-semibold tracking-wide mb-2">
              Donts
            </div>
            <div className="w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 overflow-auto">
              <table className="w-full min-w-[460px] p-2">
                <thead className="uppercase bg-[#799351] text-white rounded-md">
                  <tr>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In English
                    </th>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In Gujarati
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dont?.length > 0 ? (
                    dont.map((data, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_english}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_gujarati}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-3 px-4 text-center">
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exercise Section */}
          <div className="flex flex-col p-4 max-w-screen-lg mx-auto">
            <div className="text-lg sm:text-xl text-[#1F2937] font-semibold tracking-wide mb-2">
              Exercise
            </div>
            <div className="w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 overflow-auto">
              <table className="w-full min-w-[460px] p-2">
                <thead className="uppercase bg-[#799351] text-white rounded-md">
                  <tr>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      Name
                    </th>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In English
                    </th>
                    <th className="text-sm uppercase tracking-wide font-medium py-3 px-4 text-left">
                      In Gujarati
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exercise?.length > 0 ? (
                    exercise.map((data, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_english}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-b-gray-50">
                          <span className="text-black text-base font-medium ml-1">
                            {data.in_gujarati}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-3 px-4 text-center">
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="w-full sm:w-[10rem] p-2 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
              style={{ backgroundColor: "#799351" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>

        <footer>
          <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
            <a
              className="text-lg text-[#799351] "
              href="https://slimandsmile.com"
            >
              Contact Us @ Slim And Smile
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
