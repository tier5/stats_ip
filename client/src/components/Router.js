import React from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import IP from './IP/IP';
import WeatherReport from './WeatherReport/WeatherReport';
import DepthChart from './DepthChart/DepthChart';

import Header from './Header/Header';
import Error from './Error/Error';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './Auth/SignUp/SignUp';
import SignIn from './Auth/SignIn/SignIn';
import LogOut from './Auth/LogOut';
import Pages from './Pages/Pages';
import Footer from './Footer';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-105614587-1');


class Router extends React.Component {


    sendPageView(location) {
        window.popesClose();
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname);
    }

    componentDidMount() {
        this.sendPageView(this.props.history.location);
        this.unlisten = this.props.history.listen(this.sendPageView);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <DocumentTitle title="StatRoute">
                <div>
                    <Header user={this.props.user}/>
                    <Switch>
                        {this.props.user.loggedIn && <Redirect from='/sign-up' to='/'/>}
                        {this.props.user.loggedIn && <Redirect exact from='/sign-in' to='/'/>}
                        {!this.props.user.loggedIn && <Redirect exact from='/log-out' to='/'/>}

                        <Route exact from='/' render={(props) => (
                            <LandingPage {...props} user={this.props.user}/>
                        )}/>
                        <Route exact from='/sign-in'
                               render={(props) => (
                                   <SignIn {...props} onUserSignIn={this.props.onUserSignIn}/>)
                               }/>
                        <Route exact from='/log-out'
                               render={(props) => (
                                   <LogOut {...props} onUserLogOut={this.props.onUserLogOut}/>
                               )}/>
                        <Route from='/sign-up'
                               render={(props) => (
                                   <SignUp {...props} onUserSignUp={this.props.onUserSignUp}/>
                               )}/>

                        {(this.props.user.loggedIn || true)
                        && <Route exact path='/stats-ip'
                                  render={(props) => (
                                      <IP {...props} user={this.props.user}/>
                                  )}/>}

                        {(this.props.user.loggedIn || true)
                        && <Route exact path='/weather-report'
                                  render={(props) => (
                                      <WeatherReport {...props} user={this.props.user}/>
                                  )}/>}
                        {(this.props.user.loggedIn || true)
                        && < Route exact path='/depth-chart'
                                   render={(props) => (
                                       <DepthChart {...props} user={this.props.user}/>
                                   )}/>}

                        <Route exact path='/pages/:slug'
                               render={(props) => (
                                   <Pages {...props} user={this.props.user}/>
                               )}/>

                        <Route component={Error}/>
                    </Switch>
                    <Footer/>
                </div>
            </DocumentTitle>
        );
    }
}

Router.propTypes = {
    user: PropTypes.object.isRequired,
    onUserSignIn: PropTypes.func.isRequired,
    onUserSignUp: PropTypes.func.isRequired,
    onUserLogOut: PropTypes.func.isRequired,
    router: PropTypes.object
};

export default withRouter(Router);

