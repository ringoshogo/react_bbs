import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MyPage from './containers/MyPage/MyPage';
import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import PostDetails from './containers/PostDetails/PostDetails';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Layout>
          <Route path={"/mypage"} component={MyPage} />
          <Route path={"/newpost"} component={NewPost} />
          <Route path={"/posts/:postId"} component={PostDetails} />
          <Route path={"/auth"} component={Auth} />
          <Route path={"/logout"} component={Logout} />
          <Route path={"/"} component={Posts} exact/>
        </Layout>
      </div>
    );
  }
}

export default App;
