import { Alert, AlertOptions } from "react-native";

type AlertMessage = {
  title?: string;
  message?: string;
  buttons?: {
    text: string;
    onPress?: () => void;
  }[];
  alertOptions?: AlertOptions;
};

export const useAlert = () => {
  function showAlert({
    title = "Oops",
    message = "Something went wrong.",
    buttons = [{ text: "Ok" }],
    alertOptions = {},
  }: AlertMessage) {
    Alert.alert(title, message, buttons, alertOptions);
  }

  return {
    showAlert,
  };
};
