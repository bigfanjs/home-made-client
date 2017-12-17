import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FacebookLoginButton from 'react-social-login-buttons/lib/buttons/FacebookLoginButton';

import {login} from '../../actions/fb-login';

class FbLogin extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
    
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin() {
        this.props.dispatch(login());
    }

    componentWillMount() {
        if (this.props.authenticated) {
            this.context.router.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticated) {
            this.context.router.history.push('/');
        }
    }

    render() {
        const defaultstyle = {
            width: 348,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            position: 'absolute',
            margin: 0
        };
        
        return (
            <div>
                <FacebookLoginButton onClick={this.handleLogin} style={defaultstyle} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.status === "authenticated",
    loading: state.user.loading
});

export default connect(mapStateToProps)(FbLogin);