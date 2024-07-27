import { useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import QueCurrentDiet from "./Questions/QueCurrentDiet";
import QueFamilyHistory from "./Questions/QueFamilyHistory";
import QueComplains from "./Questions/QueComplains";
import CustomerQuestionsPart1 from "../Admin/customer/new_customer/CustomerQuestionsPart1";
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
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);

  const handleNextStep = () => {
    if (isGeneralDetailsValid || currentStep !== 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleValidation = (isValid) => {
    setIsGeneralDetailsValid(isValid);
  };

  return (
    <div className="flex w-full p-2 items-center font-teachers">
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <Stepper sx={{ width: "100%", height: "7%" }}>
          {steps.map((step, index) => (
            <Step
              key={step}
              className="font-teachers"
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
              <StepButton>{step}</StepButton>
            </Step>
          ))}
        </Stepper>
        {currentStep === 0 && (
          <QueGeneralDetails
            onNext={handleNextStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 1 && (
          <QueCurrentDiet
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 2 && (
          <QueFamilyHistory
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 3 && (
          <QueComplains
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 4 && (
          <CustomerQuestionsPart1
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 5 && <QuePart2 onBack={handleBackStep} />}
      </div>
    </div>
  );
}

export default UserQuestions;
