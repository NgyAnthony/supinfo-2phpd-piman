import * as React from 'react';
import {DevSettings, FlatList, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { User, Task, TodolistInterface } from "../interfaces/TodolistsInterface"

export default function ListesScreen() {
    const [todolists, setTodolists] = React.useState<TodolistInterface[] | undefined>();
    const token = getTokenBearer();

    const getTodolists = () => {
        (async () => {
            const rawResponse = await fetch('http://127.0.0.1:8000/api/get-todolists', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if(rawResponse.ok){
                const resp = await rawResponse.json();
                setTodolists(resp.data)
                console.log(resp)
            }
        })();
    }

    getTodolists()


    // @ts-ignore
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    // @ts-ignore
    const renderItem = ({ item }: { item: RootObject }) => (
        <Item title={item.title} />
    );

    return (
    <View style={styles.container}>
        <FlatList
            data={todolists}
            renderItem={renderItem}
        />
    </View>
  );
}

//region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
//endregion
