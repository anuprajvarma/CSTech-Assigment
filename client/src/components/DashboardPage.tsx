import { ChangeEvent, useEffect, useState } from "react";
import AgentForm from "./AgentFormModal";

interface TaskType {
  _id: string;
  firstName: string;
  pnone: number;
  notes: string;
  agent: string;
}

interface AgentType {
  _id: string;
  name: string;
  mobile: number;
  countryCode: number;
  email: string;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TaskType[]>([]);
  const [agents, setAgents] = useState<AgentType[]>([]);

  useEffect(() => {
    const fetchtask = async () => {
      const res = await fetch("http://localhost:5000/api/tasks");

      const result = await res.json();
      setData(result);
    };
    fetchtask();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await fetch("http://localhost:5000/api/agent");

      const result = await res.json();
      setAgents(result);
    };
    fetchAgents();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch("http://localhost:5000/api/tasks/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="relative">
      {isOpen && <AgentForm />}
      <div className="w-full h-svh flex justify-center z-0 absolute">
        <div className="w-6/12 h-full flex justify-center">
          <div className="flex flex-col gap-2 w-full">
            {data.length > 0 ? (
              <div className="flex flex-col w-full gap-4 mt-4">
                {agents.map((agent) => (
                  <div key={agent._id} className="border p-2">
                    <h2 className="font-bold">Agent {agent.name}</h2>
                    {data
                      .filter((d) => {
                        return d.agent === agent._id;
                      })
                      .map((task, idx) => {
                        return (
                          <div className="flex w-full gap-4" key={idx}>
                            <p>{task.firstName}</p>
                            <p className="text-sm">{task.pnone}</p>
                            <p className="text-sm">{task.notes}</p>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button onClick={() => setIsOpen(true)} className="p-2">
                  Add Agents
                </button>
                <p>or</p>
                <input type="file" onChange={handleUpload} className="p-2" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
