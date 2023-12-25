import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen} from "@testing-library/react";
import PlaceList from "./PlaceList";

describe("<PlaceList/>", () => {
  const props = {
    items : [{
        id: 1,
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        title: "Taj Mahal",
        description: "A Beautiful Place!!!",
        address: "Agra India",
    }],
    onDelete: jest.fn()
  };

  it("it should render", () => {
    const { container } = render(<PlaceList {...props} />);
    const component = container.querySelector(".place-list");
    expect(component).toBeInTheDocument();
  });
});