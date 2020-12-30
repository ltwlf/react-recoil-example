import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest, ResponseResolver, RestContext, MockedRequest } from "msw";
import { setupServer } from "msw/node";
import { RecoilRoot } from "recoil";
import { Posts } from "./Posts";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Posts Component", () => {
  const TestApp = ({ children }: React.PropsWithChildren<any>) => (
    <RecoilRoot>
      <React.Suspense fallback={<div>loading...</div>}>
        {children}
      </React.Suspense>
    </RecoilRoot>
  );

  it("should show post list", async () => {
    render(
      <TestApp>
        <Posts />
      </TestApp>
    );

    await waitFor(() =>
      expect(screen.queryAllByRole("listitem").length).toBe(3)
    );
  });

  it("should load post details", async () => {
    render(
      <TestApp>
        <Posts />
      </TestApp>
    );

    await waitFor(() => screen.getByRole("list"));
    fireEvent.click(screen.getByText(/My post 1000/));
    await waitFor(() =>
      expect(screen.getByRole("article")).toBeInTheDocument()
    );
  });

  it("should refresh post details", async () => {
    render(
      <TestApp>
        <Posts />
      </TestApp>
    );

    await waitFor(() => screen.getByRole("list"));
    fireEvent.click(screen.getByText(/My post 1000/));
    await waitFor(() => screen.getByRole("article"));
    fireEvent.click(screen.getByRole("button", { name: "refresh" }));
    await waitFor(() => screen.getByRole("article"));
  });

  it("should navigate back to post list", async () => {
    render(
      <TestApp>
        <Posts />
      </TestApp>
    );

    await waitFor(() => screen.getByRole("list"));
    fireEvent.click(screen.getByText(/My post 1000/));
    await waitFor(() => screen.getByRole("article"));
    fireEvent.click(screen.getByRole("button", { name: "back" }));
    await waitFor(() => screen.getByRole("list"));
  });
});

const mockPosts = [
  {
    userId: 1,
    id: 1000,
    title: "My post 1000",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 1001,
    title: "My post 1001",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 2,
    id: 1002,
    title: "My post 1002",
    body:
      "expedita maiores dignissimos facilis ipsum est rem est fugit velit sequi eum odio dolores dolor totam occaecati ratione eius rem velit",
  },
];

const resolveTwoPosts: ResponseResolver<MockedRequest, RestContext, any> = (
  req,
  res,
  ctx
) => {
  return res(ctx.set("Access-Control-Allow-Origin", "*"), ctx.json(mockPosts));
};

const resolvePost: ResponseResolver<MockedRequest, RestContext, any> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.set("Access-Control-Allow-Origin", "*"),
    ctx.json(mockPosts[0])
  );
};

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts", resolveTwoPosts),
  rest.get("https://jsonplaceholder.typicode.com/posts/*", resolvePost)
);
