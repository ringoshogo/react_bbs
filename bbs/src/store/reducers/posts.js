import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts:[],
    // response: {}
    graphData: null,
    query: "", // 検索用の文字列
}

// const state = {
//     resId: null, //ID
//     userId: null, //ユーザID
//     expiredDate: null, //有効期限
//     duration: null, // 有効期限切れ後N日
//     opend: null, // 開封済・未済
//     evaluation: {
//         appearance: null, //見た目
//         taste: null, // 味・匂い
//         physicalCondition: null, // 食後の体調
//     },
//     comment: null, //コメント
//     postDate: null, // 投稿日時
//     goodCount: 0 // 参考になった数
// }

/**
 * 新規ポストを追加する
 * @param {*} state 
 * @param {*} action 
 */
const addPostSuccess = (state, action) => {
    const newArr =state.posts.concat(action.post);
    return {
        ...state,
        posts: newArr
    }
}

const fetchSuccess = (state, action) => {
    return {
        ...state,
        posts: action.posts
    }
}

const fetchDetailSuccess = (state, action) => {

    const updatedPost = state.posts.concat();
    updatedPost[action.index] = action.post;

    return {
        ...state,
        posts: updatedPost,
    }
}

const fetchGraphDataSuccess = (state, action) => {
    return {
        ...state,
        graphData: action.graphData,
    }
}


/**
 * 各スレッドにユーザーの反応を追加する ★★現在使用していない
 * @param {*} state 
 * @param {*} action 
 */
const addNewResponse = (state, action) => {
    const newArr = state.response[action.postId].concat({...action.userResponse, id: state.resId});
    // レスポンスにIDを付与する
    return {
        ...state,
        response: {
            ...state.response,
            [action.postId]: newArr},
        resId: state.resId + 1,
        }
}

/**
 * 各スレッドに「参考になった」数を追加する
 * @param {*} state 
 * @param {*} action 
 */
const addGoodClickSuccess = (state, action) => {
    
    const updatedPost = state.posts.concat();
    const updatedResponse = updatedPost[action.postIndex].response;
    updatedResponse[action.responseIndex].goodClickUser.push(action.goodclickuser);
    return {
        ...state,
        posts: updatedPost,
    }
}

const addSearchQuery = (state, action) => {
    return {
        ...state,
        query: action.query,
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state, action)
        case actionTypes.FETCH_DETAILS_SUCCESS: return fetchDetailSuccess(state, action)
        case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state, action);
        case actionTypes.ADD_GOOD_CLICK_SUCCESS: return addGoodClickSuccess(state, action);
        case actionTypes.ADD_RESPONSE: return addNewResponse(state, action);
        case actionTypes.FETCH_GRAPH_DATA_SUCCESS: return fetchGraphDataSuccess(state, action);
        case actionTypes.ADD_SEARCH_QUERY: return addSearchQuery(state, action);
        default: return state;
    }
}

export default reducer;