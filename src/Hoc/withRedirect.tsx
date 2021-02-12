import { Redirect } from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import { AppStateType } from '../Redux/redux-store'

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapStatePropsType = {
    isAuth: boolean
}

export const withRedirect = (Component: any) => {

    class redirectComponent extends React.Component <MapStatePropsType> {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/Login'} />
            return <Component {...this.props} />
        }
    }

    let connectedComponent = connect(mapStateToProps)(redirectComponent)

    return connectedComponent
}
