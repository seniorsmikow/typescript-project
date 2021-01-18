import React from 'react'
import { connect } from 'react-redux'
import {thunkCreatorGetProfile, getUStatus, updateUStatus, loadProfilePhoto} from '../../../Redux/profile-reducer'
import Profile from './Profile'
import {withRedirect} from '../../../Hoc/withRedirect'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {compose} from 'redux'
import { RootState } from '../../../Redux/redux-store'

//import { ProfileType } from '../../../Types/types'

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    thunkCreatorGetProfile: (userId: number) => void
    getUStatus: (userId: number) => void
    updateUStatus: () => void
    loadProfilePhoto: () => void
}

type PathParamsType = {
    userId: any
}

type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<ProfilePropsType> {

    // constructor(props: ProfilePropsType) {
    //     super(props);
    // }


    refreshProfile() {

        let userId: number | null = +this.props.match.params.userId
        if (!userId) {

            userId = this.props.authId
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login")
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')")
        } else {
            this.props.thunkCreatorGetProfile(userId)
            this.props.getUStatus(userId)
        }
    }

    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: ProfilePropsType, prevState: ProfilePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return  ( 
                    <Profile {...this.props} 
                            profile = {this.props.profile} 
                            deactivate = {this.props.updateUStatus} 
                            isOwner = {!this.props.match.params.userId}
                            loadProfilePhoto = {this.props.loadProfilePhoto}
                    />
        )
    }
}

let mapStateToProps = (state: RootState) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authId: state.auth.id
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {thunkCreatorGetProfile, getUStatus, updateUStatus, loadProfilePhoto}),
    withRouter,
    withRedirect
)(ProfileContainer)