import { render, screen } from "@testing-library/react";
import { expect, jest } from "@jest/globals";

import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    // not sending unnecesarry requests
    // simulating requests
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "Test post" }],
    });

    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");

    expect(listItemElements).not.toHaveLength(0);
  });
});
