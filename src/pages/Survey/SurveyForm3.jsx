import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import axios from "axios";
export default function SurveyForm3() {
  const context = useOutletContext();
  const navigate = useNavigate();
  // const user_id = localStorage.getItem("user_id")
  const [selectedCheckboxes3, setSelectedCheckboxes3] = useState([]);
  const [selectedCheckboxes4, setSelectedCheckboxes4] = useState([]);
  const [language, setLanguage] = useState("English");
  const [data, setData] = useState([]);
  const [code, setCode] = React.useState();
  const [passcode,setPasscode] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCodeClose = () => {
    setCode(false);
  };
  const handlePasscode = (e) => {
    setPasscode(e.target.value);
  };

  const handlePasswordhandle = () => {
    const formdata = new FormData()
    formdata.append('otp',passcode);
   axios.get(`/api/v2/survey_users/show_survey_user_details`,formdata).then((res)=>{
    console.log(res)
    navigate("/surveymain/surveyresult");
   }).catch((err)=>{
    console.log(err)
   })
  };

  const handleCheckboxChange3 = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCheckboxes3((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes3((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const handleCheckboxChange4 = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCheckboxes4((prevState) => [...prevState, checkboxValue]);
    } else {
      setSelectedCheckboxes4((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };

  const submittedData3 = (data) => {
    const question = {
        "english":selectedCheckboxes3,
        "gujarati":selectedCheckboxes4
    }
    setCode(true);
    context[1]((prev) => ({
      ...prev,
      weightGainQuestions:question,
    }));
    context[2](question);
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
        setData(res.data.all_survey_questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <header className="bg-[#FEFAF6] h-20">
        <div className=" items-center absolute p-3">
          <img
            src="https://slimandsmile.com/assets/front/images/logo.png"
            alt=""
            className="h-16"
          />
        </div>
        <div className="flex justify-center p-3">
          <h1 className="text-2xl text-[#1F2937] font-bold">
            Surveillance @ Overweight
          </h1>
        </div>
      </header>
      <body>
        <div className="flex items-center justify-center border px-10 py-5 rounded-sm bg-[#F6F5F2] shadow-sm">
          <form
            onSubmit={handleSubmit(submittedData3)}
            className="w-[750px] p-3 flex flex-col justify-center items-center rounded-md bg-[#EEEEEE] "
            method="post"
          >
            <div>
              <h2 className="text-xl text-[#799351] font-semibold">
                Click the following questions, if applicable to get your closest
                possibility of weight gain reason
              </h2>
            </div>
            <div className="grid py-2 my-1 ">
              <label className="text-md text-[#799351] font-medium">
                Please Select Your Language:
              </label>
              <select
                name="language"
                value={language}
                onChange={handleLanguageChange}
                className="py-1 px-2 rounded-md border border-black w-[25rem]"
              >
                <option value="English">English</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </div>
            <div>
              <label className="text-lg text-[#799351] font-semibold">
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
                        className="mr-2"
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
                        onChange={handleCheckboxChange4}
                        type="checkbox"
                        id={`checkbox-${index}`}
                        className="mr-2"
                      />
                      <label htmlFor={`checkbox-${index}`}>
                        {item.in_gujarati}
                      </label>
                    </div>
                  ))}
            </div>
            <div className="grid grid-cols-2 gap-2 m-2">
              <button
                onClick={handleBack}
                type="submit"
                className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                style={{ backgroundColor: "#799351" }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
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
  );
}
