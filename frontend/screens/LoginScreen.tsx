//region Login - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Button, Image, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../store/AuthStore";
import { useNavigation, useTheme } from "@react-navigation/native";

// @ts-ignore
export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // @ts-ignore
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const { colors } = useTheme();

  //region Login - Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      backgroundColor: colors.background,
      color: colors.text,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
      color: colors.text,
    },
    logo: {
      width: 150,
      height: 150,
    },
    textInput: {
      height: 50,
      width: 250,
      backgroundColor: colors.background,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/supinfo-logo-2020-quadri-png.png")}
      />
      <Text style={styles.title}>Bienvenue sur Todolist</Text>
      <View style={styles.separator} />

      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={colors.text}
          textContentType={"emailAddress"}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Mot de passe"
          placeholderTextColor={colors.text}
          secureTextEntry={true}
          textContentType={"password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.separator} />

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
//endregion
