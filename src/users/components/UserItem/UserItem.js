import React from 'react';
import Card from "../../../shared/components/UIElements/Card/Card";
import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import './UserItem.css';

const UserItem = ({id, name, image, placeCount}) => {
  return (
    <li className="user-item" key={id}>
      <Card className="user-item__content">
          <Avatar image={image} alt={name} className="user-item__image"/>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
          </h3>
        </div>
      </Card>
    </li>
  );
};

export default UserItem;
