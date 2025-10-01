import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
