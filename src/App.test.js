import React, { Suspense } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Users from "./users/pages/Users";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { MemoryRouter } from "react-router-dom";

describe("<App/>", () => {
  const mockValues = {
    isLoggedIn: true,
    token: 123,
    userId: 1,
    login: jest.fn(),
    logout: jest.fn(),
  };

  it("it should render Users component when path is /", () => {
    render(
      <AuthContext.Provider value={{ mockValues }}>
        <MemoryRouter initialEntries={["/"]}>
          <Users />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const component = screen.getByTestId("users");
    expect(component).toBeInTheDocument();
  });

    it("it should render Auth component when path is /auth", async () => {
      render(
        <AuthContext.Provider value={{mockValues}}>
            <MemoryRouter initialEntries={["/auth"]}>
           <Auth/>
           </MemoryRouter>
        </AuthContext.Provider>
      );

    const component = await screen.getByTestId("auth");
    expect(component).toBeInTheDocument();
  });
});
