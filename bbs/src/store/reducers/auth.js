import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userInfo: {
        userId: null,
        username: null,
        email: null,
        sex: null,
        age: null,
        birthday: null,
    },
    error: null,
    loading: false,
    authRedirectPath: '/',
    created: false,
}

const authStart = (state, action) => {
    return {...state, loading: true};
}

const authSuccess = (state, action) => {
   
    const updateState = {...state, 
        userInfo: {
            userId: action.userInfo.userId,
            username: action.userInfo.username,
            email: action.userInfo.email,
            sex: action.userInfo.sex.value,
            age: (new Date().getFullYear() - action.userInfo.birthday),
            birthday: action.userInfo.birthday
        },
        loading: false,
        token: action.token,}
        
    return updateState;
};

const authCreateSuccess = (state, action) => {
    return {
        ...state,
        created: true,
    }
}

const authCreateSuccessEnd = (state, action) => {
    return {
        ...state,
        created: false,
    }
}

const authFail = (state, action) => {
    return {...state, error: action.error, loading:false};
};

const authLogout = (state, action) => {
    return {...state,
        token: null,
        userInfo: {
            userId: null,
            userName: null,
            email: null,
            sex: null,
            age: null,
            birthday: null,
        },
    }
}

const authErrorReset = (state, action) => {
    return {...state,
        error: null,
    }
}

const profileUpdateSuccess = (state, action) => {
    console.log(action);
    return {...state,
        userInfo: {
            ...state.userInfo,
            username: action.userInfo.username,
            email: action.userInfo.email,
        }
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_CREATE_SUCCESS: return authCreateSuccess(state, action);
        case actionTypes.AUTH_CREATE_SUCCESS_END: return authCreateSuccessEnd(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_ERROR_REST: return authErrorReset(state, action);
        case actionTypes.PROFILE_UPDATE_SUCCESS: return profileUpdateSuccess(state, action);
        default: return state;
    }
};

export default reducer;