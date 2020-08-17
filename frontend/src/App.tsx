import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Game from './Game/Game'

const App: React.FunctionComponent = () => {

    const [name, setName] = useState('');
    const [tmpName, setTmpName] = useState('');

    const client = useRef(new WebSocket("ws://127.0.0.1:8000"));

    useEffect(() => {
        client.current.onopen = () => console.log("ws opened");
        client.current.onclose = () => console.log("ws closed");

        return () => {
            client.current.close();
        };
    }, []);

    const handleSubmit = (event: any) => {
        setName(event.target[0].value);
        const dataToSend = JSON.stringify({
            type: "message",
            user: event.target[0].value
        });
        client.current.send(dataToSend);
    };

    const handleTmpName = (event: any) => {
        setTmpName(event.target.value)
    };

    const isNameProvided = () => {
        return name !== '';
    };

    return (
        <div className="App">
            <header className="App-header">
                {isNameProvided() ?
                    <Game name={name}
                          client={client.current}
                          users={[]}
                    /> :
                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter name:
                            <br>
                            </br>
                            <textarea value={tmpName} onChange={handleTmpName}/>
                            <br>
                            </br>
                        </label>
                        <input type="submit" value="Send"/>
                    </form>
                }

            </header>
        </div>
    );
};


export default App;
