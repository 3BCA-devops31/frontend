import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

// Mock default-exported diet service used by App.jsx
vi.mock("./services/dietService", () => {
  const mockService = {
    getMeals: vi.fn(() => Promise.resolve([])),
    createMeal: vi.fn(() => Promise.resolve({})),
    updateMeal: vi.fn(() => Promise.resolve({})),
    deleteMeal: vi.fn(() => Promise.resolve(undefined)),
    getExercises: vi.fn(() => Promise.resolve([])),
    createExercise: vi.fn(() => Promise.resolve({})),
    updateExercise: vi.fn(() => Promise.resolve({})),
    deleteExercise: vi.fn(() => Promise.resolve(undefined))
  };

  return {
    default: mockService
  };
});

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
