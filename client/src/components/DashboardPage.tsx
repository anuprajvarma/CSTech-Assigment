import { ChangeEvent, useEffect, useState } from "react";
import AgentForm from "./AgentFormModal";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TaskType[]>([]);
  const [agents, setAgents] = useState<AgentType[]>([]);

  useEffect(() => {
    const fetchtask = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/tasks`,
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      result.redirect ? navigate("/login") : setData(result);
    };
    fetchtask();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/agent`,
        {
          credentials: "include",
        }
      );

      const result = await res.json();
      result.redirect ? navigate("/login") : setAgents(result);
      setAgents(result);
    };
    fetchAgents();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/tasks/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  };

  const handleSignOut = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/signout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const result = await res.json();

    if (result.redirect) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      {isOpen && <AgentForm setIsOpen={setIsOpen} />}
      <div className="w-full h-svh flex justify-center z-0 absolute mt-8">
        <div className="md:w-6/12 w-full h-full flex flex-col">
          <div className="w-full flex justify-center lg:justify-between">
            <button
              onClick={handleSignOut}
              className="text-xl h-11 p-2 rounded border hidden lg:block"
            >
              Sign Out
            </button>
            <div className="">
              <div className="flex gap-2 justify-between">
                <button
                  className="text-xl p-2 rounded border"
                  onClick={() => setIsOpen(true)}
                >
                  Add Agent
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-xl h-11 p-2 rounded border block lg:hidden"
                >
                  Sign Out
                </button>
              </div>
              <div className="flex items-center">
                <label className="text-xl">upload file:</label>
                <input
                  type="file"
                  onChange={handleUpload}
                  className="p-2 max-w-[14rem]"
                />
              </div>
            </div>
          </div>
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
