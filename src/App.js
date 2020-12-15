import React, {Component} from 'react';
import classes from './App.module.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import Main from './Components/Main/Main';
import {initialApp} from './Redux/app-reducer';
import { withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Loader from './Components/Loader/Loader';
import {Provider} from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './Redux/redux-store';

class AppContainer extends Component { 

  componentWillMount() {
    this.props.initialApp();
  }

  render() {

    if(!this.props.initialised) {
      return <Loader />
    }
    
    return  (<div className={classes.App}>
              
                  <HeaderContainer />
                  <Main />
                
            </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    initialised: state.app.initialised
  };
};

let App = compose(
  withRouter,
  connect(mapStateToProps, {initialApp}),
  
)(AppContainer);

let MainApp = () => {
  return  <HashRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </HashRouter>
};

export default MainApp;
