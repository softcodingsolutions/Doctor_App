import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import FranchiesGeneraldetails from "./FranchiesGeneraldetails";
import FranchiesCurrentdiet from "./FranchiesCurrentdiet";
import FranchiesFamilyhistory from './FranchiesFamilyhistory';
import FranchiesComplains from './FranchiesComplains';
import FranchiesQuestions from './FranchiesQuestions';
import FranchiesDiagnosis from './FranchiesDiagnosis';
import FranchiesCheckout from './FranchiesCheckout';

const steps = [
  'General Details',
  'Current Diet',
  'Family History',
  'Complains',
  'Questions',
  'Diagnosis',
  'Checkout'
];

function FranchiseNewcustomer() {
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

      <div className="flex-grow overflow-auto justify-center flex flex-wrap content-start p-5">
        <Stepper sx={{ width: '80%' }}>
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
              <StepButton onClick={() => handleStepClick(index)}>
                {step}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {currentStep === 0 && <FranchiesGeneraldetails onNext={handleNextStep} />}
        {currentStep === 1 && <FranchiesCurrentdiet onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 2 && <FranchiesFamilyhistory onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 3 && <FranchiesComplains onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 4 && <FranchiesQuestions onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 5 && <FranchiesDiagnosis onNext={handleNextStep} onBack={handleBackStep} />}
        {currentStep === 6 && <FranchiesCheckout onBack={handleBackStep} />}
      </div>

      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-2">
        <Outlet />
      </div>
    </div>
  );
}


export default FranchiseNewcustomer;
