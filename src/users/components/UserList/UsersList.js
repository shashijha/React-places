import React from "react";

import UserItem from "../UserItem/UserItem";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./UsersList.css";

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card className="center">
        <h2>No users found.</h2>
      </Card>
    );
  }

  return (
    <ul className="users-list">
      {items.map(({ id, image, name, places }) => (
        <UserItem
          key={id}
          id={id}
          image={image}
          name={name}
          placeCount={places.length || 3}
        />
      ))}
    </ul>
  );
};

export default UsersList;
