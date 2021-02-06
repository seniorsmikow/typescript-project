import React from 'react'
import Header from './Header'
import {getProfileData, logout} from '../../Redux/auth-reducer'
import {connect, ConnectedProps} from 'react-redux'

import { AppStateType } from '../../Redux/redux-store'
type PropsType = PropsFromRedux


class HeaderContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getProfileData();
    }

    render() {
        return <Header {...this.props} />
    }

}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};

const mapDispatchToProps = {getProfileData, logout}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(HeaderContainer)