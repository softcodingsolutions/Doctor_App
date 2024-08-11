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
    <div>
      <header className="bg-[#FEFAF6] h-20">
        <div className="items-center absolute p-3">
          <img
            src="https://slimandsmile.com/assets/front/images/logo.png"
            alt=""
            className="h-16"
          />
        </div>
        <div className="flex justify-center p-3">
          <h1 className="text-2xl text-[#1F2937] font-bold">Survey Result</h1>
        </div>
      </header>
      <div className="flex  flex-col justify-center rounded-md bg-[#F6F5F2] border px-10 py-5 shadow-sm">
        <div className="w-[700px] flex flex-col  p-5 ">
          <div className="flex flex-row">
            <h1 className="text-lg text-[#1F2937]  font-semibold tracking-wide">
              Your BMI Count is: {handleBMI(weight, height)}
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="text-lg text-[#1F2937]  font-semibold tracking-wide">
              Your closest possibility of weight gain reason:
              <h2 className="text-lg font-semibold text-deep-orange-400 tracking-wide">
                {context?.[3]?.data?.details?.package?.survey_weigh_reason}
              </h2>{" "}
            </h1>
          </div>
        </div>
        <div className="flex w-full flex-col p-4 h-full">
          <div className="text-lg text-[#1F2937]  font-semibold tracking-wide">
            Dos
          </div>
          <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0 p-2">
              <thead className="uppercase">
                <tr className="bg-[#799351] text-white rounded-md">
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
                  dos?.map((data, index) => {
                    return (
                      <tr key={index} className="">
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
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-4 text-center justify-center"
                    >
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-full flex-col p-4 h-full">
          <div className="text-lg text-[#1F2937]  font-semibold tracking-wide">
            Donts
          </div>
          <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0 p-2">
              <thead className="uppercase">
                <tr className="bg-[#799351]  text-white rounded-md">
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
                  dont?.map((data, index) => {
                    return (
                      <tr key={index} className="">
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
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-4 text-center justify-center"
                    >
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-full flex-col p-4 h-full">
          <div className="text-lg text-[#1F2937]  font-semibold tracking-wide">
            Exercise
          </div>
          <div className="animate-fade-left animate-delay-75 w-full bg-white shadow-gray-400 shadow-inner border rounded-md border-gray-400 animate-once animate-ease-out overflow-auto h-[93%]">
            <table className="w-full min-w-[460px] z-0 p-2">
              <thead className="uppercase">
                <tr className="bg-[#799351] text-white rounded-md">
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
                  exercise?.map((data, index) => {
                    return (
                      <tr key={index} className="">
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
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-4 text-center justify-center"
                    >
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[10rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
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
  );
}
