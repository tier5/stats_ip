import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false
        };
    }

    handleUsernameChange(evt) {
        const val = evt.target.value.replace(/\s+/, '');
        if (val.length > 25) return;
        this.setState({
            username: val,
            error: false
        });
    }

    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value,
            error: false
        });
    }

    validateValues() {
        if (this.state.username.length === 0 || this.state.username > 25) return false;
        else if (this.state.password.length === 0) return false;
        return true;
    }

    handleSubmit(evt) {
        if(evt) evt.preventDefault();

        if (this.validateValues()) {
            this.props.onUserSignIn({
                username: this.state.username,
                password: this.state.password
            }).then(() => {
                // no need to do anything router will automatically redirect
            }, () => {
                this.setState({
                    error: true
                })
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (
            <DocumentTitle title="Sign In - StatRoute">
                <div className="Comp-SignIn">
                    <section className="signinupwrap">
                        <div className="container">

                            <div className="signinupform">
                                <div className="block top">
                                    <h1>Sign in</h1>
                                </div>
                                <div className="block inputs">
                                    <h2>Login in to your account</h2>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <input className={'user' + ((this.state.error) ? ' error' : '')} type="text"
                                               placeholder="Username" value={this.state.username}
                                               onChange={this.handleUsernameChange.bind(this)}
                                        />
                                        <input className={'pass' + ((this.state.error) ? ' error' : '')} type="password"
                                               placeholder="*******" value={this.state.password}
                                               onChange={this.handlePasswordChange.bind(this)}
                                        />
                                        <Link to="/" className="forgotpass hidden">I forgot my password</Link>
                                        {this.state.error && <p className="error">Invalid credentials</p>}
                                        <button type="submit">sign in
                                        </button>
                                    </form>
                                </div>
                                <div className="block bottom">
                                    <Link to="/sign-up" className="noacc">I don’t have an account yet</Link>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}

SignIn.propTypes = {
    onUserSignIn: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
