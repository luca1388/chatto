import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";

import css from './UserMessage.css';

const UserMessage = (props) => {
    const [message, setMessage] = useState('');

    const onMessageChangeHandler = event => {
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

    return (
        <form className={css.SendButtonContainer} onSubmit={onSendHandler}>
            <div className={css.InputWrapper}>
                <input className={css.InputMessage} placeholder="Enter your message" onChange={onMessageChangeHandler} type='text' value={message} />
                <IoMdSend onClick={onSendHandler} className={css.SendIcon} />
            </div>
        </form>
    );
};

export default UserMessage;