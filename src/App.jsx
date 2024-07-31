import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
import CustomerAllUsers from "./pages/Admin/customer/CustomerAllUsers";
import CustomerUserDiagnosis from "./pages/Admin/customer/CustomerUserDiagnosis";
import CustomerGeneralDetails from "./pages/Admin/customer/new_customer/CustomerGeneralDetails";
import NewCustomer from "./pages/Admin/customer/NewCustomer";
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
import DataEntry from "./pages/Admin/appointment/DataEntry";
import FranchiseMain from "./pages/Franchise/FranchiseMain";
import FranchiseDashboard from "./pages/Franchise/FranchiseDashboard";
import FranchiseCustomers from "./pages/Franchise/FranchiseCustomers";
import FranchiseAllCustomers from "./pages/Franchise/customer/FranchiseAllCustomers";
import FranchiseNewcustomer from "./pages/Franchise/customer/FranchiseNewcustomer";
import FranchiesGeneraldetails from "./pages/Franchise/customer/FranchiesGeneraldetails";
import AdminAppointment from "./pages/Admin/AdminAppointment";
import RecepsitnistMain from "./pages/Recepsitnist/RecepsitnistMain";
import CreateRole from "./pages/Recepsitnist/CreateRole";
import RoleAssign from "./pages/Recepsitnist/Role/RoleAssign";
import Appointment from "./pages/Recepsitnist/Appointment";
import CreateAppointment from "./pages/Recepsitnist/Pages/CreateAppointment";
import MedicalInventory from "./pages/Recepsitnist/Pages/MedicalInventory";
import LandingPage from "./pages/LandingPage/LandingPage";
import NewUser from "./pages/Recepsitnist/Newuser/NewUser";
import UserGeneralDetails from "./pages/Recepsitnist/Newuser/UserGeneralDetails";
import GenerateBill from "./pages/Recepsitnist/Pages/GenerateBill";
import UserDiagnosis from "./pages/User/UserDiagnosis";
import BillHistory from "./pages/Recepsitnist/Pages/BillHistory";
import Home from "./pages/Recepsitnist/Pages/Home";
import QueGeneralDetails from "./pages/User/Questions/QueGeneralDetails";
import UserChooseDoctor from "./pages/User/UserChooseDoctor";
import ForgetPassword from "./pages/ForgetPassword";
import ReportGenerate from "./pages/Admin/customer/generate_report/ReportGenerate";
import SurveyMaster from "./pages/Admin/SurveyMaster";
import Healthproblem from "./pages/Admin/surveymaster/Healthproblem";
import Weightgainreason from "./pages/Admin/surveymaster/Weightgainreason";
import ChangePassword from "./pages/ChangePassword";
import SurveyOtp from "./pages/Survey/SurveyOtp";
import SurveyResult from "./pages/Survey/SurveyResult";
import Userdata from "./pages/Admin/surveyuserdata/Userdata";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="signup" element={<UserChooseDoctor />} />

        {/* User */}
        <Route path="user" element={<UserMain />}>
          {/* <Route path="dashboard" element={<UserDashboard />} /> */}
          <Route path="user-diagnosis" element={<UserDiagnosis />}>
            <Route path="profile" element={<ReportProfile />} />
            <Route path="questions" element={<ReportQuestions />} />
            <Route path="past-history" element={<ReportPastHistory />} />
            <Route path="progress-report" element={<ReportProgress />} />
            <Route path="generate-report" element={<ReportGenerate />} />
          </Route>
        </Route>

        {/* User created by itself questions */}
        <Route path="questions" element={<UserQuestions />}>
          <Route path="general-details" element={<QueGeneralDetails />} />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminMain />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* user created by admin */}
          <Route path="new-user" element={<NewCustomer />}>
            <Route
              path="general-details"
              element={<CustomerGeneralDetails />}
            />
          </Route>

          {/* create role */}
          <Route path="create-role" element={<CreateRole />}>
            <Route path="role-assign" element={<RoleAssign />} />
          </Route>

          {/* customers */}
          <Route path="customers" element={<AdminCustomers />}>
            <Route path="all-users" element={<CustomerAllUsers />} />
            <Route path="user-diagnosis" element={<CustomerUserDiagnosis />}>
              <Route path="profile" element={<ReportProfile />} />
              <Route path="questions" element={<ReportQuestions />} />
              <Route path="past-history" element={<ReportPastHistory />} />
              <Route path="lab-tests" element={<TreatmentLabTests />} />
              <Route path="progress-report" element={<ReportProgress />} />
              <Route path="generate-report" element={<ReportGenerate />} />
              <Route path="package" element={<ReportPackage />} />

              {/* customer treatment */}
              <Route path="treatment" element={<ReportTreatment />}>
                <Route path="medicine" element={<RTreatmentMedicine />} />
                <Route path="diet" element={<RTreatmentDiet />} />
                <Route path="nutrition" element={<RTreatmentNutrition />} />
                <Route path="exercise" element={<RTreatmentExercise />} />
                <Route path="dos" element={<RTreatmentDos />} />
                <Route path="donts" element={<RTreatmentDont />} />
              </Route>
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

          {/* Survey Master */}
          <Route path="survey-master" element={<SurveyMaster />}>
            <Route path="health-problem" element={<Healthproblem />} />
            <Route path="weight-gain-reason" element={<Weightgainreason />} />
          </Route>
          <Route path="user-data" element={<Userdata />}/>

          {/* list follow up */}
          <Route path="list-follow-up" element={<AdminListFollowUp />} />

          {/* appointment */}
          <Route path="appointment" element={<AdminAppointment />}>
            <Route path="data-entry" element={<DataEntry />} />
            <Route path="data-mapping" element={<FranchiseNewcustomer />} />
          </Route>
        </Route>

        {/* Receptionist */}
        <Route path="receptionist" element={<RecepsitnistMain />}>
          <Route path="appointment" element={<Appointment />}>
            <Route path="home" element={<Home />} />
            <Route path="generatebill" element={<GenerateBill />} />

            {/* user created by receptionist */}
            <Route path="new-user" element={<NewUser />}>
              <Route path="general-details" element={<UserGeneralDetails />} />
            </Route>

            <Route path="create-appointment" element={<CreateAppointment />} />
            <Route path="medical-inventory" element={<MedicalInventory />} />
            <Route path="bill-history" element={<BillHistory />} />
          </Route>
        </Route>

        {/* Survey */}
        <Route path="survey" element={<SurveyReport />} />
        <Route path="surveyform" element={<SurveyForm />} />
        <Route path="surveyform2" element={<SurveyForm2 />} />
        <Route path="surveyform3" element={<SurveyForm3 />} />
        <Route path="surveyOtp" element={<SurveyOtp />} />
        <Route path="surveyresult" element={<SurveyResult />} />

        {/* Franchise */}
        <Route path="franchise" element={<FranchiseMain />}>
          <Route path="dashboard" element={<FranchiseDashboard />} />

          {/* user created by franchise */}
          <Route path="new-user" element={<FranchiseNewcustomer />}>
            <Route
              path="general-details"
              element={<FranchiesGeneraldetails />}
            />
          </Route>

          {/* Franchise Customers */}
          <Route path="customers" element={<FranchiseCustomers />}>
            <Route path="all-users" element={<FranchiseAllCustomers />} />
            <Route path="user-diagnosis" element={<CustomerUserDiagnosis />}>
              <Route path="profile" element={<ReportProfile />} />
              <Route path="questions" element={<ReportQuestions />} />
              <Route path="past-history" element={<ReportPastHistory />} />
              <Route path="lab-tests" element={<TreatmentLabTests />} />
              <Route path="progress-report" element={<ReportProgress />} />
              <Route path="generate-report" element={<ReportGenerate />} />
              <Route path="package" element={<ReportPackage />} />

              {/* customer treatment */}
              <Route path="treatment" element={<ReportTreatment />}>
                <Route path="medicine" element={<RTreatmentMedicine />} />
                <Route path="diet" element={<RTreatmentDiet />} />
                <Route path="nutrition" element={<RTreatmentNutrition />} />
                <Route path="exercise" element={<RTreatmentExercise />} />
                <Route path="dos" element={<RTreatmentDos />} />
                <Route path="donts" element={<RTreatmentDont />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Error */}
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
