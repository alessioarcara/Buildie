import { useCallback } from "react";
import { usePermissions, getExpoPushTokenAsync } from "expo-notifications";

const usePushNotification = () => {
  const [status, requestPermission] = usePermissions();

  const getPushToken = useCallback(async () => {
    let finalStatus;
    let pushToken;
    if (!status?.granted) {
      finalStatus = (await requestPermission()).status;
    }
    if (status?.granted || finalStatus === "granted") {
      pushToken = (await getExpoPushTokenAsync()).data;
    }
    return pushToken;
  }, [status, requestPermission]);

  return getPushToken;
};

export default usePushNotification;
