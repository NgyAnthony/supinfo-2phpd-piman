import * as React from 'react';
import { getDeviceName } from 'react-native-device-info';

function getTokenBearerName() {
    const [deviceName, setDeviceName] = React.useState("Unknown device");

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function getDeviceInfo() {
            try {
                getDeviceName().then((deviceName) => {
                    setDeviceName(deviceName)
                });
            } catch(e) {
                console.log(e)
            }
        }

        getDeviceInfo()
    }, []);

    return deviceName;
}

export default getTokenBearerName;
