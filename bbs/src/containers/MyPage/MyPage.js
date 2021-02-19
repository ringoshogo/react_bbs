import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {getSex} from '../../common/authConst'
import * as actions from '../../store/actions/index'
import {getLocalStorage} from '../../common/crypto';

import classes from './MyPage.module.css';
import Modal from '../../components/UI/Modal/Modal';

class MyPage extends Component {
    state = {
        form: {
            username: {
                value: getLocalStorage("username"), elementType: "label", writable:false, label: "名前", changeable:true,
            },
            email: {
                value: getLocalStorage("email"), elementType: "label", writable:false, label: "メールアドレス", changeable:true,
            },
            sex: {
                value: getSex(getLocalStorage("sex")), elementType: "label", writable:false, label: "性別", changeable:false,
            },
            birthday: {
                value: getLocalStorage("birthday"), elementType: "label", writable:false, label: "誕生年", changeable:false,
            }
        },
        modalShow: false,
        password: "",
    }

    profileChangeHandler = (event, id) => {
        const updateFormValue = {
            ...this.state.form,
            [id]: {...this.state.form[id], value: event.target.value}
        }
        this.setState({form: updateFormValue});
    };

    // 変数をオブジェクトのキーに使用する場合、[]で囲う必要あり
    // 例） id: "hoge" => [id]: "hobe"
    profileTypeSwitchHandler = (id) => {
        const updateFormValue = {
            ...this.state.form,
            [id]: {...this.state.form[id], writable: !this.state.form[id].writable, elementType: this.state.form[id].elementType=="label" ? "input" : "label"} 
        }
        this.setState({form: updateFormValue});
    }

    profileSubmitHandler = () => {
        this.setState({modalShow: true});
    }

    modalSubmitHandler = (username, email, password) => {
        this.props.profileUpdate(username, email, password);
        this.setState({modalShow: false});
    }

    render() {
        const profileArray = [];
        for (let key in this.state.form) {
            profileArray.push({
                id: key,
                content: this.state.form[key]
            });
        };
        const passCofirm = (
                    <div className={classes.PassConfirm}>
                        <Input
                            key={1}
                            value={this.state.password}
                            label="パスワード"
                            elementType="input"
                            elementConfig={{type: "password"}}
                            changed={(event) => this.setState({password: event.target.value})}/>
                        <Button btnType="Success" clicked={() => this.modalSubmitHandler(this.state.form.username.value, this.state.form.email.value, this.state.password)}>送信</Button>
                    </div>
        )

        // list の key は最上位のコンポーネントに設定する事
        let profiles = (
            <div>
                {profileArray.map(profile => (
                    <div key={profile.id} className={classes.InputElement}>
                        <Input
                            id={profile.id}
                            value={profile.content.value}
                            label={profile.content.label}
                            elementType={profile.content.elementType}
                            changed={(event) => this.profileChangeHandler(event, profile.id)}/>
                        {profile.content.changeable
                            ? <Button btnType="Success" clicked={() => this.profileTypeSwitchHandler(profile.id)}>{profile.content.writable ? "決定" : "変更"}</Button>
                            : null}
                    </div>
                    ))}
            </div>
        );

        // return は <div>で囲う必要あり
        return (
            <div className={classes.MyPage}>
                <h1 style={{textAlign: "center"}}>PROFILE</h1>
                <Modal
                    show={this.state.modalShow}
                    clicked={() => this.setState({modalShow : !this.state.modalShow})}>
                        {passCofirm}
                </Modal>
                {profiles}
                <Button 
                    btnType="Danger"
                    clicked={() => this.profileSubmitHandler()}>SUBMIT</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticate: getLocalStorage("token") != null || state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        profileUpdate: (username, email, password) => dispatch(actions.profileUpdate(username, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);