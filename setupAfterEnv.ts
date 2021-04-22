import "@testing-library/jest-dom/extend-expect";
import { MockedResponse, rest } from "msw";
import { setupServer } from "msw/node";
import { conditionallyTimedOperation } from "./performanceObserver";

const server = setupServer(
  rest.get("/test", (req, res, ctx) => {
    const shouldTrackTime = req.url.search.includes("trackTime=true");

    return (conditionallyTimedOperation(
      shouldTrackTime,
      "Return data from msw",
      () => {
        return res(ctx.json({ greeting: "hello there" }));
      }
    ) as unknown) as MockedResponse;
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
