import React from 'react';
import ButtonAppBar from './Header';
import {getMyApiThunk, logout} from '../../Redux/auth-reducer';
import {connect} from 'react-redux';

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getMyApiThunk();
    }

    render() {
        return <ButtonAppBar {...this.props} />
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};

export default connect(mapStateToProps, {getMyApiThunk, logout})(HeaderContainer);



