// Arrange - set up the test data, conditions and environment
// Act - run logic that should be tested
// Assert - compare execution results with expected results

import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("<Greeting/> Component", () => {
  test("renders 'Hello World' as a text", () => {
    // Arrange
    render(<Greeting />);
    // Act - nothing in this case

    // Assert
    const containsText = screen.getByText("Hello World", { exact: false });

    expect(containsText).toBeInTheDocument();
  });

  test("renders 'good to see you' if the button was NOT clicked", () => {
    render(<Greeting />);

    const containsText = screen.getByText("good to see you", { exact: false });

    expect(containsText).toBeInTheDocument();
  });

  test("renders 'changed' if the button was clicked", () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed");
    expect(outputElement).toBeInTheDocument();
  });

  test("does NOT render 'good to see you' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    });

    expect(outputElement).toBeNull();
  });
});
