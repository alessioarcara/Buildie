import { useCallback, useReducer } from "react";

export enum FormActionType {
  FORM_UPDATE = "FORM_UPDATE",
  FORM_RESET = "FORM_RESET",
}

type FormState<T> = {
  inputValues: {
    [K in keyof T]: string;
  };
  inputValidities: {
    [K in keyof T]: boolean;
  };
  formIsValid: boolean;
};

type FormAction = {
  type: FormActionType.FORM_UPDATE;
  payload: { value: string; isValid: boolean; input: string };
};

const createFormReducer =
  <T,>() =>
  (state: FormState<T>, formAction: FormAction): FormState<T> => {
    switch (formAction.type) {
      case FormActionType.FORM_UPDATE:
        const updatedValues = {
          ...state.inputValues,
          [formAction.payload.input]: formAction.payload.value,
        };
        const updatedValidities = {
          ...state.inputValidities,
          [formAction.payload.input]: formAction.payload.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
          if (updatedValidities[key] === false) {
            updatedFormIsValid = false;
            break;
          }
        }
        return {
          formIsValid: updatedFormIsValid,
          inputValues: updatedValues,
          inputValidities: updatedValidities,
        };
      default:
        return state;
    }
  };

const useForm = <
  T extends {
    [key: string]: string;
  }
>(
  form: T
): [FormState<T>, (input: string, value: string, isValid: boolean) => void] => {
  const [formState, dispatchFormState] = useReducer(createFormReducer<T>(), {
    inputValues: {
      ...form,
    },
    inputValidities: Object.keys(form).reduce((acc, curr) => {
      return { ...acc, [curr]: form[curr] ? true : false };
    }, {} as Record<keyof T, boolean>),
    formIsValid: false,
  });

  const valueChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatchFormState({
        type: FormActionType.FORM_UPDATE,
        payload: { value, isValid, input },
      });
    },
    [dispatchFormState]
  );

  return [formState, valueChangeHandler];
};

export default useForm;
