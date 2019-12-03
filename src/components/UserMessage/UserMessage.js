import React, { useState, useEffect } from 'react';
import { IoMdSend } from "react-icons/io";

import socket from '../../socket';
import css from './UserMessage.css';

const UserMessage = (props) => {
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const TYPING_TIMEOUT = 1000;

    let typingTimeout = null;
    useEffect(() => {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit('typing', {
                id: props.socket,
                typing: false,
                userName: props.userName
            });
            setTyping(false);
        }, TYPING_TIMEOUT);

        return () => {
            clearTimeout(typingTimeout);
        }
    }, [message]);

    const onMessageChangeHandler = event => {
        if (!typing) {
            socket.emit('typing', {
                id: props.socket,
                typing: true,
                userName: props.userName
            });
            setTyping(true);
        }
        setMessage(event.target.value);
    };

    const onSendHandler = event => {
        if (event) {
            event.preventDefault();
        }
        props.onSubmit(message);
        setMessage('');
        return false;
    };

    let inputWrapperClasses = [css.InputWrapper];
    if (props.disabled) {
        inputWrapperClasses.push(css.disabled);
    }

    let typingUsersString;
    switch (props.typingUsers.length) {
        case 0:
            typingUsersString = null;
            break;
        case 1: 
            typingUsersString = <div className={css.TypingUsers}>{props.typingUsers[0].userName + ' is writing ...'}</div>;
            break;
        default: 
            typingUsersString = <div className={css.TypingUsers}>Many users are writing ...</div>;
            break;
    }

    return (
        <div className={css.UserMessageContainer}>
            {typingUsersString}
            <form className={css.SendButtonContainer} onSubmit={onSendHandler}>
                <div className={inputWrapperClasses.join(' ')}>
                    <input disabled={props.disabled} className={css.InputMessage} placeholder="Enter your message" onChange={onMessageChangeHandler} type='text' value={message} />
                    <IoMdSend onClick={onSendHandler} className={css.SendIcon} />
                </div>
            </form>
        </div>
    );
};

export default UserMessage;