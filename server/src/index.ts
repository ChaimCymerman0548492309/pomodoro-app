import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Types
type Priority = "low" | "medium" | "high";
interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: Priority;
  createdAt: string;
  updatedAt: string;
}

interface Database {
  tasks: Task[];
}

// File paths
const dataDir = path.join(__dirname, "../data");
const dataFile = path.join(dataDir, "data.json");

// Initialize data file
const initializeDataFile = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const initialData: Database = { tasks: [] };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
};

initializeDataFile();

// Helper functions
const readData = (): Database => {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    return { tasks: [] };
  }
};

const writeData = (data: Database) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to data file:", error);
    throw error;
  }
};

// API Endpoints

// Get all tasks with filtering options
app.get("/tasks", (req, res) => {
  try {
    const { completed, priority, sortBy } = req.query;
    let { tasks } = readData();

    // Filtering
    if (completed) {
      const isCompleted = completed === "true";
      tasks = tasks.filter((task) => task.completed === isCompleted);
    }

    if (priority) {
      tasks = tasks.filter((task) => task.priority === priority);
    }

    // Sorting
    if (sortBy) {
      switch (sortBy) {
        case "dueDate":
          tasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return (
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          });
          break;
        case "priority":
          const priorityOrder: Record<Priority, number> = {
            high: 1,
            medium: 2,
            low: 3,
          };
          tasks.sort((a, b) => {
            const aPriority = a.priority || "medium";
            const bPriority = b.priority || "medium";
            return priorityOrder[aPriority] - priorityOrder[bPriority];
          });
          break;
        case "createdAt":
          tasks.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
      }
    }

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get task statistics
app.get("/tasks/stats", (req, res) => {
  try {
    const { tasks } = readData();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const priorityCounts = tasks.reduce((acc, task) => {
      const priority = task.priority || "medium";
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<Priority, number>);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      priorityCounts,
    });
  } catch (error) {
    console.error("Error fetching task statistics:", error);
    res.status(500).json({ error: "Failed to fetch task statistics" });
  }
});

// Create a new task
app.post("/tasks", (req, res) => {
  try {
    const { title, dueDate, priority } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Title is required and must be a non-empty string" });
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ error: "Invalid due date format" });
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
      return res
        .status(400)
        .json({ error: "Priority must be one of: low, medium, high" });
    }

    const data = readData();
    const now = new Date().toISOString();

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      dueDate: dueDate || undefined,
      priority: priority || "medium",
      createdAt: now,
      updatedAt: now,
    };

    data.tasks.push(newTask);
    writeData(data);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  try {
    const taskId = req.params.id;
    console.log("🚀 ~ app.put ~ taskId:", taskId)
    const { title, completed, dueDate, priority } = req.body;
    const data = readData();
    console.log("🚀 ~ app.put ~ data:", data)

    const taskIndex = data.tasks.findIndex((t) => t.id == taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = { ...data.tasks[taskIndex] };

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return res
          .status(400)
          .json({ error: "Title must be a non-empty string" });
      }
      updatedTask.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be a boolean" });
      }
      updatedTask.completed = completed;
    }

    if (dueDate !== undefined) {
      if (dueDate === null) {
        updatedTask.dueDate = undefined;
      } else if (isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ error: "Invalid due date format" });
      } else {
        updatedTask.dueDate = dueDate;
      }
    }

    if (priority !== undefined) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res
          .status(400)
          .json({ error: "Priority must be one of: low, medium, high" });
      }
      updatedTask.priority = priority;
    }

    updatedTask.updatedAt = new Date().toISOString();
    data.tasks[taskIndex] = updatedTask;
    writeData(data);

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  try {
    const taskId = req.params.id;
    const data = readData();

    const initialLength = data.tasks.length;
    data.tasks = data.tasks.filter((t) => t.id !== taskId);

    if (data.tasks.length === initialLength) {
      return res.status(404).json({ error: "Task not found" });
    }

    writeData(data);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation:`);
  console.log(`- GET /tasks - Get all tasks`);
  console.log(`- GET /tasks/stats - Get task statistics`);
  console.log(`- POST /tasks - Create a new task`);
  console.log(`- PUT /tasks/:id - Update a task`);
  console.log(`- DELETE /tasks/:id - Delete a task`);
});

export default app;
