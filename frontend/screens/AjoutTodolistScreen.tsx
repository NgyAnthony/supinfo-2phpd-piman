//region Ajout tache - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Alert, Button, Image, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getTokenBearer from "../hooks/auth/getTokenBearer";

// @ts-ignore
export function AjoutTodolistScreen() {
  const [title, setTitle] = React.useState("");
  const navigation = useNavigation();
  const token = getTokenBearer();

  const createTodolist = async () => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/todolist/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title: title,
        }),
      }
    );

    if (rawResponse.ok) {
      navigation.goBack();
    } else {
      Alert.alert("Failed to create todolist !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une Todolist</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Titre"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button title="Ajouter" onPress={() => createTodolist()} />
    </View>
  );
}

//endregion

//region Ajout tache - Styles
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
