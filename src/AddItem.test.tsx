import { render, screen, fireEvent } from "@testing-library/react";
import AddItem, { isValid } from "./AddItem";

const mockAddItem = jest.fn();

test("Renders Input Form", () => {
  render(<AddItem addItem={mockAddItem} />);

  const taskElement = screen.getByText("Task:");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText("Priority:");
  expect(priorityElement).toBeInTheDocument();
});

test("isValid function returns true for valid item", () => {
  expect(isValid({ task: "Test Task", priority: 1 })).toBe(true);
});

test("isValid function returns false for invalid item with empty task", () => {
  expect(isValid({ task: "", priority: 1 })).toBe(false);
});

test("isValid function returns false for invalid item with priority -1", () => {
  expect(isValid({ task: "Test Task", priority: -1 })).toBe(false);
});

test("setTask updates the task state", () => {
  render(<AddItem addItem={mockAddItem} />);
  const taskInput = screen.getByPlaceholderText("Enter task here");
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  expect(taskInput.value).toBe('New Task');
});

test("setPriority updates the priority state", () => {
  render(<AddItem addItem={mockAddItem} />);
  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  fireEvent.change(priorityInput, { target: { value: '2' } });
  expect(priorityInput.value).toBe('2');
});

test("addItem is called with correct parameters when form is submitted", () => {
  render(<AddItem addItem={mockAddItem} />);
  const taskInput = screen.getByPlaceholderText("Enter task here");
  const priorityInput = screen.getByPlaceholderText("Enter priority here");
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(taskInput, { target: { value: 'Task' } });
  fireEvent.change(priorityInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  expect(mockAddItem).toHaveBeenCalledWith({ task: 'Task', priority: 1 });
});
