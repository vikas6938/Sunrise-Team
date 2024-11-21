import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import PatientRegister from "./components/PatientRegister";
import ForgetPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import AdminRoutes from "./components/AdminRoutes";
import DoctorRoutes from "./components/DoctorRoutes";
import PatientRoutes from "./components/PatientRoutes";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const token = localStorage.getItem("token");  
  const authRedirect = token ? <Navigate to="/" replace /> : null;
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={!token ? <PatientRegister /> : authRedirect} />
        <Route path="/forgot-password" element={!token ? <ForgetPassword /> : authRedirect} />
        <Route path="/enter-otp" element={!token ? <EnterOTP /> : authRedirect} />
        <Route path="/reset-password" element={!token ? <ResetPassword /> : authRedirect} />
        <Route path="/admin-register" element={!token ? <AdminRegister /> : authRedirect} />
        <Route path="/admin/*" element={<ProtectedRoute roles={["admin"]}><BreadcrumbProvider><AdminRoutes /></BreadcrumbProvider></ProtectedRoute>}/>
        <Route path="/doctor/*" element={<ProtectedRoute roles={["doctor"]}><BreadcrumbProvider><DoctorRoutes /></BreadcrumbProvider></ProtectedRoute>}/>
        <Route path="/patient/*"element={<ProtectedRoute roles={["patient"]}><BreadcrumbProvider><PatientRoutes /></BreadcrumbProvider></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
