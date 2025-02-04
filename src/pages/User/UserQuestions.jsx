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
import icons_slime from "../../assets/images/icons_slime_converted.webp";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
];

function UserQuestions() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
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
          setLoading(false);
          if (res.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sent Successfully!",
              text: `Your details have been sent to the doctor.`,
              showConfirmButton: true,
            });
            localStorage.removeItem("client_email");
            localStorage.removeItem("doctor_id");
            navigate("/user/user-diagnosis");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Store Data: ", storeData);
  }, [storeData]);

  if (loading) {
    return <Loader />;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col w-full px-3 bg-white py-2 items-center font-sans">
       <div className={`flex ${isMobile ? 'gap-2 flex-col' : 'gap-0' } w-full p-5 border-b bg-[#1F2937] rounded-t-lg justify-between items-center`}>
        <img src={icons_slime} alt="Company Logo" className={`${isMobile ? 'h-12 ' :'h-16'} bg-white p-2 rounded-lg`} />
        <div className="flex flex-col justify-center items-center flex-grow">
          <p className="text-lg font-bold text-white">Registration Page</p>
          <p className="text-sm font-medium text-white mb-5">Fill out the form details carefully for registration</p>
          {!isMobile && (
            <Stepper sx={{ width: "80%" }} >
              {steps.map((step, index) => (
                <Step
                  key={step}
                  className="font-sans"
                  orientation="horizontal"
                  indicator={
                    <StepIndicator
                      variant={currentStep <= index ? "outlined" : "solid"}
                      color={currentStep < index ? "success" : "success"}
                      className="bg-gray-100 p-2 rounded-full"
                    >
                      {currentStep <= index ? (
                        <span className="text-gray-700 text-xl">{index + 1}</span>
                      ) : (
                        <Check className="text-white text-xl" />
                      )}
                    </StepIndicator>
                  }
                >
                  <StepButton className="text-lg text-white hover:text-blue-500 transition-colors duration-300">
                    {step}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          )}
        </div>
      </div>
        
      <div className="w-full flex-grow overflow-auto mt-2">
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
