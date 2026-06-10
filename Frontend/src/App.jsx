import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Signup from "./Pages/SignUp";
import LoginPage from "./Pages/LoginPage";
import Donate from "./Pages/DonatePage";
import Volunteers from "./Pages/Volunteers";
import Dashboard from "./Pages/Dashboard";
import AdminPage from "./Pages/AdminPage";
import MapPage from "./Pages/MapPage";
import RequestPage from "./Pages/RequestPage";
import AlertsPage from "./Pages/AlertsPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Navbar from "./Components/Navbar"


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/donate" element={<Donate />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/volunteers" element={<Volunteers />} />

        <Route path="/request" element={<RequestPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;