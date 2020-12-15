import React from 'react';
import classes from './Main.module.css';
import Navbar from './Navbar/Navbar';
import { Route } from 'react-router-dom';
import News from './News/News';
import UsersContainer from './Users/UsersContainer';
import ProfileContainer from './Profile/ProfileComponent';
import LoginCompose  from '../Login/Login';

const Main = () => {

    return (
        
        <div className={classes.Main}>
            <Navbar />
                <Route path='/news/' render={ () => <News /> } />
                <Route exact path='/users/' render={ () => <UsersContainer />}/>
                <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
                <Route path='/Login' render={ () => <LoginCompose /> } />
        </div>
        
    )

};

export default Main;


