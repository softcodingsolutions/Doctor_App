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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* User */}
        <Route path="user" element={<UserMain />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminMain />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
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
            <Route
              path="nutrition-supplements"
              element={<NutritionSupplements />}
            />
          </Route>
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
            <Route path="lab-tests" element={<TreatmentLabTests />} />
          </Route>
          <Route path="list-follow-up" element={<AdminListFollowUp />} />
        </Route>

        {/* Error */}
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
