import React from 'react';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import DrawToggle from '../DrawToggle/DrawToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.drawToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems
                addSearchQuery={(query) => props.addSearchQuery(query)}
                isAuthenticate={props.isAuthenticate}/>
        </nav>
    </header>
)

export default toolbar;