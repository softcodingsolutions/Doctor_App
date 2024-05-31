import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import FranchiesGeneraldetails from "./FranchiesGeneraldetails";
import FranchiesCurrentdiet from "./FranchiesCurrentdiet";

function FranchiseNewcustomer() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
  
      <div className="h-screen flex-grow overflow-auto flex flex-wrap content-start p-5">
      <Stepper activeStep={currentStep}>
          <Step 
            orientation="vertical"
            onClick={() => handleStepClick(0)}
            completed={currentStep > 0}
            active={currentStep === 0}
          >
            <StepIndicator variant="solid" color="primary">
              {currentStep > 0 ? <Check /> : '1'}
            </StepIndicator>
            <div>General Details</div>
          </Step>
          <Step 
            orientation="vertical"
            onClick={() => handleStepClick(1)}
            completed={currentStep > 1}
            active={currentStep === 1}
          >
            <StepIndicator variant="solid" color="primary">
              {currentStep > 1 ? <Check /> : '2'}
            </StepIndicator>
            <div>Current Diet</div>
          </Step>
        </Stepper>
        
        {currentStep === 0 && <FranchiesGeneraldetails onNext={handleNextStep} />}
        {currentStep === 1 && <FranchiesCurrentdiet onBack={handleBackStep} />}
        
        <Outlet />
      </div>
    </div>
  );
}

export default FranchiseNewcustomer;
