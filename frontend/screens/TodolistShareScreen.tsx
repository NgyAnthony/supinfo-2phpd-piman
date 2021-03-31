//region Ajout tache - Main screen
import * as React from "react";
import { Text, View } from "../components/Themed";
import { Alert, Image, StyleSheet, TextInput } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import getTokenBearer from "../hooks/auth/getTokenBearer";
import {
  FriendRecord,
  FriendWithPermissions,
} from "../interfaces/FriendsInterface";
import { CheckBox, Icon, ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import { TodolistUsers } from "../interfaces/TodolistsInterface";

// @ts-ignore
export function TodolistShareScreen({ route }) {
  const { todolist_id } = route.params;
  const [authorizedFriends, setAuthorizedFriends] = React.useState<
    TodolistUsers[]
  >([]);
  const [friends, setFriends] = React.useState<FriendWithPermissions[]>([]);

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      paddingLeft: 15,
      paddingRight: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
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
    colorText: {
      color: colors.text,
    },
    listItem: {
      backgroundColor: colors.card,
      color: colors.card,
    },
  });

  const navigation = useNavigation();
  const token = getTokenBearer();

  const onPageFocus = React.useCallback(() => {
    getFriendlist();
    showAuthorized();
  }, [token]);

  useFocusEffect(onPageFocus);

  const switchRead = (id: number) => {
    const newFr = [...friends];
    newFr[id]["read"] = !newFr[id]["read"];
    setFriends(newFr); //set the new state
  };

  const switchWrite = (id: number) => {
    const newFr = [...friends];
    newFr[id]["write"] = !newFr[id]["write"];
    setFriends(newFr); //set the new state
  };

  const switchReadModify = (id: number) => {
    const newFr = [...authorizedFriends];
    newFr[id]["read"] = !newFr[id]["read"];
    setAuthorizedFriends(newFr); //set the new state
  };

  const switchWriteModify = (id: number) => {
    const newFr = [...authorizedFriends];
    newFr[id]["write"] = !newFr[id]["write"];
    setAuthorizedFriends(newFr); //set the new state
  };

  /**
   * Get the friendlist
   */
  const getFriendlist = async () => {
    console.log("Fetch friendlist...");
    const rawResponse = await fetch("http://127.0.0.1:8000/api/friends/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (rawResponse.ok) {
      console.log("Fetch friendlist success.");
      const resp = await rawResponse.json();
      setFriends(resp.data);
    } else {
      console.log(
        "Failed to fetch friendlist !" + rawResponse.status.toString()
      );
    }
  };

  // Update an authorization
  const updateFriendPermission = async (
    todolistUserId: number,
    readAuth: boolean,
    writeAuth: boolean
  ) => {
    console.log(todolistUserId);
    const rawResponse = await fetch("http://127.0.0.1:8000/api/share/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        todolist_user_id: todolistUserId,
        read_auth: readAuth,
        write_auth: writeAuth,
      }),
    });

    if (rawResponse.ok) {
      showAuthorized();
      Alert.alert("Updated permissions !");
    } else {
      Alert.alert("Failed to update permissions !");
    }
  };

  // Send an authorization
  const sendFriendPermission = async (
    selectedFriend: any,
    readAuth: boolean,
    writeAuth: boolean
  ) => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/share/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        selected_friend: selectedFriend,
        todolist_id: todolist_id,
        read_auth: readAuth,
        write_auth: writeAuth,
      }),
    });

    if (rawResponse.ok) {
      navigation.goBack();
      Alert.alert("Sent permission !");
    } else {
      Alert.alert("Failed to give permission !");
    }
  };

  // Get users already shared
  const showAuthorized = async () => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/share/authorized",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          todolist_id: todolist_id,
        }),
      }
    );

    if (rawResponse.ok) {
      const resp = await rawResponse.json();
      setAuthorizedFriends(resp.data);
    } else if (rawResponse.status == 403) {
      Alert.alert("Failed to fetch authorized users !");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>Assigner des permissions</Text>
        {friends.length >= 1 ? (
          friends.map((l: FriendWithPermissions, i) => (
            <ListItem containerStyle={styles.listItem} key={i} bottomDivider>
              <Icon name={"user"} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title style={styles.colorText}>
                  {l.friend.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.colorText}>
                  {l.friend.email}
                </ListItem.Subtitle>
              </ListItem.Content>
              <View style={styles.container}>
                <CheckBox
                  title="Lecture"
                  checked={l.read}
                  onPress={() => switchRead(i)}
                />
                <CheckBox
                  title="Écriture"
                  checked={l.write}
                  onPress={() => switchWrite(i)}
                />
                <Button
                  onPress={() => {
                    if (l.read == undefined) {
                      sendFriendPermission(l.friend.id, false, l.write);
                    } else if (l.write == undefined) {
                      sendFriendPermission(l.friend.id, l.read, false);
                    } else {
                      sendFriendPermission(l.friend.id, l.read, l.write);
                    }
                  }}
                  type={"outline"}
                  title={"Ajouter"}
                />
              </View>
            </ListItem>
          ))
        ) : (
          <Text>Aucun ami.</Text>
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>Modifier des permissions</Text>
        {authorizedFriends.length >= 1 ? (
          authorizedFriends.map((l: TodolistUsers, i) => (
            <ListItem containerStyle={styles.listItem} key={i} bottomDivider>
              <Icon name={"user"} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title style={styles.colorText}>
                  {l.user.name}
                </ListItem.Title>
                <ListItem.Title style={styles.colorText}>
                  {l.user.email}
                </ListItem.Title>
              </ListItem.Content>
              <View style={styles.container}>
                <CheckBox
                  title="Lecture"
                  checked={l.read}
                  onPress={() => switchReadModify(i)}
                />
                <CheckBox
                  title="Écriture"
                  checked={l.write}
                  onPress={() => switchWriteModify(i)}
                />
                <Button
                  onPress={() => {
                    if (l.read == undefined) {
                      updateFriendPermission(l.id, false, l.write);
                    } else if (l.write == undefined) {
                      updateFriendPermission(l.id, l.read, false);
                    } else {
                      updateFriendPermission(l.id, l.read, l.write);
                    }
                  }}
                  type={"outline"}
                  title={"Modifier"}
                />
              </View>
            </ListItem>
          ))
        ) : (
          <Text>Aucun ami.</Text>
        )}
      </View>
    </View>
  );
}

//endregion

//region Styles
//endregion
