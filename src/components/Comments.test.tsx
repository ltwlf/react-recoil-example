import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { Comments } from "./Comments";
import { usePosts } from "../hooks/usePosts";
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
  const SelectPost = ({ id }: { id: number }) => {
    const { select } = usePosts();
    React.useEffect(() => select(id), []);
    return null;
  };

  it("should show empty comments", async () => {
    render(
      <TestApp>
        <Comments />
      </TestApp>
    );

    await waitFor(() =>
      expect(screen.queryAllByRole("comment").length).toBe(0)
    );
  });

  it("should show comments", async () => {
    render(
      <TestApp>
        <SelectPost id={1000} />
        <Comments />
      </TestApp>
    );

    await waitFor(() =>
      expect(screen.queryAllByRole("comment").length).toBe(1)
    );
  });

  it("should add a comment", async () => {
    render(
      <TestApp>
        <SelectPost id={1000} />
        <Comments />
      </TestApp>
    );

    await screen.findByText("Comments");

    userEvent.type(screen.getByRole("textbox"), "Pretty awesome!");
    userEvent.click(screen.getByRole("button", { name: "Post" }));

    await waitFor(() =>
      expect(screen.queryAllByRole("comment").length).toBe(2)
    );
  });
});
