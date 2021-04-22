import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { ExampleComponent } from "../ExampleComponent";
import screen from "../customScreen";

describe("bare bones performance test", () => {
  test("getByRole performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    done();
  });

  test("getByRole custom query selector performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.lazyGetByRole("button")).not.toBeDisabled();
    });

    done();
  });

  test("getByText performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.getByText("Click me")).not.toBeDisabled();
    });

    done();
  });
});

describe("performance test with delays before awaits", () => {
  test("getByRole performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await act(async () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 25);
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    done();
  });

  test("getByRole custom query selector performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await act(async () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 25);
      });
    });

    await waitFor(() => {
      expect(screen.lazyGetByRole("button")).not.toBeDisabled();
    });

    done();
  });

  test("getByText performance", async (done) => {
    render(<ExampleComponent />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.getByText("Click me")).not.toBeDisabled();
    });

    done();
  });
});

describe("performance test with extra stuff in the DOM", () => {
  test("getByRole performance", async (done) => {
    render(<ExampleComponent withExtraDOM />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    done();
  });

  test("getByText performance", async (done) => {
    render(<ExampleComponent withExtraDOM />);

    fireEvent.click(screen.getByText("Click me"));

    await waitFor(() => {
      expect(screen.getByText("Click me")).not.toBeDisabled();
    });

    done();
  });
});
