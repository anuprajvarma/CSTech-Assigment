import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Dashboard from "./components/DashboardPage";
import PageNotFount from "./components/PageNotFount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </Router>
  );
}

export default App;
