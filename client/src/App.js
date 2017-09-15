import React, {Component} from 'react';
import Promise from 'promise';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Router from './components/Router';


class App extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                loggedIn: false,
                premium: false,
            },
            loading: true
        };
        this._loadUser();
    }

    componentDidMount() {
        this.interval = setInterval(this._loadUser.bind(this), 3 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSignUp(values) {
        return axios.post('/api/auth/signUp', values);
    }

    handleSignIn(values) {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/signIn', values).then((res) => {
                this._setUser(res.data.data);
                resolve();
            }, () => {
                reject();
            })
        });
    }

    handleLogOut() {
        return new Promise((resolve, reject) => {
            axios.delete('/api/auth/signIn').then((res) => {
                this._setUser();
                resolve();
            }, () => {
                this._setUser();
                reject();
            })
        });
    }

    _loadUser() {
        axios.get('/api/auth/user').then((res) => {
            this._setUser(res.data.data);
        }, () => {
            this._setUser();
        });
    }

    _setUser(userData) {
        if(!userData) {
            const user = {
                loggedIn: false,
                premium: false
            };

            this.setState({
                loading: false,
                user: user
            });
        } else {
            const premium = true;
            const user = {
                loggedIn: true,
                premium: premium,
                data: userData
            };

            this.setState({
                loading: false,
                user: user
            });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Router user={this.state.user}
                        onUserSignUp={this.handleSignUp.bind(this)}
                        onUserSignIn={this.handleSignIn.bind(this)}
                        onUserLogOut={this.handleLogOut.bind(this)}
                />
            </BrowserRouter>
        );
    }
}

export default App;
