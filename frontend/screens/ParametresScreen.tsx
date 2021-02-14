import * as React from 'react';
import {Button, DevSettings, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {Context} from "react";

export default function ParametresScreen({authContext}: {authContext: Context<any>}) {
    const { signOut } = React.useContext(authContext);

    return (
        <View style={styles.container}>
            <Button
                onPress={signOut}
                title="Se déconnecter"
            />
        </View>
    );
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
