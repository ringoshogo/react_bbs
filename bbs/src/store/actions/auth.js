import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userInfo, isSignup) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userInfo: userInfo,
        token: token,
        isSignup: isSignup,
    };
};

const authCreateSuccess = () =>{
    return {
        type: actionTypes.AUTH_CREATE_SUCCESS
    }
};
export const authCreateSuccessEnd = () =>{
    return {
        type: actionTypes.AUTH_CREATE_SUCCESS_END
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const authErrorReset = () => {
    return {
        type: actionTypes.AUTH_ERROR_REST,
    }
}

export const logout = () => {

    // ログアウト機能も実装する
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("sex");
    localStorage.removeItem("age");
    localStorage.removeItem("birthday");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

/**
 * 認証情報 ＋ ユーザ情報を取得する。
 * @param {}} userInfo 
 * @param {*} isSignup 
 */
export const auth = (userInfo, isSignup)=> {

    let postObj = null;
    let url = null;
    let error = null;
    // 新規登録
    if (isSignup) {
        url = '/users/';
        postObj = {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            profile: {
                sex: userInfo.sex.value,
                birthday: userInfo.birthday,
                avator: null,
            }
        };
        error = "新規登録に失敗しました。"
    // ログイン
    }else {
        url = '/rest-auth/login/';
        postObj = {
            email: userInfo.email,
            password: userInfo.password,
        };
        error = "ログインに失敗しました。"
    }

    return dispatch => {

        // 認証トークンを取得
        axios.post(url, postObj)
        .then(res1 => {

            if (isSignup) {
                alert("新規ユーザ登録が正常に終了しました。");
                dispatch(authCreateSuccess());

            }else {
                // ユーザーIDを取得
                const token = res1.data.key;
                localStorage.setItem("token", token);
                axios.get('/rest-auth/user/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    }
                })
                .then(res => {
                    userInfo.userId = res.data.pk;
                    userInfo.username = res.data.username;
                    dispatch(authSuccess(token, userInfo, isSignup));
                    localStorage.setItem("userId", userInfo.userId);
                    localStorage.setItem("username", userInfo.username);
                    localStorage.setItem("email", userInfo.email);
                    localStorage.setItem("sex", userInfo.sex.value);
                    localStorage.setItem("age", userInfo.age);
                    localStorage.setItem("birthday", userInfo.birthday);
                })
                .catch(err => {
                    console.log("ユーザ情報取得でエラーが発生しました。")
                })

            }
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(error));
        })

    }
};

const profileUpdateSuccess = (userInfo) => {
    return {
        type: actionTypes.PROFILE_UPDATE_SUCCESS,
        userInfo: userInfo,
    }
}

/**
 * プロフィールの部分更新
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 */
export const profileUpdate = (username, email, password) => {
    const content = {username: username, email: email, password: password, profile: {birthday: 1990}}

    return dispatch => {
        axios.patch("/users/" + localStorage.getItem("userId") + "/", content,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
            })
            .then(res => {
                dispatch(profileUpdateSuccess(res.data))
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("email", res.data.email);
            })
            .catch(err => console.log(err))
    }
}

// const logIn = async(dispatch) => {
//     dispatch(authStart());
//     await axios.post(url, postObj)
//     .then(res => {
//         getUserInfo(res.data.key, userInfo);
//     })
//     .catch(err =>{
//         dispatch(authFail(error));
//     })

//     dispatch(authSuccess(res.data.key, userInfo, isSignup));
// }