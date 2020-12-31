import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { Posts } from "./Posts";
import { TestApp } from "../../tests/helpers";
import { handlers } from "../../tests/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Posts Component", () => {
  it("should show post list", async () => {
    render(<Posts />, { wrapper: TestApp });
    await waitFor(() =>
      expect(screen.queryAllByRole("listitem").length).toBe(3)
    );
  });

  it("should load post details", async () => {
    render(<Posts />, { wrapper: TestApp });
    await waitFor(() => screen.getByRole("list"));
    fireEvent.click(screen.getByText(/My post 1000/));
    await waitFor(() =>
      expect(screen.getByRole("article")).toBeInTheDocument()
    );
  });

  it("should refresh post details", async () => {
    render(<Posts />, { wrapper: TestApp });
    await screen.findByRole("list");
    fireEvent.click(screen.getByText(/My post 1000/));
    await screen.findByRole("article");
    fireEvent.click(screen.getByRole("button", { name: "refresh" }));
    await waitFor(() => screen.getByRole("article"));
  });

  it("should navigate back to post list", async () => {
    render(<Posts />, { wrapper: TestApp });
    await screen.findByRole("list");
    fireEvent.click(screen.getByText(/My post 1000/));
    await screen.findByRole("article");
    fireEvent.click(screen.getByRole("button", { name: "back" }));
    await waitFor(() => screen.getByRole("list"));
  });
});
