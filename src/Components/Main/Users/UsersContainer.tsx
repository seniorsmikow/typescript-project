import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {getUsersData, usersPaginationHelper, followUser, unfollowUser} from '../../../Redux/users-reducer'
import Users from './Users'
import Loader from '../../Loader/Loader'
//import {compose} from 'redux'
import {getUsers, getTotalUsersCount, getCurrentPage, getPageSize, getPagesLimit, getIsFetching, getInProcess, getUsersFollowing} from '../../../Redux/users-selectors'
import { AppStateType } from '../../../Redux/redux-store'

type AllProps =  PropsFromRedux

class UsersContainer extends React.Component<AllProps> {

    componentDidMount() {
        this.props.getUsersData(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        
        this.props.usersPaginationHelper(currentPage, this.props.pageSize)

    }

    render() {
        return (
            <div>
                    {this.props.isFetching ? <Loader /> : null}
                    <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                    inProcess={this.props.inProcess}
                    usersFollowing={this.props.usersFollowing}
                    followThunkCreator={this.props.followUser}
                    unfollowThunkCreator={this.props.unfollowUser}
                    />
            </div>
        )
                    
                
    }
}

const mapStateToProps = (state: AppStateType) => {

    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        pagesLimit: getPagesLimit(state),
        isFetching: getIsFetching(state),
        inProcess: getInProcess(state),
        usersFollowing: getUsersFollowing(state)
    }
}

const mapDispatchToProps = {getUsersData, usersPaginationHelper, followUser, unfollowUser}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(UsersContainer)