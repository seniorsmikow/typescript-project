import React from 'react'
import classes from './Main.module.scss'
import Navbar from './Navbar/Navbar'
import { Route } from 'react-router-dom'
import News from './News/News'
import UsersContainer from './Users/UsersContainer'
import ProfileContainer from './Profile/ProfileContainer'
import Login  from '../Login/Login'

class Main extends React.Component {

    render() {
        return (
            <div className={classes.Main}>
                <Navbar />
                    <Route path='/news/' render={ () => <News /> } />
                    <Route exact path='/users/' render={ () => <UsersContainer />}/>
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
                    <Route path='/login' render={ () => <Login /> } />
            </div>
        )
    }
}

export default Main


