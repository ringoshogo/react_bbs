import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'

import * as actions from '../../store/actions/index'

import classes from './Post.module.css';

const Posts = props => {

    useEffect(() => {
        props.fetchPost(props.query);
          
    },[props.query])
    
    const posts = props.posts.map((e, index) => {
        return(
        <NavLink className={classes.Contents} key={e.id} to={{
            pathname:"/posts/" + e.id,
            extraProps: {
                index: index
            }
            }}>
            <i className="fas fa-drumstick-bite fa-2x"></i>
            <h3>{e.title}  ({typeof e.response == "undefined" ? 0 : e.response.length})</h3>
        </NavLink>)
    })
 
    return (
        <div className={classes.Posts}>
            {posts}
        </div>
    );
}
const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        response: state.posts.response,
        query: state.posts.query,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPost: (query) => dispatch(actions.fetchPost(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);