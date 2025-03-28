import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function SurveyForm3() {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [selectedCheckboxes3, setSelectedCheckboxes3] = useState([]);
  const [language, setLanguage] = useState("English");
  const [data, setData] = useState([]);
  const [code, setCode] = React.useState();
  const [passcode, setPasscode] = useState();

  const { handleSubmit } = useForm();

  const handleCodeClose = () => {
    setCode(false);
  };

  const handlePasscode = (e) => {
    setPasscode(e.target.value);
  };

  const handlePasswordhandle = () => {
    console.log(passcode, "otp");
    const formdata = new FormData();
    formdata.append("otp", passcode);
    console.log(localStorage.getItem("survey_user_id"));
    axios
      .put(
        `/api/v2/survey_users/show_survey_user_details?survey_user_id=${localStorage.getItem(
          "survey_user_id"
        )}`,
        formdata
      )
      .then(async (res) => {
        console.log(res, "DARA");
        await context[4](res);
        navigate("/surveymain/surveyresult");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckboxChange3 = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
    const checkboxObject = data.find(
      (item) =>
        item.in_english === checkboxValue || item.in_gujarati === checkboxValue
    );

    if (isChecked && checkboxObject) {
      setSelectedCheckboxes3((prevState) => [...prevState, checkboxObject]);
    } else {
      setSelectedCheckboxes3((prevState) =>
        prevState.filter(
          (item) =>
            item.in_english !== checkboxValue &&
            item.in_gujarati !== checkboxValue
        )
      );
    }
  };

  const submittedData3 = () => {
    setCode(true);
    context[1]((prev) => ({
      ...prev,
      weightGainQuestions: selectedCheckboxes3,
    }));
    context[2](selectedCheckboxes3);
  };

  const handleBack = () => {
    navigate("/surveymain/surveyform2");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleData = () => {
    axios
      .get(`/api/v2/survey_questions`)
      .then((res) => {
        console.log(res);
        setData(res?.data?.all_survey_questions);
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
        <body>
          <div className="flex justify-center rounded-md bg-[#F6F5F2] border px-4 py-5 shadow-sm sm:px-10 sm:py-5">
            <form
              onSubmit={handleSubmit(submittedData3)}
              className="flex flex-col justify-center items-center p-5 bg-[#EEEEEE] w-full min-w-[300px] sm:min-w-[520px] z-0"
              method="post"
            >
              <div>
                <h2 className="text-md text-[#799351] font-semibold">
                  Click the following questions, if applicable to get your
                  closest possibility of weight gain reason
                </h2>
              </div>
              <div className="grid py-2 my-1 w-full max-w-lg">
                <label className="text-md text-[#799351] font-medium">
                  Please Select Your Language:
                </label>
                <select
                  name="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="py-1 px-2 rounded-md border border-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                >
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>
              <div className="grid py-2 my-1 w-full max-w-lg">
                <label className="text-md text-[#799351] font-medium">
                  Complains:
                </label>
                {language === "English"
                  ? data.map((item, index) => (
                      <div key={index}>
                        <input
                          value={item.in_english}
                          onChange={handleCheckboxChange3}
                          type="checkbox"
                          id={`checkbox-${index}`}
                          className="mr-2 size-4"
                        />
                        <label htmlFor={`checkbox-${index}`}>
                          {item.in_english}
                        </label>
                      </div>
                    ))
                  : data.map((item, index) => (
                      <div key={index}>
                        <input
                          value={item.in_gujarati}
                          onChange={handleCheckboxChange3}
                          type="checkbox"
                          id={`checkbox-${index}`}
                          className="mr-2 size-4"
                        />
                        <label htmlFor={`checkbox-${index}`}>
                          {item.in_gujarati}
                        </label>
                      </div>
                    ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 m-2">
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
          <div>
            <Dialog open={code} onClose={handleCodeClose}>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the OTP sent to your email.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="otp"
                  name="otp"
                  label="OTP"
                  type="otp"
                  fullWidth
                  onChange={handlePasscode}
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCodeClose}>Cancel</Button>
                <Button type="submit" onClick={handlePasswordhandle}>
                  Verify OTP
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </body>
        <footer>
          <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
            <a
              className="text-lg text-[#799351] font-semibold"
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
