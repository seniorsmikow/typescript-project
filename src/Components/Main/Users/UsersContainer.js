import React from 'react';
import {connect} from 'react-redux';
import {createThunkGetUsers, createThunkGetElseUsers, setTotalUsersCount,  followThunkCreator, unfollowThunkCreator} from '../../../Redux/users-reducer';
import Users from './Users';
import Loader from '../../Loader/Loader';
import {compose} from 'redux';
import {getUsers, getTotalUsersCount, getCurrentPage, getPageSize, getPagesLimit, getIsFetching, getInProcess, getUsersFollowing} from '../../../Redux/users-selectors';


class UsersAPIContainer extends React.Component {

    componentDidMount() {
        this.props.createThunkGetUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (currentPage) => {
        
        this.props.createThunkGetElseUsers(currentPage, this.props.pageSize);

    }

    render() {
        return <>
                    {this.props.isFetching ? <Loader /> : null}
                    <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                    inProcess={this.props.inProcess}
                    usersFollowing={this.props.usersFollowing}
                    followThunkCreator={this.props.followThunkCreator}
                    unfollowThunkCreator={this.props.unfollowThunkCreator}
                    />
                </>
      
                    
                
    }
};

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        pagesLimit: getPagesLimit(state),
        isFetching: getIsFetching(state),
        inProcess: getInProcess(state),
        usersFollowing: getUsersFollowing(state)
    };
};

let UsersContainer = compose(
        connect(mapStateToProps, 
        {setTotalUsersCount, createThunkGetUsers, createThunkGetElseUsers, followThunkCreator, unfollowThunkCreator})
        )
        (UsersAPIContainer);


export default UsersContainer;