//region Ajout tache - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Alert, Button, Image, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getTokenBearer from "../hooks/auth/getTokenBearer";

// @ts-ignore
export function AjoutTacheScreen({ route }) {
  const { todolist_id } = route.params;

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tag, setTag] = React.useState("");
  const navigation = useNavigation();
  const token = getTokenBearer();

  const createTask = async () => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/create-task", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
        todolist_id: todolist_id,
      }),
    });

    if (rawResponse.ok) {
      navigation.goBack();
    } else {
      Alert.alert("Failed to create task !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une tâche</Text>
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
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Tag"
          onChangeText={(text) => setTag(text)}
          value={tag}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button title="Ajouter" onPress={() => createTask()} />
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
