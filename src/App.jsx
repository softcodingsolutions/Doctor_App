import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminMain from "./pages/Admin/AdminMain";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminListFollowUp from "./pages/Admin/AdminListFollowUp";
import AdminMaster from "./pages/Admin/AdminMaster";
import Questions from "./pages/Admin/master/Questions";
import ListFranchise from "./pages/Admin/master/ListFranchise";
import Medicine from "./pages/Admin/master/Medicine";
import DosDonts from "./pages/Admin/master/DosDonts";
import Complain from "./pages/Admin/master/Complains";
import FamilyReason from "./pages/Admin/master/FamilyReason";
import ExerciseYoga from "./pages/Admin/master/ExerciseYoga";
import NutritionSupplements from "./pages/Admin/master/NutritionSupplements";
import DietMaster from "./pages/Admin/master/DietMaster";
import LabTest from "./pages/Admin/master/LabTest";
import UserMain from "./pages/User/UserMain";
import UserDashboard from "./pages/User/UserDashboard";
import WeightReason from "./pages/Admin/master/WeightReason";
import AdminTreatment from "./pages/Admin/AdminTreatment";
import TreatmentQuestionPart1 from "./pages/Admin/treatment/TreatmentQuestionPart1";
import TreatmentQuestionPart2 from "./pages/Admin/treatment/TreatmentQuestionPart2";
import TreatmentMedicines from "./pages/Admin/treatment/TreatmentMedicines";
import TreatmentDiet from "./pages/Admin/treatment/TreatmentDiet";
import TreatmentExercise from "./pages/Admin/treatment/TreatmentExercise";
import TreatmentNutrition from "./pages/Admin/treatment/TreatmentNutrition";
import TreatmentDos from "./pages/Admin/treatment/TreatmentDos";
import TreatmentDonts from "./pages/Admin/treatment/TreatmentDonts";
import TreatmentFamilyReason from "./pages/Admin/treatment/TreatmentFamilyReason";
import TreatmentComplains from "./pages/Admin/treatment/TreatmentComplains";
import TreatmentLabTests from "./pages/Admin/treatment/TreatmentLabTests";
import UserQuestions from "./pages/User/UserQuestions";
import QueCurrentDiet from "./pages/User/Questions/QueCurrentDiet";
import QueFamilyHistory from "./pages/User/Questions/QueFamilyHistory";
import QueComplains from "./pages/User/Questions/QueComplains";
import QueUserQuestions from "./pages/User/Questions/QueUserQuestions";
import QueCheckout from "./pages/User/Questions/QueCheckout";
import QueDiagnosis from "./pages/User/Questions/QueDiagnosis";
import QueGeneralDetails from "./pages/User/Questions/QueGeneralDetails";
import CustomerAllUsers from "./pages/Admin/customer/CustomerAllUsers";
import CustomerUserDiagnosis from "./pages/Admin/customer/CustomerUserDiagnosis";
import CustomerGeneralDetails from "./pages/Admin/customer/new_customer/CustomerGeneralDetails";
import NewCustomer from "./pages/Admin/customer/NewCustomer";
import CustomerQuestionsPart1 from "./pages/Admin/customer/new_customer/CustomerQuestionsPart1";
import CustomerQuestionsPart2 from "./pages/Admin/customer/new_customer/CustomerQuestionsPart2";
import ReportPackage from "./pages/Admin/customer/generate_report/ReportPackage";
import ReportPastHistory from "./pages/Admin/customer/generate_report/ReportPastHistory";
import ReportProfile from "./pages/Admin/customer/generate_report/ReportProfile";
import ReportQuestions from "./pages/Admin/customer/generate_report/ReportQuestions";
import ReportProgress from "./pages/Admin/customer/generate_report/ReportProgress";
import ReportTreatment from "./pages/Admin/customer/generate_report/ReportTreatment";
import RTreatmentMedicine from "./pages/Admin/customer/generate_report/treatment/RTreatmentMedicine";
import RTreatmentNutrition from "./pages/Admin/customer/generate_report/treatment/RTreatmentNutrition";
import RTreatmentDos from "./pages/Admin/customer/generate_report/treatment/RTreatmentDos";
import RTreatmentDont from "./pages/Admin/customer/generate_report/treatment/RTreatmentDont";
import RTreatmentExercise from "./pages/Admin/customer/generate_report/treatment/RTreatmentExercise";
import RTreatmentDiet from "./pages/Admin/customer/generate_report/treatment/RTreatmentDiet";
import SurveyReport from "./pages/Survey/SurveyReport";
import Packages from "./pages/Admin/master/Packages";
import SurveyForm from "./pages/Survey/SurveyForm";
import SurveyForm2 from "./pages/Survey/SurveyForm2";
import SurveyForm3 from "./pages/Survey/SurveyForm3";
import FranchiseMain from "./pages/Franchise/FranchiseMain";
import FranchiseDashboard from "./pages/Franchise/FranchiseDashboard";
import FranchiseCustomers from "./pages/Franchise/FranchiseCustomers";
import FranchiseAllCustomers from "./pages/Franchise/customer/FranchiseAllCustomers";
import FranchiseNewcustomer from "./pages/Franchise/customer/FranchiseNewcustomer";
import FranchiesCurrentdiet from "./pages/Franchise/customer/FranchiesCurrentdiet";
import FranchiesGeneraldetails from "./pages/Franchise/customer/FranchiesGeneraldetails";
import FranchiesFamilyhistory from "./pages/Franchise/customer/FranchiesFamilyhistory";
import FranchiesComplains from "./pages/Franchise/customer/FranchiesComplains";
import FranchiesQuestions from "./pages/Franchise/customer/FranchiesQuestions";
import FranchiesDiagnosis from "./pages/Franchise/customer/FranchiesDiagnosis";
import FranchiesCheckout from "./pages/Franchise/customer/FranchiesCheckout";
import DataEntry from "./pages/Admin/appointment/DataEntry";
import AdminAppointment from "./pages/Admin/AdminAppointment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* User */}
        <Route path="user" element={<UserMain />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="questions" element={<UserQuestions />}>
            <Route path="general-details" element={<QueGeneralDetails />} />
            <Route path="current-diet" element={<QueCurrentDiet />} />
            <Route path="family-history" element={<QueFamilyHistory />} />
            <Route path="complains" element={<QueComplains />} />
            <Route path="user-questions" element={<QueUserQuestions />} />
            <Route path="diagnosis" element={<QueDiagnosis />} />
            <Route path="checkout" element={<QueCheckout />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminMain />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="new-user" element={<NewCustomer />}>
            <Route
              path="general-details"
              element={<CustomerGeneralDetails />}
            />
            <Route path="current-diet" element={<QueCurrentDiet />} />
            <Route path="family-history" element={<QueFamilyHistory />} />
            <Route path="complains" element={<QueComplains />} />
            <Route path="user-questions" element={<CustomerQuestionsPart1 />} />
            <Route path="diagnosis" element={<CustomerQuestionsPart2 />} />
            <Route path="checkout" element={<QueCheckout />} />
          </Route>

          {/* customers */}
          <Route path="customers" element={<AdminCustomers />}>
            <Route path="all-users" element={<CustomerAllUsers />} />
            <Route path="user-diagnosis" element={<CustomerUserDiagnosis />}>
              <Route path="profile" element={<ReportProfile />} />
              <Route path="questions" element={<ReportQuestions />} />
              <Route path="past-history" element={<ReportPastHistory />} />
              <Route path="treatment" element={<ReportTreatment />}>
                <Route path="medicine" element={<RTreatmentMedicine />} />
                <Route path="diet" element={<RTreatmentDiet />} />
                <Route path="nutrition" element={<RTreatmentNutrition />} />
                <Route path="exercise" element={<RTreatmentExercise />} />
                <Route path="dos" element={<RTreatmentDos />} />
                <Route path="donts" element={<RTreatmentDont />} />
              </Route>
              <Route path="lab-tests" element={<TreatmentLabTests />} />
              <Route path="progress-report" element={<ReportProgress />} />
              <Route path="package" element={<ReportPackage />} />
            </Route>
          </Route>
          {/* master */}
          <Route path="master" element={<AdminMaster />}>
            <Route path="list-franchise" element={<ListFranchise />} />
            <Route path="questions" element={<Questions />} />
            <Route path="medicine" element={<Medicine />} />
            <Route path="diet" element={<DietMaster />} />
            <Route path="dos-donts" element={<DosDonts />} />
            <Route path="weight-reason" element={<WeightReason />} />
            <Route path="complains" element={<Complain />} />
            <Route path="family-reason" element={<FamilyReason />} />
            <Route path="exercise-yoga" element={<ExerciseYoga />} />
            <Route path="lab-tests" element={<LabTest />} />
            <Route path="packages" element={<Packages />} />
            <Route
              path="nutrition-supplements"
              element={<NutritionSupplements />}
            />
          </Route>
          {/* treatment */}
          <Route path="treatment" element={<AdminTreatment />}>
            <Route path="question-part1" element={<TreatmentQuestionPart1 />} />
            <Route path="question-part2" element={<TreatmentQuestionPart2 />} />
            <Route path="medicines" element={<TreatmentMedicines />} />
            <Route path="diet" element={<TreatmentDiet />} />
            <Route path="exercise" element={<TreatmentExercise />} />
            <Route path="nutrition" element={<TreatmentNutrition />} />
            <Route path="dos" element={<TreatmentDos />} />
            <Route path="donts" element={<TreatmentDonts />} />
            <Route path="family-reason" element={<TreatmentFamilyReason />} />
            <Route path="complains" element={<TreatmentComplains />} />
          </Route>
          <Route path="list-follow-up" element={<AdminListFollowUp />} />
          {/* appointment */}
          <Route path="appointment" element={<AdminAppointment/>}>
            <Route path="data-entry" element={<DataEntry />} />
            <Route path="data-mapping" element={<FranchiseNewcustomer />} />
          </Route>
        </Route>

        {/* Survey */}
        <Route path="survey" element={<SurveyReport />} />
        <Route path="surveyform" element={<SurveyForm />} />
        <Route path="surveyform2" element={<SurveyForm2 />} />
        <Route path="surveyform3" element={<SurveyForm3 />} />

        {/* Franchise */}
        <Route path="franchise" element={<FranchiseMain />}>
          <Route path="dashboard" element={<FranchiseDashboard />} />
          <Route path="customers" element={<FranchiseCustomers />}>
            <Route path="all-users" element={<FranchiseAllCustomers />} />
          </Route>
          <Route path="new-user" element={<FranchiseNewcustomer />}>
            <Route
              path="general-details"   
            />
            <Route path="current-diet" element={<FranchiesCurrentdiet />} />
            <Route path="family-history" element={<FranchiesFamilyhistory />} />
            <Route path="complains" element={<FranchiesComplains />} />
            <Route path="user-questions" element={<FranchiesQuestions />} />
            <Route path="diagnosis" element={<FranchiesDiagnosis />} />
            <Route path="checkout" element={<FranchiesCheckout />} />
          </Route>
        </Route>

        {/* Error */}
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
