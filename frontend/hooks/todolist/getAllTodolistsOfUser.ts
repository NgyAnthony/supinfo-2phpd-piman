import * as React from 'react';

function getAllTodolistsOfUser() {
    const [todolists, setTodolists] = React.useState([]);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function getData() {

        }

        getData()
    }, []);

    return todolists;
}

export default getAllTodolistsOfUser;
