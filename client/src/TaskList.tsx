import { useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import {
//   AddTaskForm,
//   TaskInput,
//   AddButton,
  TaskLists,
  TaskItem,
  Checkbox,
  TaskTitle,
  TaskMeta,
  PriorityBadge,
  DueDate,
  TaskActions,
  EditButton,
  DeleteButton,
  EditForm,
  EditInput,
  PrioritySelect,
  DueDateInput,
  SaveButton,
  CancelButton,
  ErrorMessage,
  Loading,
  EmptyState,
} from "./styles";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
};

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
};

function TaskList({ tasks, loading, error, fetchTasks }: TaskListProps) {
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskData, setEditTaskData] = useState<Partial<Task>>({});

  const addTask = async () => {
    if (!newTask.trim()) {
      toast.warning("Task cannot be empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask,
          completed: false,
          priority: "medium",
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      setNewTask("");
      toast.success("Task added successfully");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task");
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task");
    }
  };

  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskData({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
    });
  };

  const saveEdit = async () => {
    if (!editTaskId || !editTaskData.title?.trim()) {
      toast.warning("Task title cannot be empty");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/tasks/${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTaskData),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      setEditTaskId(null);
      toast.success("Task updated");
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task");
    }
  };

  return (
    <>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        loading={loading}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading && tasks.length === 0 ? (
        <Loading>Loading tasks...</Loading>
      ) : tasks.length === 0 ? (
        <EmptyState>No tasks yet. Add one above!</EmptyState>
      ) : (
        <TaskLists>
          {tasks.map((task) => (
            <TaskItem key={task.id} completed={task.completed}>
              <Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />

              {editTaskId === task.id ? (
                <EditForm>
                  <EditInput
                    value={editTaskData.title || ""}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        title: e.target.value,
                      })
                    }
                  />
                  <PrioritySelect
                    value={editTaskData.priority || "medium"}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        priority: e.target.value as Task["priority"],
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </PrioritySelect>
                  <DueDateInput
                    type="date"
                    value={editTaskData.dueDate || ""}
                    onChange={(e) =>
                      setEditTaskData({
                        ...editTaskData,
                        dueDate: e.target.value,
                      })
                    }
                  />
                  <SaveButton onClick={saveEdit}>Save</SaveButton>
                  <CancelButton onClick={() => setEditTaskId(null)}>
                    Cancel
                  </CancelButton>
                </EditForm>
              ) : (
                <>
                  <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
                  <TaskMeta>
                    {task.priority && (
                      <PriorityBadge priority={task.priority}>
                        {task.priority}
                      </PriorityBadge>
                    )}
                    {task.dueDate && (
                      <DueDate>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </DueDate>
                    )}
                  </TaskMeta>
                  <TaskActions>
                    <EditButton onClick={() => startEdit(task)}>
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => deleteTask(task.id)}>
                      Delete
                    </DeleteButton>
                  </TaskActions>
                </>
              )}
            </TaskItem>
          ))}
        </TaskLists>
      )}
    </>
  );
}

export default TaskList;
