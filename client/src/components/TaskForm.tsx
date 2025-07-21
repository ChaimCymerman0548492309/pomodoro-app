import { AddTaskForm, TaskInput, AddButton } from "./styles";

type TaskFormProps = {
  newTask: string;
  setNewTask: (value: string) => void;
  addTask: () => void;
  loading: boolean;
};

function TaskForm({ newTask, setNewTask, addTask, loading }: TaskFormProps) {
  return (
    <AddTaskForm
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
      }}
    >
      <TaskInput
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
      />
      <AddButton disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </AddButton>
    </AddTaskForm>
  );
}

export default TaskForm;

