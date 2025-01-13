import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SurveyForm2() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const [healthProblems, setHealthProblems] = useState([]);
  const [selectedCheckboxes2, setSelectedCheckboxes2] = useState([]);
  const { handleSubmit } = useForm();

  const handleCheckboxChange2 = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCheckboxes2((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes2((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const submittedData2 = (d) => {
    context[1]((prev) => ({
      ...prev,
      healthProblem: selectedCheckboxes2,
    }));

    navigate("/surveymain/surveyform3", {
      state: { ...d, selectedCheckboxes2 },
    });
  };

  const handleBack = () => {
    navigate("/surveymain/surveyform");
  };

  const handleData = () => {
    axios
      .get(`/api/v2/survey_helth_problems`)
      .then((res) => {
        console.log(res);
        setHealthProblems(res.data.all_survey_helth_problems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[100vh] bg-white">
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
        <main>
          <div className="flex justify-center rounded-md bg-[#F6F5F2] border px-4 py-5 shadow-sm sm:px-10 sm:py-5">
            <form
              onSubmit={handleSubmit(submittedData2)}
              className="flex flex-col justify-center items-center p-5 bg-[#EEEEEE] w-full min-w-[300px] sm:min-w-[520px] z-0"
              method="post"
            >
              <div className="grid py-2 my-1 w-full max-w-lg">
                <label  className="text-md text-[#799351] font-medium">
                  Kindly click your health problem ( If any )
                </label>
                {healthProblems.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.problem}
                      onChange={handleCheckboxChange2}
                      type="checkbox"
                      id={`checkbox-${index}`}
                      className="mr-2 size-4"
                      name="items"
                    />
                    <label htmlFor={`checkbox-${index}`} className="p-2">
                      {item.problem}
                    </label>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 w-full max-w-2xl">
                <button
                  onClick={handleBack}
                  type="button"
                  className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                  style={{ backgroundColor: "#799351" }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                  style={{ backgroundColor: "#799351" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
        <footer>
          <div className="flex justify-center items-center text-center bg-[#FEFAF6] mt-32 h-16">
            <a className="text-lg text-[#799351] font-semibold" href="/">
              Contact Us @ Slim And Smile
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
