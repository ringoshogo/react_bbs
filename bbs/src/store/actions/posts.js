import axios from '../../axios-post';
import * as actionTypes from './actionTypes';

export const addSearchQuery = (query) => {
    return {
        type: actionTypes.ADD_SEARCH_QUERY,
        query: query
    }
}


const addPostSuccess = (post) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        post: post
    }
}

export const fetchSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        posts: posts
    }
}

export const fetchDetailSuccess = (post, index) => {
    return {
        type: actionTypes.FETCH_DETAILS_SUCCESS,
        post: post,
        index, index,
    }
}

export const addNewResponse = (userResponse, postId) => {
    return {
        type: actionTypes.ADD_RESPONSE,
        userResponse: userResponse,
        postId: postId,
    }
}

export const addGoodClickSuccess = (goodclickuser, postIndex ,responseIndex) =>{
    return {
        type: actionTypes.ADD_GOOD_CLICK_SUCCESS,
        postIndex: postIndex,
        responseIndex: responseIndex,
        goodclickuser: goodclickuser,

    }
}

/**
 * イイネボタンを追加する
 * @param {}} response 
 * @param {*} postIndex 
 * @param {*} responseIndex 
 */
export const addGoodClick = (response, postIndex, responseIndex) => {
    const userId = localStorage.getItem("userId");

    return dispatch => {
        axios.post("/goodclickuser/",{
            response: response,
            user: userId
        },  {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            dispatch(addGoodClickSuccess(res.data, postIndex, responseIndex));
        })
        .catch(err => {

        })


    }
}

/**
 * ポストを追加する
 * @param {}} query 
 */
export const addPost = (post) => {
    // 現状、ファイルのアップロードにはフォームデータとするのが必要のよう
    const form = new FormData();
    form.append("food_image", post.image[0]);
    form.append("describe", post.describe);
    form.append("title", post.title);
    console.log(form);

    return dispatch => {
        axios.post("/posts/", form ,{headers: {
            'content-type': 'multipart/form-data',
        }})
        .then(res => {
            console.log(res.data);
            dispatch(addPostSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

/**
 * ポストを取得する
 */
export const fetchPost = (query) => {
    
    let url = "/posts/";
    if(query) {
        url = "/posts/?query="+query;
    }
    return dispath => {
        axios.get(url)
        .then(res => {
                dispath(fetchSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

/**
 * 個別のポストを取得する
 * @param {}} postid 
 */
export const fetchPostDetails =(postid, index) => {

    return dispatch => {
        callAxiosFetchPostDetails(dispatch, postid, index);
    }
}

/**
 * 個別のポストを取得する
 * @param {}} postid 
 */
const callAxiosFetchPostDetails = (dispatch, postid, index) => {
    const url = "/posts/" + postid + "/";
    axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(fetchDetailSuccess(res.data, index));
        })
        .catch(err => {
            console.log(err);
        })
}

/**
 * ポストに対するレスポンスを追加する
 */
export const addResponse = (responseInfo, postid, postIndex) => {
    const postContents = {
        sex: localStorage.getItem("sex"),
        age: (new Date().getFullYear() - localStorage.getItem("birthday")),
        userid: localStorage.getItem("userId"),
        post: postid,
        appearance: responseInfo.appearance,
        taste: responseInfo.taste,
        condition: responseInfo.condition,
        expire_date: responseInfo.expiredDays,
        expire_type: 1,
        comment: responseInfo.comment,};

    console.log(postContents);

    return dispatch => {
        axios.post("/response/", postContents,  {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            callAxiosFetchGraphData(dispatch, postid);
            callAxiosFetchPostDetails(dispatch, postid, postIndex);
        })
        .catch(err => console.log(err))
    }
}

/**
 * ポストに対するレスポンスのサマリを取得する
 * {
 *  x: "日数", y: "評価の平均", x: "評価数"
 * }
 */
export const fetchGraphData = (postid) => {
    
    return dispatch => {
        callAxiosFetchGraphData(dispatch, postid);
    }
}

/**
 * axios でデータを取得する
 * @param {*} dispatch 
 * @param {*} postid 
 */
const callAxiosFetchGraphData = (dispatch, postid) => {
    
    axios.get("/posts/" + postid + "/graph_data/")
    .then(res => {
            dispatch(fetchGraphDataSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
        })
}


export const fetchGraphDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GRAPH_DATA_SUCCESS,
        graphData: data,
    }
}
