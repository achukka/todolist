import React from "react";
import { render, screen } from "@testing-library/react";
import AddItem from "../src/AddItem";

const empty = () => "";

test("Renders Input Form", () => {
  render(<AddItem addItem={empty} />);

  const taskElement = screen.getByText(/Task:/i);
  expect(taskElement).toBeInTheDocument();

  const priortiyElement = screen.getByText(/Priority:/i);
  expect(priortiyElement).toBeInTheDocument();
});
