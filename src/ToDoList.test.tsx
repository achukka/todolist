import { render, screen } from "@testing-library/react";
import ToDoList from "../src/ToDoList";

test("Renders Empty List div", () => {
  render(<ToDoList items={[]} />);
  const linkElement = screen.getByText("Empty List");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Table with dummy data", () => {
  const items = [{ task: "write test", priority: 1 }];
  render(<ToDoList items={items} />);

  const taskHeaderElement = screen.getByText("Task");
  expect(taskHeaderElement).toBeInTheDocument();

  const priorityHeaderElement = screen.getByText("Priority");
  expect(priorityHeaderElement).toBeInTheDocument();

  const taskElement = screen.getByText("write test");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText("1");
  expect(priorityElement).toBeInTheDocument();
});
