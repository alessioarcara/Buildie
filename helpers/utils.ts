import { Alert } from "react-native";

export const handleErrorResponse = (
  error: string = "Something went wrong!"
) => {
  Alert.alert("There's a problem", error), [{ text: "Okay" }];
};
