import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { SentFriendRequestInterface } from "../interfaces/SentFriendRequestInterface";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { WaitingSharedTodolist } from "../interfaces/TodolistsInterface";

export default function AccueilScreen() {
  const token = getTokenBearer();
  const [friendRequests, setFriendRequests] = React.useState([]);
  const [sharedRequests, setSharedRequests] = React.useState([]);

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    fullWidth: {
      backgroundColor: colors.background,
      width: "100%",
    },
    containerPadding: {
      padding: 20,
    },
    container: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      maxWidth: 100,
    },
    button: {
      paddingTop: 10,
    },
    wrapperMarginTop: {
      marginTop: 60,
    },
    centerItems: {
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    textInput: {
      width: "100%",
      height: 40,
    },
    textColor: {
      color: colors.text,
    },
    listItem: {
      backgroundColor: colors.card,
      color: colors.card,
    },
  });

  const getFriendRequests = async () => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/show-received",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (rawResponse.ok) {
      const resp = await rawResponse.json();
      setFriendRequests(resp.data);
    }
  };

  const getSharedRequests = async () => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/share/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (rawResponse.ok) {
      const resp = await rawResponse.json();
      setSharedRequests(resp.data);
    }
  };

  const onPageFocus = React.useCallback(() => {
    getFriendRequests();
    getSharedRequests();
  }, [token]);

  const acceptFriend = async (requestId: number) => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/accept",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          friend_request_id: requestId,
        }),
      }
    );

    if (rawResponse.ok) {
      getFriendRequests();
    } else {
      Alert.alert("Echec de la requête !" + rawResponse.status);
    }
  };

  const refuseFriend = async (requestId: number) => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/refuse",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          friend_request_id: requestId,
        }),
      }
    );

    if (rawResponse.ok) {
      getFriendRequests();
    } else {
      Alert.alert("Echec de la requête !" + rawResponse.status);
    }
  };

  const acceptShared = async (requestId: number) => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/share/accept", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        share_request_id: requestId,
      }),
    });

    if (rawResponse.ok) {
      getSharedRequests();
    } else {
      Alert.alert("Echec de la requête !" + rawResponse.status);
    }
  };

  const refuseShared = async (requestId: number) => {
    const rawResponse = await fetch("http://127.0.0.1:8000/api/share/refuse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        share_request_id: requestId,
      }),
    });

    if (rawResponse.ok) {
      getSharedRequests();
    } else {
      Alert.alert("Echec de la requête !" + rawResponse.status);
    }
  };

  useFocusEffect(onPageFocus);

  return (
    <View style={[styles.container, styles.fullWidth, styles.containerPadding]}>
      <View>
        <Text h4 style={styles.title}>
          Demandes d'ami reçues
        </Text>
        {friendRequests.length >= 1 ? (
          friendRequests.map((l: SentFriendRequestInterface, i) => (
            <ListItem containerStyle={styles.listItem} key={i} bottomDivider>
              <Icon name={"user"} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title style={styles.textColor}>
                  {l.user_initiator.email}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.textColor}>
                  {l.user_initiator.name}
                </ListItem.Subtitle>
              </ListItem.Content>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => refuseFriend(l.id)}
                  style={styles.button}
                  type={"outline"}
                  title={"Refuser"}
                />
                <Button
                  onPress={() => acceptFriend(l.id)}
                  style={styles.button}
                  type={"solid"}
                  title={"Accepter"}
                />
              </View>
            </ListItem>
          ))
        ) : (
          <Text style={styles.title}>Aucune demande reçue.</Text>
        )}
      </View>
      <View style={styles.wrapperMarginTop}>
        <Text h4 style={styles.title}>
          Partages de Todolist reçus
        </Text>
        {sharedRequests.length >= 1 ? (
          sharedRequests.map((l: WaitingSharedTodolist, i) => (
            <ListItem containerStyle={styles.listItem} key={i} bottomDivider>
              <Icon name={"bars"} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title style={styles.textColor}>
                  {l.todolist.title}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.textColor}>
                  Todolist de {l.user.name}
                </ListItem.Subtitle>
              </ListItem.Content>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => refuseShared(l.id)}
                  style={styles.button}
                  type={"outline"}
                  title={"Refuser"}
                />
                <Button
                  onPress={() => acceptShared(l.id)}
                  style={styles.button}
                  type={"solid"}
                  title={"Accepter"}
                />
              </View>
            </ListItem>
          ))
        ) : (
          <Text style={styles.title}>Aucune demande reçue.</Text>
        )}
      </View>
    </View>
  );
}
