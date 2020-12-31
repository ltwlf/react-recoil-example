import { rest } from "msw";
import { postListFixture, commentListFixtures } from "./fixtures";

const baseUrl = `https://jsonplaceholder.typicode.com`;

let comments = { ...commentListFixtures };

export const resetData = () => {
  comments = commentListFixtures;
};

export const handlers = [
  rest.get(`${baseUrl}/posts`, (req, res, ctx) =>
    res(ctx.set("Access-Control-Allow-Origin", "*"), ctx.json(postListFixture))
  ),
  rest.get(`${baseUrl}/posts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.set("Access-Control-Allow-Origin", "*"),
      ctx.json(postListFixture.find((x) => x.id === parseInt(id)))
    );
  }),
  rest.get(
    "https://jsonplaceholder.typicode.com/posts/:id/comments",
    (req, res, ctx) => {
      return res(
        ctx.set("Access-Control-Allow-Origin", "*"),
        ctx.json(comments)
      );
    }
  ),
  rest.post(
    "https://jsonplaceholder.typicode.com/comments",
    (req, res, ctx) => {
      comments.push({
        ...(req.body as any),
        id: comments[comments.length - 1].id + 1,
      });
      return res(
        ctx.set("Access-Control-Allow-Origin", "*"),
        ctx.json(req.body)
      );
    }
  ),
];
