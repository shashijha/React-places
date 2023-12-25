import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';



const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError} = useHttpClient();
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
  const fetchPlaces = async () => {
    try{
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`,
    );
    setLoadedPlaces(responseData.place);
    }
    catch(err){

    }
  }
  fetchPlaces();
  }, [sendRequest, userId]);

  const onDeleteHandler = (deletePlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceId));
  };

  return <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <div className='center'><LoadingSpinner /></div>}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={onDeleteHandler}/>}
    </React.Fragment>
};

export default UserPlaces;