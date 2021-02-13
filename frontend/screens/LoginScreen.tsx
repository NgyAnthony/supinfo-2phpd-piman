import * as React from 'react';
import {Image, View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import getTokenBearerName from "../hooks/getTokenBearerName";

export default function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const deviceName = getTokenBearerName();

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/images/supinfo-logo-2020-quadri-png.png')}
            />
            <Text style={styles.title}>Bienvenue sur Todolist</Text>
            <View style={{height: 150, justifyContent:"center"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Mot de passe"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>

            <Button
                title="Se connecter"
                onPress={() => login(email, password, deviceName)}
            />
            <Button
                title="S'inscrire"
                onPress={() => Alert.alert('Button with adjusted color pressed')}
            />
        </View>
    );
}

const login = (email: string, password: string, deviceName: string) => {
    return fetch('http://127.0.0.1:8000/api/token', {
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            device_name: deviceName
        })
    });
}

//region Styles 2
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
    textInput: {
        height: 50,
        width: 250,
    },
});
//endregion
