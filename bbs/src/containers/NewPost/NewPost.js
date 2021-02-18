import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DropzoneArea} from 'material-ui-dropzone';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './NewPost.module.css';

import * as actions from '../../store/actions/index';

class newPost extends Component {
    state = {
        postForm: {
            // タイトル
            title: {
                key: "title",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "例）椎茸、豚肉"
                },
                value: "",
                label: "食品名",
                touched: false,
                valid: true,  //現時点では表面上チェックする項目はなし
            },
            describe: {
                key: "describe",
                elementType: "textarea",
                elementConfig: {
                },
                value: "",
                label: "説明",
                touched: true, //現時点では表面上チェックする項目はなし
                valid: true,  //現時点では表面上チェックする項目はなし
            },
            image: {
                key: "image",
                elementType: "dropzone",
                elementConfig: {
                    acceptedFiles: ["image/png","image/jpeg"],
                    filesLimit: 1,
                    showPreviews: true,
                },
                value: null,
                label: "イメージ画像",
                touched: true, //現時点では表面上チェックする項目はなし
                valid: true,  //現時点では表面上チェックする項目はなし
            }
        },
        images: null,
    }

    inputChangeHandler = (event, postFormId) => {
        let newValue = null
        if (postFormId == "image") {
            newValue = event;
        }else {
            newValue = event.target.value;
            
        }
        const newState = {...this.state.postForm[postFormId], value: newValue, touched: true};
        this.setState({
            postForm: {...this.state.postForm, [postFormId]: newState},
        });
    };

    onSubmitHandler = () => {
        const result = {}
        for (let key in this.state.postForm) {
            result[key] = this.state.postForm[key].value
        }
        console.log(result);
        this.props.onAddPost(result);
        this.setState({
            postForm: {
                title: {...this.state.postForm.title, value: "", touched: false},
                describe: {...this.state.postForm.describe, value: "", touched: false},
                image: {...this.state.postForm.image, value: null, touched: true},
            },
        })
    }

    render() {
        const postArr = [];
        for (let key in this.state.postForm) {
            postArr.push({
                id: key,
                contents: this.state.postForm[key],
            })
        }

        const posts = postArr.map(e =>
            (<Input 
                elementType={e.contents.elementType}
                elementConfig={e.contents.elementConfig}
                value={e.contents.value}
                label={e.contents.label}
                touched={e.contents.touched}
                changed={(event) => this.inputChangeHandler(event, e.id)}
            />)
        )
        return (
            <div className={classes.NewPost}>
                {posts}
                <Button
                    clicked={this.onSubmitHandler}
                    btnType={this.state.postForm.title.touched ? "Success" : "Danger"}
                    disabled={!this.state.postForm.title.touched}
                    >確認</Button>
            </div>
        )
    }
};

//TODO 全ポストを表示する必要がなくなったら削除してOK
const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: (post) => dispatch(actions.addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newPost);