import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders ToDo List Table - Task Column", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Task/i);
  expect(linkElement.length).toEqual(2);
});

test("Renders ToDo List Table  - Priority Column", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Priority/i);
  expect(linkElement.length).toEqual(2);
});

test("Renders ToDo List Table - Task Column", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Task/i);
  expect(linkElement.length).toEqual(2);
});

test("Renders ToDo List Table  - First Row Task", () => {
  render(<App />);
  const linkElement = screen.getByText(/Pick up Milk/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders ToDo List Table  - First Row Priority", () => {
  render(<App />);
  const linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders New Form Task Element", () => {
  render(<App />);
  const linkElement = screen.getByText(/Task:/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders New Form Priority Element", () => {
  render(<App />);
  const linkElement = screen.getByText(/Priority:/i);
  expect(linkElement).toBeInTheDocument();
});
