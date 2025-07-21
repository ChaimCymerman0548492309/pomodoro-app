import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // חשוב לבדיקות כמו toBeDisabled()
import TaskForm from "./src/components/TaskForm";

describe("TaskForm Component", () => {
  const mockAddTask = jest.fn();
  const mockSetNewTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // נקה mockים בין בדיקות
  });

  it("should call addTask when form is submitted with valid input", async () => {
    render(
      <TaskForm
        newTask="Test Task"
        setNewTask={mockSetNewTask}
        addTask={mockAddTask}
        loading={false}
      />
    );

    // עדיף להשתמש ב-getByRole לכפתורים
    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(button);

    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockSetNewTask).toHaveBeenCalledWith("Updated Task");
  });

  it("should disable button when loading", () => {
    render(
      <TaskForm
        newTask=""
        setNewTask={mockSetNewTask}
        addTask={mockAddTask}
        loading={true}
      />
    );

    const button = screen.getByRole("button", { name: /adding.../i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Adding...");
  });

  it("should not call addTask when input is empty", () => {
    render(
      <TaskForm
        newTask=""
        setNewTask={mockSetNewTask}
        addTask={mockAddTask}
        loading={false}
      />
    );

    const button = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
