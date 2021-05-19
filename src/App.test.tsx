import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Task Label", () => {
  render(<App />);
  const linkElement = screen.getByText("Task:");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Priority Label", () => {
  render(<App />);
  const linkElement = screen.getByText("Priority:");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Table Header - Task Column", () => {
  render(<App />);
  const linkElement = screen.getByText("Task");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Table Header - Priority Column", () => {
  render(<App />);
  const linkElement = screen.getByText("Priority");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Table  - First Row Task", () => {
  render(<App />);
  const linkElement = screen.getByText("Pick up Milk");
  expect(linkElement).toBeInTheDocument();
});

test("Renders Table  - First Row Priority", () => {
  render(<App />);
  const linkElement = screen.getByText("1");
  expect(linkElement).toBeInTheDocument();
});
