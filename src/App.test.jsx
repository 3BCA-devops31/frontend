import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

// ✅ Mock the dietService file completely
vi.mock("./services/dietService", () => {
  return {
    getAllDiets: vi.fn(() => Promise.resolve([])),
    addDiet: vi.fn(() => Promise.resolve({})),
    deleteDiet: vi.fn(() => Promise.resolve({}))
  };
});

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
