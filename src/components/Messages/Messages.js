import React from 'react';

import css from './Messages.css';
const Messages = (props) => {
    return (
        <ul className={css.Messages} id="messages">{props.list.map((msg, index) => {
            return <li style={{ color: msg.color }} className={css.Message} key={index}>
                {msg.user ? msg.user + ': ' : null}{msg.text}
            </li>
        })}
        </ul>
    );
};

export default Messages;