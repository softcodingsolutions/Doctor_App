import React, { useState } from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';

import UserGeneralDetails from './UserGeneralDetails';
import UserCurrentDiet from './UserCurrentDiet';
import UserFamilyHistory from './UserFamilyHistory';
import UserComplains from './UserComplains';
import UserQuestionsPart1 from './UserQuestionsPart1';
import UserQuestionsPart2 from './UserQuestionsPart2';
import UserCheckout from './UserCheckout';
const steps = [
  'General Details',
  'Current Diet',
  'Family History',
  'Complains',
  'Questions',
  'Diagnosis',
  'Checkout'
];
function NewUser() {
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
      <div className="w-full  hidden sm:block sm:w-20 xl:w-8 flex-shrink-0">
        .
      </div>
      <div className="h-[80vh] flex-grow justify-center flex flex-wrap content-start p-3">
      <Stepper sx={{ width: '100%', height:"7%" }}>
          {steps.map((step, index) => (
            <Step
              key={step}
              orientation="vertical"
              indicator={
                <StepIndicator
                  variant={currentStep <= index ? 'outlined' : 'solid'}
                  color={currentStep < index ? 'success' : 'success'}
                >
                  {currentStep <= index ? index + 1 : <Check />}
                </StepIndicator>
              }
              sx={{
                '&::after': {
                  ...(currentStep > index && index !== steps.length - 1 && {
                    bgcolor: 'success.solidBg',
                  }),
                },
              }}
            >
              <StepButton>
                {step}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {currentStep === 0 && <UserGeneralDetails onNext={handleNextStep} />}
        {currentStep === 1 && <UserCurrentDiet onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 2 && <UserFamilyHistory onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 3 && <UserComplains onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 4 && <UserQuestionsPart1 onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 5 && <UserQuestionsPart2 onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 6 && <UserCheckout  onBack={handleBackStep} />}
      </div>
    </div>
  );
}

export default NewUser;
