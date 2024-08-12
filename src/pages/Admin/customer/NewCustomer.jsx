import { useEffect, useState } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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

function NewCustomer() {
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
  const role = localStorage.getItem("role");

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
    console.log("Checkout...", checkout);

    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/users/app_creds`);

      if (role === "super_admin") {
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
              whatsapp_number: storeData?.generalDetails?.whatsapp,
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
            formData.append(
              "user_package[package_name]",
              checkout?.package_name
            );
            formData.append(
              "user_package[package_price]",
              checkout?.grand_total
            );
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
                  navigate("../../admin/customers/all-users");
                }
              })
              .catch((err) => {
                setLoading(false);
                alert(err.response?.data?.message + "!");
              });
          });
      } else if (role === "doctor") {
        await axios
          .post("/api/v1/users", {
            user: {
              first_name: storeData?.generalDetails?.firstname,
              last_name: storeData?.generalDetails?.lastname,
              email: storeData?.generalDetails?.email,
              phone_number: storeData?.generalDetails?.mobile,
              created_by_id: localStorage.getItem("main_id"),
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
              user_selected_questions_two: JSON.stringify(storeData?.diagnosis),
            },
            client_id: res.data?.client_id,
          })
          .then((res) => {
            const formData = new FormData();
            formData.append("user_package[user_id]", res.data?.user?.user?.id);
            formData.append("user_package[no_of_days]", checkout?.duration);
            formData.append(
              "user_package[package_name]",
              checkout?.package_name
            );
            formData.append(
              "user_package[package_price]",
              checkout?.grand_total
            );
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
                  navigate("../../admin/customers/all-users");
                }
              })
              .catch((err) => {
                setLoading(false);
                alert(err.response?.data?.message + "!");
              });
          });
      }
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
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-auto flex flex-wrap content-start p-3">
        <Stepper sx={{ width: "100%", height: "7%" }}>
          {steps.map((step, index) => (
            <Step
              key={step}
              orientation="vertical"
              className="font-teachers"
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
          <CustomerGeneralDetails
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
          <CustomerQuestionsPart2
            storedData={storeData.diagnosis}
            setStoreData={setStoreData}
            onNext={handleNextStep}
            onBack={handleBackStep}
            onValidate={handleValidation}
          />
        )}
        {currentStep === 6 && (
          <QueCheckout
            setStoreData={setStoreData}
            onBack={handleBackStep}
            handleCallUserApi={handleCallUserApi}
          />
        )}
      </div>
    </div>
  );
}

export default NewCustomer;
