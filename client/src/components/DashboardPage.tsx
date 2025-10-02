import { ChangeEvent, useEffect, useState } from "react";
import AgentForm from "./AgentFormModal";

interface TaskType {
  firstName: string;
  phone: number;
  notes: string;
  agent: string;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchtaskdata = async () => {
      const res = await fetch("http://localhost:5000/api/tasks");

      const result = await res.json();
      setData(result);
    };
    fetchtaskdata();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const res = await fetch("http://localhost:5000/api/tasks/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="relative">
      {isOpen && <AgentForm />}
      <div className="w-full h-svh flex justify-center z-0 absolute">
        <div className="w-6/12 h-full flex justify-center items-center">
          <div className="flex flex-col gap-2 w-[10rem] items-center">
            {data.length > 0 ? (
              <div className="flex flex-col gap-4 mt-4">
                {[
                  "68dd9a60be9ccbf05eab3492",
                  "68ddb3678b3fed3985e3a7c4",
                  "68ddb3728b3fed3985e3a7c7",
                  "68ddb37e8b3fed3985e3a7ca",
                  "68ddb3888b3fed3985e3a7cd",
                ].map((agent) => (
                  <div key={agent} className="border p-2">
                    <h2 className="font-bold">{agent}</h2>
                    {data
                      .filter((d) => d.agent === agent)
                      .map((task, idx) => (
                        <div className="flex gap-4" key={idx}>
                          <p>{task.firstName}</p>
                          <p className="text-sm">{task.phone}</p>
                          <p className="text-sm">{task.notes}</p>
                        </div>
                      ))}
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
