import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import UserItem from "./UserItem";

describe("<UserItem/>", () => {
  const props = {
        id: 1,
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Shashi Shekhar Jha",
        placeCount: 1,
  };
  it("it should render", () => {
    const { container } = render(<UserItem {...props} />);
    const component = container.querySelector(".user-item");
    expect(component).toBeInTheDocument();
  });
});
