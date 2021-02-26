import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { SentFriendRequestInterface } from "../interfaces/SentFriendRequestInterface";
import { useFocusEffect } from "@react-navigation/native";

export default function AccueilScreen() {
  const token = getTokenBearer();
  const [friendRequests, setFriendRequests] = React.useState([]);
  const [sharedRequests, seSharedRequests] = React.useState([]);

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

  const onPageFocus = React.useCallback(() => {
    getFriendRequests();
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

  useFocusEffect(onPageFocus);

  return (
    <View style={[styles.container, styles.fullWidth, styles.containerPadding]}>
      <View>
        <Text h4>Demandes d'ami reçues</Text>
        {friendRequests.length >= 1 ? (
          friendRequests.map((l: SentFriendRequestInterface, i) => (
            <ListItem key={i} bottomDivider>
              <Icon name={"user"} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title>{l.user_initiator.email}</ListItem.Title>
                <ListItem.Subtitle>{l.user_initiator.name}</ListItem.Subtitle>
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
          <Text>Aucune demande reçue.</Text>
        )}
      </View>
      <View style={styles.wrapperMarginTop}>
        <Text h4>Partages de Todolist reçus</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    backgroundColor: "white",
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
});
