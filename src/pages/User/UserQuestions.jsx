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
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
];

function UserQuestions() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);
  const [storeData, setStoreData] = useState({
    generalDetails: [],
    diet: [],
    familyHistory: [],
    complains: [],
    questions: [],
    diagnosis: [],
  });

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

  const handleCallUserApi = async (selectedQuestions) => {
    console.log("Waah");
    try {
      const res = await axios.get(`/api/v1/users/app_creds`);

      await axios
        .post("/api/v1/users", {
          user: {
            first_name: storeData?.generalDetails?.firstname,
            last_name: storeData?.generalDetails?.lastname,
            email: storeData?.generalDetails?.email,
            phone_number: storeData?.generalDetails?.mobile,
            created_by_id: localStorage.getItem("doctor_id"),
            creator: "doctor",
          },
          personal_detail: {
            city: storeData?.generalDetails?.city,
            age: storeData?.generalDetails?.age,
            address: storeData?.generalDetails?.address,
            gender: storeData?.generalDetails?.gender,
            overweight_since: storeData?.generalDetails?.overweight,
            language: storeData?.generalDetails?.language,
            reffered_by: storeData?.generalDetails?.refferedBy,
            weight: storeData?.generalDetails?.weight,
            height: storeData?.generalDetails?.height,
            whatsapp_number: storeData?.generalDetails?.whatsapp,
            current_diet: JSON.stringify(storeData?.diet),
            family_reasons: JSON.stringify(storeData?.familyHistory),
            complaints: JSON.stringify(storeData?.complains),
            user_selected_questions_one: JSON.stringify(storeData?.questions),
            user_selected_questions_two: JSON.stringify(selectedQuestions),
          },
          client_id: res.data?.client_id,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data?.user?.access_token);
          localStorage.setItem("role", res.data?.user?.role);
          localStorage.setItem("main_id", res.data?.user?.user?.id);
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sent Successfully!",
              text: `Your details has been sent to the doctor.`,
              showConfirmButton: false,
              timer: 2000,
            });
            localStorage.removeItem("client_email");
            localStorage.removeItem("doctor_id");
            navigate("/user/user-diagnosis/profile");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Store Data: ", storeData);
  }, [storeData]);

  return (
    <div className="flex w-full p-2 items-center font-poppins">
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
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onValidate={handleValidation}
            storedData={storeData.generalDetails}
          />
        )}
        {currentStep === 1 && (
          <QueCurrentDiet
            storedData={storeData.diet}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 2 && (
          <QueFamilyHistory
            storedData={storeData.familyHistory}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 3 && (
          <QueComplains
            storedData={storeData.complains}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 4 && (
          <CustomerQuestionsPart1
            storedData={storeData.questions}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 5 && (
          <QuePart2
            setStoreData={setStoreData}
            onBack={handleBackStep}
            handleCallUserApi={handleCallUserApi}
          />
        )}
      </div>
    </div>
  );
}

export default UserQuestions;
