import React from "react";
import "./PlaceList.css";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = ({ items, onDelete }) => {
  return (
    <React.Fragment>
      {items.length === 0 && (
        <div className="place-list center">
          <Card>
            <h2>No Places found. Try Creating new</h2>
            <Button to="/places/new">Share one</Button>
          </Card>
        </div>
      )}
      <ul className="place-list">
        {items.map(({ id, image, title, description, creatorId, location, address}) => (
          <PlaceItem
            key={id}
            id={id}
            title={title}
            image={image}
            description={description}
            creatorId={creatorId}
            coordinates={location}
            address={address}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default PlaceList;
