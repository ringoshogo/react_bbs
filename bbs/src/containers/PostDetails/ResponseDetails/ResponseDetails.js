import React, {Component} from 'react';

import {getExpiredDateFromSelectVal} from '../../../common/formConst'
import {getDateYYYYMMDD} from '../../../common/utility'
import {getAge, getSex} from '../../../common/authConst';
import classes from './ResponseDetails.module.css';

class ResponseDetails extends Component {
    
    starConvert = (count) => [...Array(5).keys()].map(e => {
        return count <= e ? (<svg
                key={e}
                width="20"
                viewBox="0 0 306 306"
                xmlns="http://www.w3.org/2000/svg"
                data-stars="4">
                    <polygon
                        fill="url(#noneId-1611286908113)"
                        points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125  94.35,187.425 58.65,299.625"
                        pointerEvents="none"></polygon>
                </svg>)
            :
            (<svg
                key={e}
                width="20"
                viewBox="0 0 306 306"
                xmlns="http://www.w3.org/2000/svg"
                data-stars="1">
                    <defs>
                        <linearGradient id="fullId-1611286908113">
                            <stop offset="100%" stopColor="orange"></stop>
                        </linearGradient>
                        <linearGradient id="noneId-1611286908113">
                            <stop offset="100%" stopColor="grey"></stop>
                        </linearGradient>
                        <linearGradient id="halfId-1611286908113">
                            <stop offset="0%" stopColor="orange"></stop>
                            <stop offset="0%" stopColor="grey"></stop>
                        </linearGradient>
                    </defs>
                    <polygon
                        fill="url(#fullId-1611286908113)"
                        points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125  94.35,187.425 58.65,299.625"
                        pointerEvents="none">
                    </polygon>
                </svg>)
    });

    render() {
        return (
        <div className={classes.Response}>
            <div className={classes.Profile}>
                <h5><i className="fas fa-user-alt"></i>{getAge(this.props.userResponse.age)} {getSex(this.props.userResponse.sex)}</h5>
                <h5>投稿日時  :{getDateYYYYMMDD(new Date(this.props.userResponse.created_at))}</h5>
            </div>
            <div className={classes.Evaluates}>
                <div><h4>期限切れ後 <span style={{color:"red"}}>{getExpiredDateFromSelectVal(this.props.userResponse.expire_date)}</span></h4></div>
                <div className={classes.Evaluate}><h4>見た目:</h4><span>{this.starConvert(this.props.userResponse.appearance)}</span></div>
                <div className={classes.Evaluate}><h4>味:</h4><span>{this.starConvert(this.props.userResponse.taste)}</span></div>
                <div className={classes.Evaluate}><h4>体調:</h4><span>{this.starConvert(this.props.userResponse.condition)}</span></div>
            </div>
            <div className={classes.Other}>
                <div className={classes.OtherElem}><h4>コメント :{this.props.userResponse.comment}</h4></div>
                <div className={classes.OtherElem}>
                    <h4>参考になった : {this.props.userResponse.goodClickUser.length}</h4>
                    <i onClick={() => {this.props.onClickGood(this.props.userResponse.id, this.props.responseIndex)}} style={{cursor: "pointer"}} className="far fa-thumbs-up"></i>
                </div>
            </div>
        </div>
        )
    }
}

export default ResponseDetails;