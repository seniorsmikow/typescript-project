import React from 'react';
import {connect} from 'react-redux';
import {thunkCreatorGetProfile, getUStatus, updateUStatus, loadProfilePhoto} from '../../../Redux/profile-reducer';
import Profile from './Profile';
import {withRedirect} from '../../../Hoc/withRedirect';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class ProfileComponent extends React.Component {

    constructor(props) {
        super();
    }


    refreshProfile() {

        let userId = +this.props.match.params.userId;
        if (!userId) {

            userId = this.props.authId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.thunkCreatorGetProfile(userId);
            this.props.getUStatus(userId);
        }
    }

    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        
        return <Profile 
                    {...this.props} 
                    profile={this.props.profile} 
                    deactivate={this.props.updateUStatus} 
                    isOwner={!this.props.match.params.userId}
                    loadProfilePhoto={this.props.loadProfilePhoto}
                />
            
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authId: state.auth.id
    };
};

let ProfileContainer = compose(
    withRouter,
    withRedirect,
    connect(mapStateToProps, {thunkCreatorGetProfile, getUStatus, updateUStatus, loadProfilePhoto})
    )
    (ProfileComponent);

export default ProfileContainer;