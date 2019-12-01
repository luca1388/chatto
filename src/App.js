import React, { useEffect, useState } from 'react';

import UserMessage from './components/UserMessage/UserMessage';
import Messages from './components/Messages/Messages';
import css from './App.css';
import socket from './socket';

const App = props => {
    const [messageList, setMessageList] = useState([]);
    const [userName, setUserName] = useState('Anonymous');
    const [color, setColor] = useState('#000');
    // const [userTyping, setUserTyping] = useState('');

    useEffect(() => {
        socket.on('welcome', data => {
            setColor(data.color);
        });

        socket.on('new-message', msg => {
            setMessageList(messageList => messageList.concat(msg));
        });

        socket.on('user-connected', () => {
            setMessageList(messageList => messageList.concat({
                text: "New user connected!",
                color: '#000'
            }));
        });

        // socket.on('typing', data => {
        //     setUserTyping(data.user);
        // });
        // TODO cleaning listener when unmounting
    }, []);

    const onSubmitMessageHandler = message => {
        if (!message.length) {
            return false;
        }

        setMessageList(messageList => messageList.concat({
            text: message,
            user: userName,
            color: color
        }));
        socket.emit('new-message', {
            text: message,
            user: userName,
            color: color
        });
    };

    const onUsernameChangeHandler = event => {
        setUserName(event.target.value);
    };

    return (
        <div className={css.App}>
            <p className={css.Username}>Your username: <input type='text' value={userName} onChange={onUsernameChangeHandler} /></p>
            <Messages list={messageList} />
            <UserMessage onSubmit={onSubmitMessageHandler} />
        </div>
    );
};

export default App;