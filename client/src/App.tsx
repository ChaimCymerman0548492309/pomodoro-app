import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import { AppContainer, Header, Nav, NavButton, MainContent } from "./styles";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
};

const Views = {
  TASKS: "tasks",
  STATS: "stats",
} as const;
type Views = (typeof Views)[keyof typeof Views];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<Views>(Views.TASKS);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/tasks");

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <AppContainer>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header>
        <h1>Pomodoro Task Manager</h1>
        <Nav>
          <NavButton
            active={currentView === Views.TASKS}
            onClick={() => setCurrentView(Views.TASKS)}
          >
            Tasks
          </NavButton>
          <NavButton
            active={currentView === Views.STATS}
            onClick={() => setCurrentView(Views.STATS)}
          >
            Statistics
          </NavButton>
        </Nav>
      </Header>

      <MainContent>
        {currentView === Views.TASKS ? (
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            fetchTasks={fetchTasks}
          />
        ) : (
          <TaskStats tasks={tasks} />
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
