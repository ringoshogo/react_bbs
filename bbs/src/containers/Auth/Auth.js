import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {ageList, sexList} from '../../common/authConst';
import {checkValidity} from '../../common/utility';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


import classes from './Auth.module.css';

class Auth extends Component {

    state ={
        formElement: {
            name: {
                elementType: "input",
                elementConfig: {
                    placeholder: "名前"
                },
                value: "",
                valid: true,
                touched: false,
                label: "名前",
                onlySignUp: true,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "メールアドレス"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                label: "メールアドレス",
                onlySignUp: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "6文字以上"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                label: "パスワード",
                onlySignUp: false,
            },
            password2: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "6文字以上"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                label: "パスワード(確認用)",
                onlySignUp: true,
            },
            sex: {
                elementType: "select",
                elementConfig: {
                    options: sexList
                },
                value: sexList[0],
                valid: true,
                touched: true,
                label: "性別",
                onlySignUp: true,
            },
            birhday: {
                elementType: "select",
                elementConfig: {
                    options: ageList
                },
                value: new Date().getFullYear() - 35,
                validation: {},
                valid: true,
                touched: true,
                label: "誕生年",
                onlySignUp: true,
            },
        },
        valid: false,
        isSignUp: false,
    }

    inputChangeHandler = (event, formName) => {
        const updateObject = {...this.state.formElement, 
            [formName]: {
                ...this.state.formElement[formName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.formElement[formName].validation),
                touched: true,
            }
        };
        this.setState({formElement: updateObject});

        // フォームの送信可否を判断する
        for (let key in updateObject) {
            // ログインの場合
            if (!this.state.isSignUp && updateObject[key].onlySignUp) continue;

            const elem = updateObject[key];
            if (!elem.valid || !elem.touched) {
                this.setState({valid: false});
                return;
            } 
        }
        this.setState({valid: true});
    }

    /**
     * 新規登録またはログインボタン押下
     */
    onSubmitHandler = () => {

        console.log("onsubmithandler is called");

        if (this.state.isSignUp && this.state.formElement.password.value != this.state.formElement.password2.value) {
            alert("パスワードが一致しません。");
            return;
        }

        const userInfo = {
            username: this.state.formElement.name.value,
            email: this.state.formElement.email.value,
            password: this.state.formElement.password.value,
            password2: this.state.formElement.password2.value,
            sex: this.state.formElement.sex.value,
            birthday: this.state.formElement.birhday.value,
        }

        // ログインor新規登録を行う
        this.props.auth(userInfo, this.state.isSignUp)
    }

    componentDidMount() {
        // エラー表示をした後は、保持しているエラー情報を削除
        if(this.props.error) {
            this.props.authErrorReset();
        }
    }

    created = () => {
        this.setState({isSignUp: false});
        this.props.authCreateSuccessEnd();
    }

    render() {
        // ログイン済みの場合、本画面に遷移
        let authRedirect = null;
        if (this.props.isAuthenticate) {
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        if (this.props.created) {
            this.created();
        }

        // エラーがあれば、エラー表示
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (<p style={{color: "red"}}>{this.props.error}</p>);
        }

        const authArr = [];
        for (let key in this.state.formElement) {
            // 新規登録でのみ使用するインプット要素は削除する
            if (this.state.formElement[key].onlySignUp && !this.state.isSignUp) continue;
            authArr.push({
                id: key,
                config: this.state.formElement[key]
            })
        }

        let contents = authArr.map(e =>　{
            return(<Input
                key={e.id}
                elementType={e.config.elementType}
                elementConfig={e.config.elementConfig}
                value={e.config.value}
                invalid={e.config.valid}
                shouldValidate={e.config.validation}
                touched={e.config.touched}
                changed={(event) => this.inputChangeHandler(event, e.id)}
                label={e.config.label}/>)}
        );

        // ロード中であればスピナーを表示
        if (this.props.loading) {
            contents = <Spinner />
        }

        return(
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                {contents}
                <Button
                    btnType="Success"
                    disabled={!this.state.valid}
                    clicked={()=>this.onSubmitHandler()} >{this.state.isSignUp ? "新規登録" : "ログイン"}</Button>
                <Button
                    btnType="Danger"
                    clicked={() => this.setState({isSignUp: !this.state.isSignUp})}
                    >{this.state.isSignUp ? "ログインへ切替" : "新規登録へ切替"}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        loading: state.auth.loading,
        error: state.auth.error,
        redirectPath: state.auth.authRedirectPath,
        isAuthenticate: state.auth.token !== null,
        created: state.auth.created,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (userInfo, isSignUp) => dispatch(actions.auth(userInfo, isSignUp)),
        authErrorReset: () => dispatch(actions.authErrorReset()),
        authCreateSuccessEnd: () => dispatch(actions.authCreateSuccessEnd()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);