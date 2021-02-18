import React, { useState } from 'react';

import {checkValidity} from '../../../common/utility';
import * as formConst from '../../../common/formConst';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';


import classes from './ResponseForm.module.css';

const ResponseForm = props => {
    const [inputElements, setinputElements] = useState({
        //賞味期限切れ後の経過日数
        expiredDays: {
            elementType: 'select', // htmlに表示する際のタグ
            elementConfig: { // タグ内に記載する要素
                boxSizeMiddle: true,
                options: formConst.expiredDateSelectList,
            },
            value: 1, // 表示する初期値
            validation: {
            },
            valid: false, // 検査の結果有効か否か
            touched:false,
            label: "賞味期限切れ後の経過日数"}, // タッチ済みかどうか
        taste: {
                elementType: 'starrating', // htmlに表示する際のタグ
                elementConfig: { // タグ内に記載する要素
                    size: 30,
                    isHalf: false
                },
                value: 1, // 表示する初期値
                validation: {},
                valid: false, // 検査の結果有効か否か
                touched:false,
                label: "味"}, // タッチ済みかどうか
        appearance: {
                elementType: 'starrating', // htmlに表示する際のタグ
                elementConfig: { // タグ内に記載する要素
                    size: 30,
                    isHalf: false
                },
                value: 1, // 表示する初期値
                validation: {},
                valid: false, // 検査の結果有効か否か
                touched:false,
                label: "見た目"}, // タッチ済みかどうか
        condition: {
                elementType: 'starrating', // htmlに表示する際のタグ
                elementConfig: { // タグ内に記載する要素
                    size: 30,
                    isHalf: false
                },
                value: 1, // 表示する初期値
                validation: {},
                valid: false, // 検査の結果有効か否か
                touched:false,
                label: "食後の体調"}, // タッチ済みかどうか
        comment: {
            elementType: "textarea",
            elementConfig: {
                text: 'text',
                placeholder: "例) 見た目は悪かったが、食後の体調は良好..."
            },
            value: '',
            validation: {},
            valid: false,
            touched:false,
            label: "コメント"},
    })
    
    const onChangeHandler = (event, inputIdentifier) => {
        // 数字全角を半角に修正
        let newValue = event.target.value;
        if (inputIdentifier == "expiredDays") {
            newValue = event.target.value.replace(/[０-９]/g, (input) => String.fromCharCode(input.charCodeAt(0)-0xFEE0))
        }
        const newElement = {...inputElements[inputIdentifier],
            value: newValue,
            valid: checkValidity(newValue, inputElements[inputIdentifier].validation),
            touched: true};
        setinputElements({...inputElements, [inputIdentifier]: newElement});
    };

    const onSubmitHandler = () => {
        const newRes = {
            expiredDays: inputElements["expiredDays"].value,
            appearance: inputElements["appearance"].value,
            taste: inputElements["taste"].value,
            condition: inputElements["condition"].value,
            comment: inputElements["comment"].value,
        }
        props.submitted(newRes);

        // フォームを初期化する
        const newIptElm = {}
        for (let key in inputElements) {
            switch(inputElements[key].elementType) {
                case "starrating":
                case "select":
                    newIptElm[key] = {...inputElements[key], value: 1};
                    break;
                default:
                    newIptElm[key] = {...inputElements[key], value: ''}
            }
        }
        setinputElements(newIptElm);

        // モーダルを閉じる
        props.modalClosed();
    }

    // フォーム表示用のオブジェクトを配列に変換
    const iptElmArr = [];
    for (let key in inputElements) {
        iptElmArr.push({
            id: key,
            config: inputElements[key]
        })
    }

    return (
    <div className={classes.ResponseForm}>
        {iptElmArr.map(e => (
            <Input 
                key={e.id} 
                elementType={e.config.elementType}
                elementConfig={e.config.elementConfig}
                value={e.config.value}
                invalid={!e.config.valid}
                changed={(event) => onChangeHandler(event, e.id)}
                touched={e.config.touched}
                validation={e.config.validation}
                label={e.config.label}
            />
        ))}
        <Button 
            clicked={() => onSubmitHandler()}
            btnType={inputElements["expiredDays"].valid ? "Success" : "Danger"}
            disabled={!inputElements["expiredDays"].valid}
            >送信</Button>
    </div>)
}

export default ResponseForm;