import React, { useState, useEffect, useRef } from 'react';

import Messages from '../Messages/Messages';
import UserMessage from '../UserMessage/UserMessage';
import socket from '../../socket';
import css from './Chat.css';

const Chat = props => {
    const [messageList, setMessageList] = useState([]);
    const [color, setColor] = useState('#000');
    const [ usersTyping, setUsersTyping ] = useState([]);
    let socketID = useRef(null);

    useEffect( () => {
        socket.on('welcome', data => {
            setColor(data.color);
            console.log(data);
            socketID.current = data.id;
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

        socket.on('typing', data => {
            setUsersTyping( oldState => {
                if (data.typing === false) {
                    return oldState.filter( user => user.id !== data.id);
                } else {
                    return oldState.concat(data);
                }
            });
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
            <UserMessage 
                typingUsers={usersTyping} 
                userName={props.userName} 
                socket={socketID.current} 
                onSubmit={onSubmitMessageHandler} 
                disabled={props.disabled} 
            />
        </div>
    );
};

export default Chat;