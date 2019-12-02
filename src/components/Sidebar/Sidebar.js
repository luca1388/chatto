import React from 'react';

import css from './Sidebar.css';

const Sidebar = props => {
    return(
        <div className={css.Sidebar}>
            {props.children}
            {/* logo */}
            {/* title */}
            {/* Rooms list (just one) */}
            {/* Users connected */}
        </div>
    );
};

export default Sidebar;