import * as React from 'react';
import {Image, View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import getTokenBearerName from "../hooks/getTokenBearerName";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                    secureTextEntry={true}
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
                onPress={() => getData()}
            />
        </View>
    );
}
//region Login
const login = (email: string, password: string, deviceName: string) => {

    (async () => {
        const rawResponse = await fetch('http://127.0.0.1:8000/api/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                device_name: deviceName
            })
        });
        const token = await rawResponse.text();
        await storeBearerToken(token);
    })();
}

const storeBearerToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('@bearer_token', token)
    } catch (e) {
        // saving error
    }
}


const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@bearer_token')
        if(value !== null) {
            console.log(value)
        }
    } catch(e) {
        // error reading value
    }
}

//endregion

//region Styles
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
