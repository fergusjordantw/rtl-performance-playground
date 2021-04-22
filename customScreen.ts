import { BoundFunctions, screen } from "@testing-library/dom";
import * as customQueries from "./lazyQueryByRole";

const boundQueries = Object.entries(customQueries).reduce(
  (queries, [queryName, queryFn]) => {
    queries[queryName] = (queryFn as Function).bind(null, document.body);
    return queries;
  },
  {}
) as BoundFunctions<typeof customQueries>;

export default { ...screen, ...boundQueries };
