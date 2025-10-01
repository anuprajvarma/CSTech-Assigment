import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Dashboard from "./components/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
