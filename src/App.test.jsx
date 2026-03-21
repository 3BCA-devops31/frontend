import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import dietService from "./services/dietService";

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
  it("renders without crashing and displays Today Calories", async () => {
    vi.mocked(dietService.getMeals).mockResolvedValueOnce([]);
    vi.mocked(dietService.getExercises).mockResolvedValueOnce([]);

    render(<App />);
    await waitFor(() => {
      const todayCaloriesElement = screen.getByText("Today Calories");
      const tipElement = screen.getByText(/Tip:/i);
      expect(todayCaloriesElement).toBeTruthy();
      expect(tipElement).toBeTruthy();
    });
  });

  it("renders populated dashboard values from API data", async () => {
    const today = new Date().toISOString().split("T")[0];

    vi.mocked(dietService.getMeals).mockResolvedValueOnce([
      { id: 1, date: today, mealType: "LUNCH", foodName: "Chicken", calories: 300 },
      { id: 2, date: "2026-03-20", mealType: "DINNER", foodName: "Fish", calories: 200 }
    ]);
    vi.mocked(dietService.getExercises).mockResolvedValueOnce([
      { id: 1, date: today, activityName: "Running", minutes: 45 }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Across 2 meals")).toBeTruthy();
      expect(screen.getByText("From 1 meals today")).toBeTruthy();
      expect(screen.getByText("500 kcal")).toBeTruthy();
      expect(screen.getByText("From 1 sessions")).toBeTruthy();
      expect(screen.getByText(/\u00b7 Lunch/)).toBeTruthy();
      expect(screen.getByText(/\u00b7 45 min/)).toBeTruthy();
    });
  });
});
