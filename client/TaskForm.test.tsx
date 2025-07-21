import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskForm from "./components/TaskForm";

describe("TaskForm", () => {
  it("allows adding a new task", () => {
    const mockAddTask = jest.fn();
    render(
      <TaskForm
        newTask=""
        setNewTask={() => {}}
        addTask={mockAddTask}
        loading={false}
      />
    );

    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(mockAddTask).toHaveBeenCalled();
  });

  it("disables button when loading", () => {
    render(
      <TaskForm
        newTask=""
        setNewTask={() => {}}
        addTask={() => {}}
        loading={true}
      />
    );

    expect(screen.getByText("Adding...")).toBeDisabled();
  });
});
