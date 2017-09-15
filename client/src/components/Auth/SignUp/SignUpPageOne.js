import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import axios from 'axios';

class SignUpPageOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.values.email || '',
            password: props.values.password || '',
            password2: props.values.password || '',
            emailError: false,
            emailChecked: false,
            passwordError: false
        };

        if(this.state.email.length !== 0) {
            this._checkEmail(this.state.email);
        }
    }


    _checkEmail(email) {
        axios.get('/api/auth/isEmailAvailable', {
            params: {
                email: email,
                emailChecked: false
            }
        }).then((res) => {
            this.setState({
                emailError: !res.data.data,
                emailChecked: true
            });
        }, () => {
            this.setState({
                emailError: true,
                emailChecked: true
            });
        });
    }
    handleEmailChange(evt) {
        const val = evt.target.value;

        const newState = {
            email: val
        };

        if(val.length > 50) return;

        // eslint-disable-next-line
        if (val.length > 0 && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
            newState.emailError = true;
        } else {
            this._checkEmail(val);
        }

        this.setState(newState);
    }

    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    handlePassword2Change(evt) {
        const val = evt.target.value;

        const newState = {
            password2: evt.target.value
        };

        if (val.length > 0 && this.state.password !== val) {
            newState.passwordError = true;
        } else {
            newState.passwordError = false;
        }

        this.setState(newState);
    }

    validateValues() {
        const newState = {};
        if (this.state.email.length === 0) {
            newState.emailError = true;
        }
        else if (this.state.password.length === 0 || this.state.password2.length === 0 || this.state.password !== this.state.password2) {
            newState.passwordError = true;
        }

        if (newState.emailError || this.state.emailError || !this.state.emailChecked
            || newState.passwordError || this.state.passwordError) {

            this.setState(newState);
            return false;
        } else
            return true;
    }

    render() {
        const emailClasses = ClassNames('user', {
            'error': this.state.emailError
        });

        const passwordClasses = ClassNames('pass', {
            'error': this.state.passwordError
        });

        return (
            <section className="signinupwrap">
                <div className="container">

                    <div className="signinupform">
                        <div className="block top">
                            <h1>sign up today</h1>
                        </div>
                        <div className="block progress">
                            <a className="active">
                                <span className="circle">1</span>
                                <span className="text">Personal info</span>
                            </a>
                            <a>
                                <span className="circle">2</span>
                                <span className="text">Free trial</span>
                            </a>
                            {false && <a>
                                <span className="circle">3</span>
                                <span className="text">Payment</span>
                            </a>}
                        </div>
                        <div className="block inputs">
                            <h2>Personal info</h2>
                            <input className={emailClasses} type="text" value={this.state.email}
                                   placeholder="Enter Your email address"
                                   onChange={this.handleEmailChange.bind(this)}/>
                            <input className="pass" type="password" value={this.state.password}
                                   placeholder="Password"
                                   onChange={this.handlePasswordChange.bind(this)}/>
                            <input className={passwordClasses} type="password" value={this.state.password2}
                                   placeholder="Password again"
                                   onChange={this.handlePassword2Change.bind(this)}/>
                            <button type="button" className="buttonarrow" onClick={() => {
                                if (this.validateValues())
                                    this.props.onPageChange(2, {
                                        email: this.state.email,
                                        password: this.state.password
                                    });
                            }}>Next
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

SignUpPageOne.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
};

export default SignUpPageOne;