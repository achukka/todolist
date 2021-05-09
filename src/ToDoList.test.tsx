import React from "react";
import { render, screen } from "@testing-library/react";
import ToDoList from "../src/ToDoList";

test("Renders Empty ToDo List", () => {
  render(<ToDoList items={[]} />);
  const linkElement = screen.getByText(/Empty List/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders ToDo List with a dummy data", () => {
  const items = [{ task: "write test", priority: 1 }];
  render(<ToDoList items={items} />);

  const taskHeaderElement = screen.getByText(/Task/i);
  expect(taskHeaderElement).toBeInTheDocument();

  const priorityHeaderElement = screen.getByText(/Priority/i);
  expect(priorityHeaderElement).toBeInTheDocument();

  const taskElement = screen.getByText(/write test/i);
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText(/1/i);
  expect(priorityElement).toBeInTheDocument();
});
