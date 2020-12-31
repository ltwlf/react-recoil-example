import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { Comments } from "./Comments";
import { usePosts } from "../hooks/usePosts";
import { TestApp } from "../../tests/helpers";
import { handlers } from "../../tests/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
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
});
