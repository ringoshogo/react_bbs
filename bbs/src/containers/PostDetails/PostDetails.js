import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

import Modal from '../../components/UI/Modal/Modal';
import ResponseForm from './ResponseForm/ReponseForm';
import ResponseDetails from './ResponseDetails/ResponseDetails';
import LineChart from './Chart/Chart';
import * as actions from '../../store/actions/index';

import classes from './PostDetails.module.css';

const ImageComponent = (props) => (
    <img src={props.img}
        alt={"img"}
        style={{
            height: "52px",
            width: "80px",
            borderRadius: "10px",
            margin: "3px 0",
        }}/>);

class PostDetails extends Component {

    state = {
        show: false,
        postId: this.props.match.params.postId,
    }

    componentDidMount() {

        // グラフデータを取得する
        const post = this.props.match.params.postId;
        if (typeof post == "undefined") {
            this.props.fetchPost();
        }else {
            this.props.fetchGraphData(post);

        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        
        // 平均値を算出する ⇒ reduxで管理するようになったら不要
    }
    
    // ポストに対する反応を投稿
    onAddResHandler = (responseInfo, post) => {
        this.props.onAddNewRes(responseInfo, post.id, this.props.location.extraProps.index);
    }

    render() {

        // GETで取得したポストIDに紐づく投稿を取得する
        const postid = this.props.match.params.postId;
        const post = this.props.posts.filter(e => e.id == postid)[0];

        // redux で取得したレスポンスを元にレスポンスコンポーネントを作成する
        let res = null;
        let postRedirect = null;
        let foodImage = null;
        let foodDescribe = null;
        if (typeof post !== 'undefined') {
            res = post.response.map((currentRes, index) => {
                return (<ResponseDetails
                            key={index}
                            responseIndex={index}
                            userResponse={currentRes}
                            onClickGood={(response, responseIndex) => this.props.onAddGodClk(response, this.props.location.extraProps.index, responseIndex)}/>)
            });
            foodImage = post.food_image ? <ImageComponent img={process.env.REACT_APP_END_POINT+post.food_image}/> : null;
            foodDescribe = post.describe ? <h5>※ {post.describe}</h5> : null;
        }else {
            postRedirect = <Redirect to="/" />
        }

        /**
         * レスポンスボタンを付ける
         * レスポンスフォームのモーダルを作成する
         */

        return (
            
            <div className={classes.PostDetailsCommon}>
                {postRedirect}
                <div className={classes.Header}>

                    <Modal show={this.state.show} clicked={() => this.setState({show: !this.state.show})}>
                        <ResponseForm 
                            postId={this.state.postId}
                            submitted={(responseInfo) => this.onAddResHandler(responseInfo, post)}
                            modalClosed={() => this.setState({show: !this.state.show})}/>
                    </Modal>
                    <div className={classes.PostDetails}>
                        <div className={classes.PostDetailsHeader}>
                            <div className={classes.PostDetailsTitle}>
                                <i className="fas fa-drumstick-bite fa-3x"></i>
                                <h1>{post ? post.title : null}</h1>
                                {foodDescribe}
                            </div>
                            {foodImage}
                        </div>
                        <div className={classes.PostDetailsDescribe}>
                           <div className={classes.PostDetailsSummary}>
                                <div><h4>■評価</h4></div>
                                <div className={classes.PostDetailsSummaryPraph}>
                                    <LineChart data={this.props.graphData}></LineChart>
                                    {/* <h3>見た目：{this.state.average.appearance}</h3>
                                    <h3>味：{this.state.average.taste}</h3>
                                <h3>体調：{this.state.average.condition}</h3> */}
                                </div>
                                <div><h5>評価：5 問題なし　←－－－→　1 最悪 ※ 0:データなし</h5></div>
                           </div>
                        </div>
                    </div>
                    <div className={classes.PostHeader}>
                        <i className="fas fa-users fa-3x"></i>
                        <h1 style={{margin: "0 0 0 10px"}}>みんなの投稿</h1>
                        {this.props.isAuthenticate ?
                            <div className={classes.NewPost} onClick={() => this.setState({show: !this.state.show})}>
                                    <div className={classes.PlusIcon}><span /></div>
                                    <h2 className={classes.PostLabel}>新規投稿</h2>
                            </div> : <h5 style={{margin: "0 10px 0"}}>※ ログイン後に投稿お願いします ※</h5>}
                    </div>
                </div>
                <div className={classes.Response}>
                    {res}
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        userInfo: state.auth.userInfo,
        isAuthenticate: localStorage.getItem("token") != null || state.auth.token !== null,
        graphData: state.posts.graphData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddNewRes: (responseInfo, postId, postIndex) => dispatch(actions.addResponse(responseInfo, postId, postIndex)),
        onAddGodClk: (response, postIndex ,responseIndex) => dispatch(actions.addGoodClick(response, postIndex, responseIndex)),
        fetchPost: () => dispatch(actions.fetchPost()),
        fetchGraphData: (postId) => dispatch(actions.fetchGraphData(postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);