import * as React from 'react';
//import DeviceInfo from 'react-native-device-info';


/**
 * This function is supposed to get the name of the device,
 * however since we're using Expo right now it isn't possible.
 * If we eject Expo in the future we'll be able to use DeviceInfo
 */

function getTokenBearerName() {
    const [deviceName, setDeviceName] = React.useState("Device");

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        /*
        async function getDeviceInfo() {
            try {
                DeviceInfo.getDeviceName().then((deviceName) => {
                    setDeviceName(deviceName)
                });
            } catch(e) {
                console.log(e)
            }
        }

        getDeviceInfo()
        */
    }, []);

    return deviceName;
}

export default getTokenBearerName;
