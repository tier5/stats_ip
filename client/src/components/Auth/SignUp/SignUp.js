import React from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import SignUpPageOne from "./SignUpPageOne";
import SignUpPageTwo from "./SignUpPageTwo";
import DocumentTitle from 'react-document-title'

import './SignUp.css';


class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            values: {
                urlsignup: props.location.pathname + props.location.search
            }
        }
    }

    handleChangePage(page, values) {
        this.setState((oldState) => {
            const newState = {
                page: ((page === 4) ? 2 : page) // TODO: change back to 3 when third set up is added
            };

            if (values) newState.values = Object.assign({}, oldState.values, values);
            return newState;
        }, () => {
            if (page === 4) {
                this.props.onUserSignUp(this.state.values).then(() => {
                    this.props.history.push('/sign-in');
                }, () => {
                    this.setState({
                        page: 1
                    })
                });
            }
        })
    }

    render() {
        return (
            <DocumentTitle title="Sign Up - StatRoute">
                <div className="Comp-SignUp">
                    {this.state.page === 1 &&
                    <SignUpPageOne onPageChange={this.handleChangePage.bind(this)} values={this.state.values}/>}
                    {this.state.page === 2 &&
                    <SignUpPageTwo onPageChange={this.handleChangePage.bind(this)} values={this.state.values}/>}
                </div>
            </DocumentTitle>
        );
    }
}

SignUp.propTypes = {
    onUserSignUp: PropTypes.func.isRequired,
};

export default withRouter(SignUp);