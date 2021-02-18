import React from 'react';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import classes from './InputColumn.module.css';

const inputColumn = props => {
    let contents = null;
    let btnVal = null;
    
    if (props.content.type === "label") {
        contents = <h3>{props.content.val}</h3>;
        btnVal = "変更"
    }else {
        contents = <Input 
            elementType={props.content.type}
            value={props.content.val}
            changed={props.changed}/>
        btnVal = "決定"
    }
    
    return (<div className={classes.InputColumn}>
        <h4>{props.id}:</h4>
        {contents}
        <Button 
            btnType="Success"
            clicked={props.clicked}>{btnVal}</Button>
    </div>)
}

export default inputColumn;