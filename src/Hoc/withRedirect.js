import { Redirect } from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export const withRedirect = (Component) => {

    class redirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/Login'} />
            return <Component {...this.props} />
        }
    }

    let connectedComponent = connect(mapStateToProps)(redirectComponent);

    return connectedComponent;
};
