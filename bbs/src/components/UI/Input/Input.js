import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import {DropzoneArea} from 'material-ui-dropzone';

import classes from './Input.module.css';

const input = props => {
    let inputElem = null;
    const inputClasses = [classes.InputElement];

    // 入力内容が正しくない場合
    if (props.shouldValidate && props.touched && !props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    // 数字を入力する場合
    if (props.validation && props.validation.isNumeric) {
        inputClasses.push(classes.Number);
    }

    // セレクトボックスの大きさを変更する場合
    if (props.elementConfig && props.elementConfig.boxSizeMiddle){ 
        inputClasses.push(classes.SelectMiddle);
    }


    switch(props.elementType) {
        case ('input'):
            inputElem = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElem = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElem = <select
                className={inputClasses.join(' ')}
                {...props.elementConfig.selectConfig}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>;
            break;
        case ('starrating'):
            inputElem = <div className={inputClasses.join(' ')}>
                    <div className={classes.StarRatingEvaluate}>
                        <h6>悪い</h6>
                        <h6>良い</h6>
                    </div>
                    <ReactStarsRating 
                        {...props.elementConfig}
                        value={props.value}
                        onChange={(val) => props.changed({target: {value: val}})}/>
                </div>
            break;
        case ('label'):
            inputElem = <div className={classes.LabelElement}>
                <h3>{props.value}</h3>
                </div>
            break;
        case ('dropzone'):
            inputElem = <DropzoneArea
                            {...props.elementConfig}
                            onChange={props.changed}
                            />
            break;
        default:
            inputElem = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>
    )
}

export default input;