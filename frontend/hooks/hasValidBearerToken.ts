import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

function hasValidBearerToken() {
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function checkBearerToken() {
            try {
                const value = await AsyncStorage.getItem('@bearer_token')
                if(value !== null) {
                    setUserLoggedIn(true);
                }
            } catch(e) {
                // error reading value
            }
        }
        checkBearerToken();
    }, []);

    return userLoggedIn;
}

export default hasValidBearerToken;
