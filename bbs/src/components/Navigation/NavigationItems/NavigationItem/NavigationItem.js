import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = props => (
    <li className={classes.NavigationItem}>
        <NavLink
            onClick={props.clicked}
            to={props.link}
            exact={props.excat}
            activeClassName={props.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;