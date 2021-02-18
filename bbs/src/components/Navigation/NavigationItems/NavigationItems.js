import React, {useState} from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Input from '../../UI/Input/Input';

const NavigationItems = props => {
    const [text, setText] = useState("");

    return (<ul className={classes.NavigationItems}>
        <Input
            key={1}
            elementType="text"
            elementConfig={{
                placeholder: "食品名を入力"
            }}
            value={text}
            invalid={true}
            shouldValidate={false}
            touched={true}
            changed={(event) => setText(event.target.value.trim())}/>
        <NavigationItem link={{pathname: "/", extraProps: {query: text}}} exact clicked={() => props.addSearchQuery(text)}>検索</NavigationItem>
        <NavigationItem link="/newpost" exact>新規投稿</NavigationItem>
        {props.isAuthenticate ? 
            <NavigationItem link="/mypage" exact>マイページ</NavigationItem>:
            null}
        {props.isAuthenticate ? 
            <NavigationItem link="/logout" exact>ログアウト</NavigationItem>:
            <NavigationItem link="/auth" exact>ログイン</NavigationItem>}
    </ul>);
}

export default NavigationItems;