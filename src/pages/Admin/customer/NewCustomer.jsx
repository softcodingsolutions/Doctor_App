import { useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import CustomerGeneralDetails from "./new_customer/CustomerGeneralDetails";
import QueCurrentDiet from "../../User/Questions/QueCurrentDiet";
import QueFamilyHistory from "../../User/Questions/QueFamilyHistory";
import QueComplains from "../../User/Questions/QueComplains";
import CustomerQuestionsPart1 from "./new_customer/CustomerQuestionsPart1";
import CustomerQuestionsPart2 from "./new_customer/CustomerQuestionsPart2";
import QueCheckout from "../../User/Questions/QueCheckout";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
  "Checkout",
];

function NewCustomer() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-3">
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
          <CustomerGeneralDetails onNext={handleNextStep} />
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
        {currentStep === 5 && (
          <CustomerQuestionsPart2
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
        {currentStep === 6 && <QueCheckout onBack={handleBackStep} />}
      </div>
    </div>
  );
}

export default NewCustomer;
