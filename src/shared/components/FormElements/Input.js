import React, { useEffect, useReducer } from "react";
import { validate } from "../../utils/validators";
import "./Input.css";

const Input = (props) => {
  const initialState = { value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false };
  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          value: action.value,
          isValid: validate(action.value, action.validators),
        };
      case "TOUCH":
        return {
          ...state,
          isTouched: true,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { id, onInput } = props;
  const { value, isValid } = state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  const onTouchedHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        value={state.value}
        onBlur={onTouchedHandler}
      />
    ) : (
      <textarea
        id={props.id}
        row={props.row || 3}
        onChange={onChangeHandler}
        value={state.value}
        onBlur={onTouchedHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !state.isValid && state.isTouched && `form-control--invalid`
      }`}
    >
      <label>{props.label}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
