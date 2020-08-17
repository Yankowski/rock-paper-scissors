import React, {useEffect, useState} from 'react';

const Game: React.FunctionComponent<Props> = (props: Props) => {
    const [users, setUsers] = useState(['']);

    useEffect(() => {
        if (!props.client) return;

        props.client.onmessage = e => {
            const message = JSON.parse(e.data);
            const updatedUsers = users;
            const user = message["user"];
            updatedUsers.push(user);
            setUsers(updatedUsers);
        };
    }, []);

    return (
        <>
            <div>
                <p>Logged users: {users.length}</p>
            </div>
            <div>
                {`Hello ${props.name}`}
            </div>
        </>
    );
};
type Props = {
    name: string,
    users: string[],
    client: WebSocket
}

export default Game;
