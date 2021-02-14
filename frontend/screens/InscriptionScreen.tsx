//region Login - Main screen
import * as React from "react";
import {Text, View} from "../components/Themed";
import {Button, Image, StyleSheet, TextInput} from "react-native";

// @ts-ignore
export function InscriptionScreen({authContext, navigation}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    // @ts-ignore
    const { signUp } = React.useContext(authContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={{ justifyContent:"center"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nom"
                    onChangeText={text => setName(text)}
                    value={name}
                />

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
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Button
                title="S'inscrire"
                onPress={() => signUp({name, email, password})}
            />
        </View>
    );
}
//endregion

//region Login - Styles
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
