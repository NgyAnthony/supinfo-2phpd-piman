import * as React from 'react';
import {Image, View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/images/supinfo-logo-2020-quadri-png.png')}
            />
            <Text style={styles.title}>SUPINFO - Todolist</Text>
            <TextInput
                style={{ height: 50, width: 250 }}
                placeholder="Email"
            />
            <Divider style={{ backgroundColor: 'blue' }} />;

            <TextInput
                style={{ height: 50, width: 250 }}
                placeholder="Mot de passe"
            />

            <Button
                title="Se connecter"
                onPress={() => Alert.alert('Button with adjusted color pressed')}
            />
            <Button
                title="S'inscrire"
                onPress={() => Alert.alert('Button with adjusted color pressed')}
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
    logo: {
        width: 150,
        height: 150
    },
});
