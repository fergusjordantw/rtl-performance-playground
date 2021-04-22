import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { ExampleComponent } from "../ExampleComponent";
import screen from "../customScreen";
import { conditionallyTimedOperation } from "../performanceObserver";
import { performance } from "perf_hooks";

test("getByRole timing playground", async (done) => {
  performance.mark("test-start");

  render(<ExampleComponent shouldTrackTime />);

  fireEvent.click(screen.getByText("Click me"));

  // await act(async () => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, 25);
  //   });
  // });

  await conditionallyTimedOperation(true, "waitFor", async () => {
    let loops = 0;

    await waitFor(() => {
      loops++;

      console.log(`waitFor-${loops} loop start`);

      function markAsFinished(success) {
        performance.mark(`waitFor-${loops} loop end`);

        performance.measure(
          `waitFor-${loops}${success ? " successfully" : " with error"}`,
          `waitFor-${loops} loop start`,
          `waitFor-${loops} loop end`
        );
      }

      try {
        performance.mark(`waitFor-${loops} loop start`);

        expect(screen.getByRole("button")).not.toBeDisabled();
      } catch (e) {
        markAsFinished(false);

        console.warn("Error in waitFor");

        throw e;
      }

      markAsFinished(true);
    });
  });

  performance.mark("test-end");

  performance.measure("test-performance", "test-start", "test-end");

  process.nextTick(done);
});
