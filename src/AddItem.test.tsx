import { render, screen } from "@testing-library/react";
import AddItem from "../src/AddItem";

const empty = () => "";

test("Renders Input Form", () => {
  render(<AddItem addItem={empty} />);

  const taskElement = screen.getByText("Task:");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText("Priority:");
  expect(priorityElement).toBeInTheDocument();
});
