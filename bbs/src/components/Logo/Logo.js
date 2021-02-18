import React from 'react';

import classes from './Logo.module.css';
import logoImg from '../../assets/images/119959.jpg';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImg} alt="食べても大丈夫？"/>
    </div>
)

export default logo;