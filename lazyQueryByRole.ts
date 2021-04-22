import { queryHelpers } from "@testing-library/dom";

export const lazyQueryByRole = queryHelpers.queryByAttribute.bind(null, "role");

export const lazyQueryAllByRole = queryHelpers.queryAllByAttribute.bind(
  null,
  "role"
);

export function lazyGetAllByRole(container, role, ...rest) {
  const els = lazyQueryAllByRole(container, role, ...rest);

  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [role="${role}"]`,
      container
    );
  }
  return els;
}

export function lazyGetByRole(...args) {
  // @ts-ignore
  const result = lazyGetAllByRole(...args);

  if (result.length > 0) {
    return result[0];
  }
  return null;
}
