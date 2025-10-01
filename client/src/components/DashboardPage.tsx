import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentForm from "./AgentFormModal";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {isOpen && <AgentForm />}
      <div className="w-full h-svh flex justify-center z-0 absolute">
        <div className="w-6/12 h-full flex justify-center items-center">
          <div className="flex flex-col gap-2 w-[10rem] items-center">
            <button onClick={() => setIsOpen(true)} className="p-2">
              Add Agents
            </button>
            <p>or</p>
            <button className="p-2">Upload CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}
