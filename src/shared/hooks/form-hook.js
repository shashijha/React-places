import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        let isFormValid = true;
        for (const inputID in state.inputs) {
          if (inputID === action.inputID) {
            isFormValid = isFormValid && action.isValid;
          } else {
            isFormValid = isFormValid && state.inputs[inputID].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputID]: { value: action.value, isValid: action.isValid },
          },
          isValid: isFormValid
        };
        case "SET_DATA":
        return {
           inputs: action.inputs,
           isValid: action.isFormValid
        }
      default:
        return state;
    }
  };


export const useForm = (initialInputs, initialFormValidity) => {
    const initialState = {
        inputs: initialInputs,
        isValid: initialFormValidity,
      };
      const [formState, dispatch] = useReducer(formReducer, initialState);

      const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: "INPUT_CHANGE",
          value: value,
          isValid: isValid,
          inputID: id
        });
      }, []);

      const setFormData = useCallback((inputData, formValidity) => {
          dispatch({
              type: "SET_DATA",
              inputs: inputData,
              isFormValid : formValidity
          })
      }, []);

      return [ formState, inputHandler, setFormData];
};
