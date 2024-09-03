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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../Loader";

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
  const navigate = useNavigate();
  const [isGeneralDetailsValid, setIsGeneralDetailsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState({
    generalDetails: [],
    diet: [],
    familyHistory: [],
    complains: [],
    questions: [],
    diagnosis: [],
    checkout: [],
    doctorId: "",
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

  const handleCallUserApi = async (checkout) => {
    console.log("Waah");
    console.log("Checking...", checkout);
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
            created_by_id: storeData?.doctorId,
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
            user_selected_questions_two: JSON.stringify(storeData?.diagnosis),
          },
          client_id: res.data?.client_id,
        })
        .then((res) => {
          const formData = new FormData();
          formData.append("user_package[user_id]", res.data?.user?.user?.id);
          formData.append("user_package[no_of_days]", checkout?.duration);
          formData.append("user_package[package_name]", checkout?.package_name);
          formData.append("user_package[package_price]", checkout?.grand_total);
          formData.append("user_package[starting_date]", checkout?.from_date);
          formData.append("user_package[ending_date]", checkout?.to_date);
          axios
            .post("/api/v1/user_packages", formData)
            .then((res) => {
              console.log(res);
              setLoading(false);
              if (res.data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Created!",
                  text: `New user has been created.`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                localStorage.removeItem("client_email");
                navigate("/receptionist/patients/all-users");
              }
            })
            .catch((err) => {
              setLoading(false);
              alert(err.response?.data?.message + "!");
            });
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

  return (
    <div className="flex w-full">
      <div className="h-[80vh] justify-center flex flex-wrap">
        <Stepper sx={{ width: "100%" }}>
          {steps.map((step, index) => (
            <Step
              key={step}
              orientation="vertical"
              className="font-sans"
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
          <UserGeneralDetails
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onValidate={handleValidation}
            storedData={storeData.generalDetails}
          />
        )}
        {currentStep === 1 && (
          <UserCurrentDiet
            storedData={storeData.diet}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 2 && (
          <UserFamilyHistory
            storedData={storeData.familyHistory}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 3 && (
          <UserComplains
            storedData={storeData.complains}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 4 && (
          <UserQuestionsPart1
            storedData={storeData.questions}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 5 && (
          <UserQuestionsPart2
            storedData={storeData.diagnosis}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 6 && (
          <UserCheckout
            setStoreData={setStoreData}
            onBack={handleBackStep}
            handleCallUserApi={handleCallUserApi}
          />
        )}
      </div>
    </div>
  );
}

export default NewUser;
