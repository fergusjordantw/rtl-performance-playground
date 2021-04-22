import { fetch as browserFetch } from "whatwg-fetch";
import nodeFetch from "node-fetch";

export const runMockFetch = (shouldTrackTime = false) => {
  // queryParam lets msw know it should wrap its call in a performance measure
  const url = `/test?trackTime=${shouldTrackTime}`;

  if (process.env.FETCH === "browser") {
    return browserFetch(url);
  }

  if (process.env.FETCH === "mock") {
    return mockAlternativetoFetch(url);
  }

  return nodeFetch(`http://localhost${url}`);
};

const mockAlternativetoFetch = (_: any) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ greeting: "hello there" }),
  });
};
