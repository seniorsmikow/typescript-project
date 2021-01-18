import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {createThunkGetUsers, createThunkGetElseUsers, setTotalUsersCount,  followThunkCreator, unfollowThunkCreator} from '../../../Redux/users-reducer'
import Users from './Users'
import Loader from '../../Loader/Loader'
//import {compose} from 'redux'
import {getUsers, getTotalUsersCount, getCurrentPage, getPageSize, getPagesLimit, getIsFetching, getInProcess, getUsersFollowing} from '../../../Redux/users-selectors'
import { RootState } from '../../../Redux/redux-store'


// type StateProps = {
//     users: any
//     totalUsersCount: number
//     currentPage: number
//     pageSize: number
//     pagesLimit: number
//     isFetching: boolean
//     inProcess: boolean
//     usersFollowing: () => void
// }

// type DispatchProps = {
//     setTotalUsersCount: () => void 
//     createThunkGetUsers: (currentPage: number, pageSize: number) => void
//     createThunkGetElseUsers: (currentPage: number, pageSize: number) => void
//     followThunkCreator: () => void
//     unfollowThunkCreator: () => void
// }

type AllProps =  PropsFromRedux


class UsersContainer extends React.Component<AllProps> {

    componentDidMount() {
        this.props.createThunkGetUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        
        this.props.createThunkGetElseUsers(currentPage, this.props.pageSize)

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
                    followThunkCreator={this.props.followThunkCreator}
                    unfollowThunkCreator={this.props.unfollowThunkCreator}
                    />
            </div>
        )
                    
                
    }
}

const mapStateToProps = (state: RootState) => {

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

const mapDispatchToProps = {setTotalUsersCount, createThunkGetUsers, createThunkGetElseUsers, followThunkCreator, unfollowThunkCreator}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(UsersContainer)