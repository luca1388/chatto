import React, { useState, useEffect } from 'react';

import Messages from '../Messages/Messages';
import UserMessage from '../UserMessage/UserMessage';
import socket from '../../socket';
import css from './Chat.css';

const Chat = props => {
    const [messageList, setMessageList] = useState([]);
    const [color, setColor] = useState('#000');

    useEffect( () => {
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
        // TODO cleaning listener when unmounting
    }, []);

    const onSubmitMessageHandler = message => {
        if (!message.length) {
            return false;
        }

        setMessageList(messageList => messageList.concat({
            text: message,
            user: props.userName,
            color: color
        }));
        socket.emit('new-message', {
            text: message,
            user: props.userName,
            color: color
        });
    };
    
    return(
        <div className={css.Chat}>
            <Messages list={messageList} />
            <UserMessage onSubmit={onSubmitMessageHandler} disabled={props.disabled} />
        </div>
    );
};

export default Chat;