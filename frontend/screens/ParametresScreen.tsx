import * as React from 'react';
import {Button, DevSettings, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ParametresScreen() {
    return (
        <View style={styles.container}>
            <Button
                onPress={removeBearerToken}
                title="Se déconnecter"
            />
        </View>
    );
}

const removeBearerToken = async () => {
    try {
        await AsyncStorage.removeItem('@bearer_token')
        DevSettings.reload("User logged out, reloading app...")
    } catch (e) {
        // saving error
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
