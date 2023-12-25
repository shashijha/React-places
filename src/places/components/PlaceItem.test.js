import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen} from "@testing-library/react";
import PlaceItem from "./PlaceItem";

describe("<PlaceItem/>", () => {
  const props = {
        id: 1,
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        title: "Taj Mahal",
        description: "A Beautiful Place!!!",
        address: "Agra India"
  };

  jest.mock("../../shared/context/auth-context", () => ({
    AuthContext: jest.fn(() => mockContext),
  }));

  it("it should render", () => {
    const { container } = render(<PlaceItem {...props} />);
    const component = container.querySelector(".place-item");
    expect(component).toBeInTheDocument();
  });
});
