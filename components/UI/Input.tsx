import React, { useEffect, useReducer } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { InputActionType, inputReducer } from "../../reducers/inputReducer";
import DefaultText from "./DefaultText";

type InputProps = {
  id: string;
  label: string;
  error: boolean;
  errorText: string;
  initialValue?: string;
  initiallyValid?: boolean;
  onInputChange: (input: string, value: string, isValid: boolean) => void;
  email?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
};

const Input = (props: InputProps & TextInputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props?.initialValue ?? "",
    isValid: props?.initiallyValid ?? false,
    touched: false,
  });

  const { id, onInputChange } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(props.id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange]);

  const valueChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: InputActionType.INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: InputActionType.INPUT_BLUR });
  };

  return (
    <View style={styles.control}>
      <DefaultText style={styles.label}>{props.label}</DefaultText>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={valueChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <DefaultText style={styles.error}>{props.errorText}</DefaultText>
        </View>
      )}
    </View>
  );
};

export default React.memo(Input);

const styles = StyleSheet.create({
  control: {
    width: "100%",
  },
  label: {
    color: "#ccc",
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: 18,
    color: "white",
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
});
