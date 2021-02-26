//region Login - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Button, Image, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../store/AuthStore";
import { useNavigation } from "@react-navigation/native";

// @ts-ignore
export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // @ts-ignore
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/supinfo-logo-2020-quadri-png.png")}
      />
      <Text style={styles.title}>Bienvenue sur Todolist</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ justifyContent: "center" }}>
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
        title="Se connecter"
        onPress={() => signIn({ email, password })}
      />
      <Button
        title="Nouvel utilisateur ? S'inscrire"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

//endregion

//region Login - Styles
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
