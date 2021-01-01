import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { Comments } from "./Comments";
import { TestApp } from "../../tests/helpers";
import { handlers, resetData } from "../../tests/handlers";
import userEvent from "@testing-library/user-event";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetData();
});
afterAll(() => server.close());

describe("Comments Component", () => {
  it("should show comments", async () => {
    render(
      <TestApp>
        <Comments postId={1000} />
      </TestApp>
    );

    await waitFor(() =>
      expect(screen.queryAllByRole("listitem").length).toBe(1)
    );
  });

  it("should add a comment", async () => {
    render(
      <TestApp>
        <Comments postId={1000} />
      </TestApp>
    );

    await screen.findByText("Comments");

    userEvent.type(screen.getByRole("textbox"), "Pretty awesome!");
    userEvent.click(screen.getByRole("button", { name: "Post" }));

    await waitFor(() =>
      expect(screen.queryAllByRole("listitem").length).toBe(2)
    );
  });
});
