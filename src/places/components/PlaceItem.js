import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PlaceItem.css";

const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  location,
  onDelete
}) => {
  const { isLoading, error, sendRequest, clearError} = useHttpClient();
  const { isLoggedIn, token } = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showWarningModalHandler = () => setShowConfirmModal(true);

  const cancelWarningModalHandler = () => setShowConfirmModal(false);

  const confirmWarningModalHandler = async() => {
    setShowConfirmModal(false);
    try{
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`, 'DELETE',
      null,
      {
        Authorization: 'Bearer ' + token
      });
      onDelete(id);
    }catch(err){

    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelWarningModalHandler}
        header="Are you Sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelWarningModalHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmWarningModalHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete the place? Please note that it can't
          be done thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && (
              <React.Fragment>
                {<Button to={`/places/${id}`}>EDIT</Button>}
                <Button danger onClick={showWarningModalHandler}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
