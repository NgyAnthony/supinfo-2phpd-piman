import * as React from "react";
import { Alert, FlatList, RefreshControl, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { Task, TodolistInterface } from "../interfaces/TodolistsInterface";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TodolistsContext } from "../store/TodolistsStore";
import { useContext } from "react";
import { Button, Divider } from "react-native-elements";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ListesScreen() {
  const [{ todolists }, dispatch]: any = useContext(TodolistsContext);
  const token = getTokenBearer();
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTodolists();
    wait(1000).then(() => setRefreshing(false));
  }, [token]);

  const onPageFocus = React.useCallback(() => {
    fetchTodolists();
  }, [token]);

  async function fetchTodolists() {
    console.log("Fetch todolists called...");
    console.log(token);
    const rawResponse = await fetch("http://127.0.0.1:8000/api/todolist/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (rawResponse.ok) {
      const resp = await rawResponse.json();
      console.log("Fetch todolist success.");
      dispatch({
        type: "update",
        newTodolists: resp.data,
      });
    } else {
      console.log("Failed ! Can't fetch todolists." + rawResponse.status);
    }
  }

  useFocusEffect(onPageFocus);

  const taskEnded = async (todolistId: any, taskId: any) => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/task/deactivate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          todolist_id: todolistId,
          task_id: taskId,
        }),
      }
    );

    if (rawResponse.ok) {
      fetchTodolists();
    } else {
      Alert.alert("Failed to deactivate task !");
    }
  };

  // @ts-ignore
  const Task = ({ task }) => (
    <View style={styles.task}>
      <View style={styles.taskWrapper}>
        <View>
          <Text style={styles.subTitle}>{task.title}</Text>
          <Text style={styles.regular}>{task.description}</Text>
        </View>
        <View>
          <Button
            type={"outline"}
            onPress={() => taskEnded(task.todolist_id, task.id)}
            title="Terminé"
          />
        </View>
      </View>
    </View>
  );

  // @ts-ignore
  const renderTask = ({ item }: { item: Task }) => {
    if (item.active == 1) {
      return <Task task={item} />;
    } else {
      return null;
    }
  };

  // @ts-ignore
  const Item = ({ todolist }) => (
    <View style={styles.todolist}>
      <Text style={styles.title}>{todolist.title}</Text>
      {todolist.tasks.length >= 1 ? (
        <FlatList
          data={todolist.tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Aucune tâche</Text>
      )}
      <Button
        style={{ marginTop: 25 }}
        onPress={() =>
          navigation.navigate("AjoutTacheScreen", { todolist_id: todolist.id })
        }
        title="Ajouter une tâche"
      />

      <Button
        style={{ marginTop: 10 }}
        onPress={() =>
          navigation.navigate("TodolistShareScreen", {
            todolist_id: todolist.id,
          })
        }
        title="Partager"
      />
    </View>
  );

  // @ts-ignore
  const renderItem = ({ item }: { item: TodolistInterface }) => (
    <Item todolist={item} />
  );

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("AjoutTodolistScreen")}
        title="Créer une todolist"
      />
      {todolists.length >= 1 ? (
        <FlatList
          contentContainerStyle={styles.todolistContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={todolists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Aucune todolist.</Text>
      )}
    </View>
  );
}

//region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  todolistContainer: {
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  todolist: {
    backgroundColor: "#ecf0f1",
    padding: 20,
    marginTop: 20,
  },
  task: {
    padding: 6,
    marginVertical: 6,
  },
  taskWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  regular: {
    fontSize: 14,
  },
});
//endregion
