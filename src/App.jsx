import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminMain from "./pages/Admin/AdminMain";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminMaster from "./pages/Admin/AdminMaster";
import AdminListFollowUp from "./pages/Admin/AdminListFollowUp";
import Questions from "./pages/Admin/master/Questions";
import ListFranchise from "./pages/Admin/master/ListFranchise";
import Medicine from "./pages/Admin/master/Medicine";
import ExerciseYoga from "./pages/Admin/master/ExerciseYoga";
import NutritionSupplements from "./pages/Admin/master/NutritionSupplements";
import DietMaster from "./pages/Admin/master/DietMaster";
import UserMain from "./pages/User/UserMain";
import UserDashboard from "./pages/User/UserDashboard";

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
            <Route path="exercise-yoga" element={<ExerciseYoga />} />
            <Route
              path="nutrition-supplements"
              element={<NutritionSupplements />}
            />
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
