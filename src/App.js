import React, { useEffect, useState } from 'react';
import css from './App.css';
import io from 'socket.io-client';
import { IoMdSend } from "react-icons/io";

const socket = io('http://192.168.0.13:3000');

const App = props => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userName, setUserName] = useState('Anonymous');
    const [color, setColor] = useState('#000');
    const [userTyping, setUserTyping] = useState('');

    useEffect(() => {
        socket.on('welcome', data => {
            setColor(data.color);
        });

        socket.on('new-message', msg => {
            console.log(msg);
            setMessageList(messageList => messageList.concat(msg));
        });

        socket.on('user-connected', () => {
            setMessageList(messageList => messageList.concat({
                text: "New user connected!",
                color: '#000'
            }));
        });

        socket.on('typing', data => {
            setUserTyping(data.user);
        });
        // TODO cleaning listener when unmounting
    }, []);

    const onMessageChangeHandler = event => {
        setMessage(event.target.value);
        socket.emit('typing', {
            user: userName,
            typing: true
        });
    };

    const onUsernameChangeHandler = event => {
        setUserName(event.target.value);
    };

    const onSendHandler = (event) => {
        event.preventDefault();
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
        setMessage('');
        setUserTyping('');
        return false;
    };

    return (
        <div className={css.App}>
            {/*<h1>Chat demo</h1>*/}
            <p className={css.Username}>Your username: <input type='text' value={userName} onChange={onUsernameChangeHandler} /></p>
            <ul className={css.Messages} id="messages">{messageList.map((msg, index) => {
                return <li style={{ color: msg.color }} className={css.Message} key={index}>
                    {msg.user ? msg.user + ': ' : null}{msg.text}
                </li>
            })}
            </ul>
            <div>
                <form className={css.SendButtonContainer} onSubmit={onSendHandler}>
                    {userTyping ? <div className={css.Typing}>{userTyping} is typing ...</div> : null}
                    <div className={css.InputWrapper}>
                        <input className={css.InputMessage} placeholder="Enter your message" onChange={onMessageChangeHandler} type='text' value={message} />
                        <IoMdSend onClick={onSendHandler} className={css.SendIcon} />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default App;