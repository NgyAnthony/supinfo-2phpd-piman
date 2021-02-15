import * as React from 'react';
import {
    Alert,
    Button,
    CheckBox,
    DevSettings,
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';

import { Text, View } from '../components/Themed';
import getTokenBearer from "../hooks/auth/getTokenBearer";
import { User, Task, TodolistInterface } from "../interfaces/TodolistsInterface"

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ListesScreen() {
    const [todolists, setTodolists] = React.useState<TodolistInterface[] | undefined>();
    const token = getTokenBearer();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchTodolists();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    async function fetchTodolists() {
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
        }
    }

    React.useEffect(() => {
        fetchTodolists();
    }, [token])


    const taskEnded = async (todolistId: any, taskId: any) => {
        const rawResponse = await fetch('http://127.0.0.1:8000/api/deactivate-task', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                todolist_id: todolistId,
                task_id: taskId
            })
        });

        if(rawResponse.ok){
            fetchTodolists()
        } else {
            Alert.alert("Failed to deactivate task !")
        }
    }

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
                        onPress ={() => taskEnded(task.todolist_id, task.id)}
                        title="Terminé"
                    />
                </View>
            </View>
        </View>
    );

    // @ts-ignore
    const renderTask = ({ item }: { item: Task }) => {
        if(item.active == 1){
            return(
                <Task task={item}/>
            )
        } else {
            return null
        }
    };

    // @ts-ignore
    const Item = ({ todolist }) => (
        <View style={styles.todolist}>
            <Text style={styles.title}>{todolist.title}</Text>
            <FlatList
                data={todolist.tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

    // @ts-ignore
    const renderItem = ({ item }: { item: TodolistInterface }) => (
        <Item todolist={item} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.todolistContainer}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
                }
                data={todolists}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

//region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  todolistContainer: {
      width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  regular: {
      fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  todolist: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  task: {
    padding: 6,
    marginVertical: 6,
  },
  taskWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
});
//endregion
