import { useEffect, useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import QueCurrentDiet from "./Questions/QueCurrentDiet";
import QueFamilyHistory from "./Questions/QueFamilyHistory";
import QueComplains from "./Questions/QueComplains";
import CustomerQuestionsPart1 from "../Admin/customer/new_customer/CustomerQuestionsPart1";
import axios from "axios";
import QueGeneralDetails from "./Questions/QueGeneralDetails";
import QuePart2 from "./Questions/QuePart2";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
];

function UserQuestions() {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState([]);

  const handleGetUser = () => {
    axios
      .get(`/api/v2/users/search?id=${localStorage.getItem("main_id")}`)
      .then((res) => {
        console.log(res.data?.user);
        setUser(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className="flex w-full p-2 items-center">
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <Stepper sx={{ width: "100%", height: "7%" }}>
          {steps.map((step, index) => (
            <Step
              key={step}
              orientation="vertical"
              indicator={
                <StepIndicator
                  variant={currentStep <= index ? "outlined" : "solid"}
                  color={currentStep < index ? "success" : "success"}
                >
                  {currentStep <= index ? index + 1 : <Check />}
                </StepIndicator>
              }
              sx={{
                "&::after": {
                  ...(currentStep > index &&
                    index !== steps.length - 1 && {
                      bgcolor: "success.solidBg",
                    }),
                },
              }}
            >
              <StepButton onClick={() => handleStepClick(index)}>
                {step}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {currentStep === 0 && (
          <QueGeneralDetails user={user} onNext={handleNextStep} />
        )}
        {currentStep === 1 && (
          <QueCurrentDiet onNext={handleNextStep} onBack={handleBackStep} />
        )}
        {currentStep === 2 && (
          <QueFamilyHistory onNext={handleNextStep} onBack={handleBackStep} />
        )}
        {currentStep === 3 && (
          <QueComplains onNext={handleNextStep} onBack={handleBackStep} />
        )}
        {currentStep === 4 && (
          <CustomerQuestionsPart1
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
        {currentStep === 5 && <QuePart2 onBack={handleBackStep} />}
      </div>
    </div>
  );
}

export default UserQuestions;
