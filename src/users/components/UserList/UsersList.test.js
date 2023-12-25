import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import UsersList from "./UsersList";

describe("<UserList/>", () => {
  const props = {
    items: [
      {
        id: 1,
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Shashi Shekhar Jha",
        places: [],
      },
      {
        id: 2,
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        name: "Shashi Shekhar Jha",
        places: [],
      },
    ],
  };
  it("it should render", () => {
    const { container } = render(<UsersList {...props} />);
    const component = container.querySelector(".users-list");
    expect(component).toBeInTheDocument();
  });

  it("it should render No users found when there are no users present", () => {
    props.items = [];
    render(<UsersList {...props} />);
    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });
});
