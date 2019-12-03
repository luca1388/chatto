import React, { useState } from 'react';

import css from './UserName.css';

const UserName = props => {
    const [ name, setName] = useState("Anonymous");
    const [ disabled, setDisabled ] = useState(false);

    const onChangeNameHandler = event => {
        setName(event.target.value);
    };

    const onClickHandler = event => {
        if (event) {
            event.preventDefault();
        }
        setDisabled(true);
        props.onSetUsername(name);
    };

    return (
        <div className={css.Username}>
            <form onSubmit={onClickHandler}>
                Chat as: <input disabled={disabled} type='text' placeholder="Your nickname" onChange={onChangeNameHandler} />
                <button disabled={disabled} onClick={onClickHandler}>Join!</button>
            </form>
        </div>
    );
};

export default UserName;