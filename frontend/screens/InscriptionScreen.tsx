//region Register - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Button, Image, StyleSheet, TextInput } from "react-native";

import { AuthContext } from "../store/AuthStore";
import { useNavigation } from "@react-navigation/native";

// @ts-ignore
export function InscriptionScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  // @ts-ignore
  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Nom"
          textContentType={"name"}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          textContentType={"emailAddress"}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Mot de passe"
          secureTextEntry={true}
          textContentType={"password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button
        title="S'inscrire"
        onPress={() => signUp({ name, email, password })}
      />
    </View>
  );
}

//endregion

//region Register - Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  textInput: {
    height: 50,
    width: 250,
  },
});
//endregion
