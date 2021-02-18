import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions/index';
import Aux from '../Auxirialy';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
    state ={ 
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    drawToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticate={this.props.isAuthenticate}
                    addSearchQuery={(query) => this.props.addSearchQuery(query)}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticate={this.props.isAuthenticate}
                    addSearchQuery={(query) => this.props.addSearchQuery(query)}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticate: localStorage.getItem("token") != null || state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSearchQuery: (query) => dispatch(actionTypes.addSearchQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);