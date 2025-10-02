import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.email) {
        localStorage.setItem("user", data._id);
        navigate("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
        <div className="flex justify-center mt-4">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
}
