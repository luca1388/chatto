import React, { useEffect, useState } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import UserName from './components/Sidebar/UserName/UserName';
import css from './App.css';
// import socket from './socket';
import Chat from './components/Chat/Chat';

const App = props => {
    const [userName, setUserName] = useState(null);

    const onUsernameChangeHandler = username => {
        setUserName(username);
    };

    return (
        <div className={css.App}>
            <Sidebar>
                <UserName onSetUsername={onUsernameChangeHandler} />
            </Sidebar>
            <Chat userName={userName} disabled={!userName} />
            
        </div>
    );
};

export default App;