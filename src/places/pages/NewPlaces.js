import React, { useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";

const NewPlaces = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { token } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm({
    title:{
      value:'',
      isValid: false
    },
    description:{
      value:'',
      isValid: false
    },
    address:{
      value:'',
      isValid: false
    }
  }, false);
  const placeSubmitHandler = async (event) => {
  event.preventDefault();
  try{
    await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`,'POST', JSON.stringify({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      coordinates: {
        lat: 27.173891,
        lng: 78.042068
    }
    }),
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      });
      history.push('/');
  }catch(err){

  }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Enter your text here"
        errorText="Please Enter a valid text"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Enter your text here"
        errorText="Please Enter a valid text"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
            <Input
        id="address"
        element="input"
        label="Address"
        placeholder="Enter your text here"
        errorText="Please Enter a valid text"
        validators={[VALIDATOR_REQUIRE]}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlaces;
