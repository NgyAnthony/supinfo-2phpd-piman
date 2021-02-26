import * as React from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  RefreshControl,
  FlatList,
} from "react-native";
import { Text, Icon, ListItem } from "react-native-elements";

import { View } from "../components/Themed";
import { AuthContext } from "../store/AuthStore";
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { useFocusEffect } from "@react-navigation/native";
import { SentFriendRequestInterface } from "../interfaces/SentFriendRequestInterface";

export default function ParametresScreen() {
  // @ts-ignore
  const { signOut } = React.useContext(AuthContext);
  const [friendEmail, setFriendEmail] = React.useState("");
  const [friend, setFriend] = React.useState({
    id: undefined,
  });
  const [validEmail, setValidEmail] = React.useState(false);
  const [sentFriendRequests, setSentFriendRequests] = React.useState([]);
  const token = getTokenBearer();

  /**
   * Set local properties to default
   */
  const resetFriend = () => {
    setValidEmail(false);
    setFriend({ id: undefined });
  };

  /**
   * Find a user by his email
   * @param email
   */
  const getFriendEmail = async (email: string) => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/find",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    if (rawResponse.ok) {
      const resp = await rawResponse.text();
      if (resp) {
        setValidEmail(true);
        setFriend(JSON.parse(resp));
      } else {
        resetFriend();
      }
    } else {
      resetFriend();
    }
  };

  /**
   * Send a friend request with friend's user ID
   */
  const sendFriendRequest = async () => {
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/send",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          friend_id: friend.id,
        }),
      }
    );

    if (rawResponse.ok) {
      Alert.alert("Demande envoyée !");
    } else {
      Alert.alert("Erreur ! La demande n'a pas pu être envoyée.");
    }
  };

  /**
   * Called on each textinput modification of email
   * @param email
   */
  const handleEmail = (email: string) => {
    setFriendEmail(email);
    getFriendEmail(email);
  };

  /**
   * Get the list of all friend requests sent
   */
  const getRequestsSent = async () => {
    console.log("Fetch friend requests sent...");
    const rawResponse = await fetch(
      "http://127.0.0.1:8000/api/friend-request/show-sent",
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
      console.log("Fetch friend req. success.");
      const resp = await rawResponse.json();
      setSentFriendRequests(resp.data);
    } else {
      console.log(
        "Failed to fetch friend requests sent !" + rawResponse.status.toString()
      );
    }
  };

  const onPageFocus = React.useCallback(() => {
    getRequestsSent();
  }, [token]);

  useFocusEffect(onPageFocus);

  return (
    <View
      style={[styles.container, styles.centerItems, styles.containerPadding]}
    >
      <View style={[styles.fullWidth]}>
        <Text h4>Ajouter un ami</Text>
        <TextInput
          style={styles.textInput}
          textContentType={"emailAddress"}
          placeholder={"Email d'un ami"}
          onChangeText={(text) => handleEmail(text)}
          value={friendEmail}
        />
        {validEmail ? <Text>Ami trouvé !</Text> : null}

        <Button onPress={sendFriendRequest} title="Envoyer" />
      </View>

      <View style={[styles.fullWidth, styles.wrapperMarginTop]}>
        <Text h4>Liste des requêtes d'ami</Text>

        {sentFriendRequests.map((l: SentFriendRequestInterface, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={"user"} type="antdesign" />
            <ListItem.Content>
              <ListItem.Title>{l.user_target.email}</ListItem.Title>
              <ListItem.Subtitle>{l.user_target.name}</ListItem.Subtitle>
              <ListItem.Subtitle>Demande d'ami envoyée.</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={[styles.fullWidth, styles.wrapperMarginTop]}>
        <Text h4>Mon compte</Text>
        <Button onPress={signOut} title="Se déconnecter" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  containerPadding: {
    padding: 20,
  },
  container: {
    flex: 1,
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
    height: 50,
    width: 250,
  },
});
