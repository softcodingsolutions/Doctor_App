import { useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import FranchiesGeneraldetails from "./FranchiesGeneraldetails";
import FranchiesCurrentdiet from "./FranchiesCurrentdiet";
import FranchiesFamilyhistory from "./FranchiesFamilyhistory";
import FranchiesComplains from "./FranchiesComplains";
import FranchiesQuestions from "./FranchiesQuestions";
import FranchiesDiagnosis from "./FranchiesDiagnosis";
import FranchiesCheckout from "./FranchiesCheckout";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const steps = [
  "General Details",
  "Current Diet",
  "Family History",
  "Complains",
  "Questions",
  "Diagnosis",
  // "Checkout",
];

function FranchiseNewcustomer() {
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
    // checkout: [],
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

  const handleCallUserApi = async () => {
    console.log("Waah");
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
            created_by_id: localStorage.getItem("main_id"),
            creator: "franchise",
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
            navigate("../../franchise/patients/all-users");
          }
          // const formData = new FormData();
          // formData.append("user_package[user_id]", res.data?.user?.user?.id);
          // formData.append("user_package[no_of_days]", checkout?.duration);
          // formData.append("user_package[package_name]", checkout?.package_name);
          // formData.append("user_package[package_price]", checkout?.grand_total);
          // formData.append("user_package[starting_date]", checkout?.from_date);
          // formData.append("user_package[ending_date]", checkout?.to_date);
          // axios
          //   .post("/api/v1/user_packages", formData)
          //   .then((res) => {})
          //   .catch((err) => {
          //     setLoading(false);
          //     alert(err.response?.data?.message + "!");
          //   });
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
    <div className="flex w-screen ">
      <div className="h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>

      <div className="gap-1 overflow-auto justify-center flex flex-wrap py-2 px-5">
        <Stepper sx={{ width: "100%", height: "8%" }}>
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
          <FranchiesGeneraldetails
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onValidate={handleValidation}
            storedData={storeData.generalDetails}
          />
        )}
        {currentStep === 1 && (
          <FranchiesCurrentdiet
            storedData={storeData.diet}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 2 && (
          <FranchiesFamilyhistory
            storedData={storeData.familyHistory}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 3 && (
          <FranchiesComplains
            storedData={storeData.complains}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 4 && (
          <FranchiesQuestions
            storedData={storeData.questions}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 5 && (
          <FranchiesDiagnosis
            storedData={storeData.diagnosis}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
            handleCallUserApi={handleCallUserApi}
          />
        )}
        {/* {currentStep === 6 && (
          <FranchiesCheckout
            setStoreData={setStoreData}
            onBack={handleBackStep}
          />
        )} */}
      </div>
    </div>
  );
}

export default FranchiseNewcustomer;
