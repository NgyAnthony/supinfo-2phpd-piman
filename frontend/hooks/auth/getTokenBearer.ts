import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function getTokenBearer() {
  const [token, setToken] = React.useState("Token not set");

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@bearer_token");
        if (jsonValue != null) {
          setToken(jsonValue);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  return token;
}

export default getTokenBearer;
