import * as React from "react";
import { Button, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { AuthContext } from "../App";

export default function ParametresScreen() {
  // @ts-ignore
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button onPress={signOut} title="Se déconnecter" />
    </View>
  );
}

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
});
