import { useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import UserGeneralDetails from "./UserGeneralDetails";
import UserCurrentDiet from "./UserCurrentDiet";
import UserFamilyHistory from "./UserFamilyHistory";
import UserComplains from "./UserComplains";
import UserQuestionsPart1 from "./UserQuestionsPart1";
import UserQuestionsPart2 from "./UserQuestionsPart2";
import UserCheckout from "./UserCheckout";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
  "Checkout",
];

function NewUser() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);

  const handleStepClick = (step) => {
    if (step === 0 || isGeneralDetailsValid) {
      setCurrentStep(step);
    }
  };

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
    <div className="flex w-full">
      <div className="h-[80vh] justify-center flex flex-wrap">
        <Stepper sx={{ width: "100%" }}>
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
          <UserGeneralDetails
            onNext={handleNextStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 1 && (
          <UserCurrentDiet
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 2 && (
          <UserFamilyHistory
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 3 && (
          <UserComplains
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 4 && (
          <UserQuestionsPart1
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 5 && (
          <UserQuestionsPart2
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 6 && <UserCheckout onBack={handleBackStep} />}
      </div>
    </div>
  );
}

export default NewUser;
