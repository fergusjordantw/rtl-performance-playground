import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { conditionallyTimedOperation } from "./performanceObserver";
import { runMockFetch } from "./fetch";

export const ExampleComponent = ({
  shouldTrackTime = false,
  withExtraDOM = false,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchTestData = async () => {
    conditionallyTimedOperation(shouldTrackTime, "Set loading state", () =>
      setIsLoading(true)
    );

    const response: any = await conditionallyTimedOperation(
      shouldTrackTime,
      "Fetch",
      () => runMockFetch(shouldTrackTime)
    );

    if (response.ok) {
      await conditionallyTimedOperation(shouldTrackTime, "Process JSON", () =>
        response.json()
      );

      conditionallyTimedOperation(shouldTrackTime, "Remove loading state", () =>
        setIsLoading(false)
      );
    }
  };

  return (
    <>
      {withExtraDOM && generateRandomDOM()}
      <button
        role="button"
        disabled={isLoading}
        onClick={() => {
          conditionallyTimedOperation(
            shouldTrackTime,
            "Run click handler",
            fetchTestData
          );
        }}
      >
        Click me
      </button>
    </>
  );
};

const generateRandomDOM = () => {
  return new Array(500)
    .fill(null)
    .map((_, index) => <p key={index}>I am cruft in the DOM</p>);
};
