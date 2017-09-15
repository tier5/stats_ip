import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import ClassNames from 'classnames';
import axios from 'axios';

class SignUpPageTwo extends React.Component {
    constructor(props) {
        super(props);

        //const today = moment();

        this.state = {
            firstName: props.values.firstName || '',
            lastName: props.values.lastName || '',
            username: props.values.username || '',
            zip: props.values.zip || '',
            // gender: props.values.gender || '',
            // byear: props.values.byear || today.year(),
            // bmon: props.values.bmon || today.month() + 1,
            // bday: props.values.bday || today.date(),
            promoCode: props.values.promoCode || '',
            newsletter: props.values.newsletter || false,
            termsAndConditions: props.values.termsAndConditions || false,

            firstNameError: false,
            lastNameError: false,
            usernameError: false,
            usernameChecked: false,
            zipError: false,
            // genderError: false,
            // bdayError: false,
            termsAndConditionsError: false
        }
    }

    handleFirstNameChange(evt) {
        const val = evt.target.value;
        if (val.length > 25) return;
        this.setState({
            firstName: val,
            firstNameError: false
        });
    }

    handleLastNameChange(evt) {
        const val = evt.target.value;
        if (val.length > 25) return;
        this.setState({
            lastName: val,
            lastNameError: false
        });
    }

    handleUsernameChange(evt) {
        const val = evt.target.value.replace(/\s+/, '');
        if (val.length > 25) return;
        this.setState({
            username: val,
            usernameChecked: false
        });
        if (val.length === 0) return;

        axios.get('/api/auth/isUsernameAvailable', {
            params: {
                username: val
            }
        }).then((res) => {
            this.setState({
                usernameError: !res.data.data,
                usernameChecked: true
            });
        }, () => {
            this.setState({
                usernameError: true,
                usernameChecked: true
            });
        });
    }

    handleZipChange(evt) {
        const val = evt.target.value;

        const newState = {
            zip: val
        };

        if (val.length > 0 && !/^[0-9]{5}$/.test(val)) {
            newState.zipError = true;
        } else {
            newState.zipError = false;
        }
        this.setState(newState);
    }

    /*handleGenderChange(evt) {
        const val = evt.target.value;

        const newState = {
            gender: val
        };

        if (!['F', 'M'].includes(val)) {
            newState.genderError = true;
        } else {
            newState.genderError = false;
        }
        this.setState(newState);
    }

    handleBirthdayChange(year, mon, day) {
        const newState = {
            byear: year,
            bmon: mon,
            bday: day
        };

        if (moment(year + '-' + mon + '-' + day, 'YYYY-M-D').add(1, 'days').isSameOrAfter(moment())) {
            newState.bdayError = true;
        } else {
            newState.bdayError = false;
        }

        this.setState(newState);
    }*/

    handleNewsletterChange(evt) {
        this.setState({
            newsletter: evt.target.checked
        })
    }

    handleTermsAndConditionsChange(evt) {
        this.setState({
            termsAndConditions: evt.target.checked,
            termsAndConditionsError: !evt.target.checked
        })
    }

    validateValues() {
        const newState = {};
        let hasError = false;

        if (this.state.firstNameError || this.state.firstName.length === 0) {
            newState.firstNameError = true;
            hasError = true;
        }

        if (this.state.lastNameError || this.state.lastName.length === 0) {
            newState.lastNameError = true;
            hasError = true;
        }

        if (this.state.usernameError || !this.state.usernameChecked || this.state.username.length === 0) {
            newState.usernameError = true;
            hasError = true;
        }

        if (this.state.zipError || this.state.zip.length === 0) {
            newState.zipError = true;
            hasError = true;
        }

        if (this.state.zipError || this.state.zip.length === 0) {
            newState.zipError = true;
            hasError = true;
        }

        /*if (this.state.genderError || !['F', 'M'].includes(this.state.gender)) {
            newState.genderError = true;
            hasError = true;
        }

        if (this.state.bdayError || moment(this.state.byear + '-' + this.state.bmon + '-' + this.state.bday, 'YYYY-M-D')
                .add(1, 'days').isSameOrAfter(moment())) {
            newState.bdayError = true;
            hasError = true;
        }*/

        if (!this.state.termsAndConditions) {
            newState.termsAndConditionsError = true;
            hasError = true;
        }

        this.setState(newState);
        return !hasError;
    }

    render() {
        return (
            <section className="signinupwrap">
                <div className="container">

                    <div className="signinupform">
                        <div className="block top">
                            <h1>sign up today</h1>
                        </div>
                        <div className="block progress">
                            <a onClick={() => {
                                this.props.onPageChange(1);
                            }} className="active clickable">
                                <span className="circle">1</span>
                                <span className="text">Personal info</span>
                            </a>
                            <a className="active">
                                <span className="circle">2</span>
                                <span className="text">Free trial</span>
                            </a>
                            {false && <a>
                                <span className="circle">3</span>
                                <span className="text">Payment</span>
                            </a>}
                        </div>

                        <div className="block selectplan hidden">
                            <h2>Select Your Plan</h2>

                            <input id="monthly" type="radio" name="plan"/>
                            <label htmlFor="monthly">
                                <span className="what">monthly</span>
                                <span className="price">$14.99</span>
                                <span className="often">Per Month</span>
                            </label>
                            <input id="yearly" type="radio" name="plan"/>
                            <label className="big" htmlFor="yearly">
                                <span className="what">yearly</span>
                                <span className="price">$49.99</span>
                                <span className="often">Per Year</span>
                            </label>
                            <input id="lifetime" type="radio" name="plan"/>
                            <label htmlFor="lifetime">
                                <span className="what">lifetime</span>
                                <span className="price">$199.99</span>
                                <span className="often">Once-only</span>
                            </label>
                        </div>

                        <div className="block inputs">
                            <h2>Personal information</h2>
                            <input className={(this.state.firstNameError) ? 'error' : null} type="text"
                                   value={this.state.firstName} placeholder="First Name"
                                   onChange={this.handleFirstNameChange.bind(this)}/>
                            <input className={(this.state.lastNameError) ? 'error' : null} type="text"
                                   value={this.state.lastName} placeholder="Last Name"
                                   onChange={this.handleLastNameChange.bind(this)}/>
                            <input className={(this.state.usernameError) ? 'error' : null} type="text"
                                   value={this.state.username} placeholder="Username"
                                   onChange={this.handleUsernameChange.bind(this)}/>
                            <input className={(this.state.zipError) ? 'error' : null} type="text" value={this.state.zip}
                                   placeholder="ZIP code"
                                   onChange={this.handleZipChange.bind(this)}/>

                            <div className="regdata">
                                {false && <div className="item">
                                    <span className="left">Gender:</span>
                                    <div className="right">
                                        <input id="male" type="radio" name="gender" value="M"
                                               className={(this.state.genderError) ? 'error' : null}
                                               checked={this.state.gender === "M"}
                                               onChange={this.handleGenderChange.bind(this)}
                                        />
                                        <label className="radiolab" htmlFor="male">Male</label>
                                        <input id="female" type="radio" name="gender" value="F"
                                               className={(this.state.genderError) ? 'error' : null}
                                               checked={this.state.gender === "F"}
                                               onChange={this.handleGenderChange.bind(this)}
                                        />
                                        <label className="radiolab" htmlFor="female">Female</label>
                                    </div>
                                </div>}
                                {false && <div className="item">
                                    <span className="left dateofbirth">Date of Birth:</span>
                                    <div className="right">
                                        <div className={'nice-select month' + ((this.state.bdayError) ? ' error' : '')}
                                             tabIndex="0">
                                            <span className="current">{('00' + (this.state.bmon)).substr(-2)}</span>
                                            <ul className="list">
                                                {Array.from(new Array(12).keys()).map((number) => {
                                                    const value = ('00' + (number + 1)).substr(-2);
                                                    let classNames = ClassNames('option', {
                                                        selected: this.state.bmon === number + 1
                                                    });

                                                    return (
                                                        <li key={number} className={classNames} value={number + 1}
                                                            onClick={() => {
                                                                this.handleBirthdayChange(this.state.byear, number + 1, this.state.bday);
                                                            }}>{value}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                        <div className={'nice-select day' + ((this.state.bdayError) ? ' error' : '')}
                                             tabIndex="0">
                                            <span className="current">{('00' + (this.state.bday)).substr(-2)}</span>
                                            <ul className="list">
                                                {Array.from(new Array(31).keys()).map((number) => {
                                                    const value = ('00' + (number + 1)).substr(-2);
                                                    let classNames = ClassNames('option', {
                                                        selected: this.state.bday === number + 1
                                                    });

                                                    return (
                                                        <li key={number} className={classNames} onClick={() => {
                                                            this.handleBirthdayChange(this.state.byear, this.state.bmon, number + 1);
                                                        }}>{value}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                        <div className={'nice-select year' + ((this.state.bdayError) ? ' error' : '')}
                                             tabIndex="0">
                                            <span className="current">{('0000' + (this.state.byear)).substr(-4)}</span>
                                            <ul className="list">
                                                {Array.from(new Array(moment().year() - 1900 + 1).keys()).reverse().map((number) => {
                                                    const value = ('0000' + (number + 1900)).substr(-4);
                                                    let classNames = ClassNames('option', {
                                                        selected: this.state.byear === number + 1
                                                    });

                                                    return (
                                                        <li key={number} className={classNames} onClick={() => {
                                                            this.handleBirthdayChange(number + 1900, this.state.bmon, this.state.bday);
                                                        }}>{value}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                    </div>
                                </div>}
                                <div className="item hidden">
                                    <span className="left">Promo Code</span>
                                    <div className="right promo">
                                        <input type="text" value={this.state.promoCode}
                                               placeholder="Enter Your Promo Code Here"
                                               onChange={(evt) => this.setState({promoCode: evt.target.value})}/>
                                        <button type="submit">Apply</button>
                                    </div>
                                </div>
                                <div className="item newsletter">
                                    <input type="checkbox" id="newsletter_signup" checked={this.state.newsletter}
                                           onChange={this.handleNewsletterChange.bind(this)}/>
                                    <label className="checklab" htmlFor="newsletter_signup">Sign up for a
                                        newsletter</label>
                                </div>
                                <div className="item">
                                    <input className={(this.state.termsAndConditionsError) ? 'error' : null}
                                           type="checkbox" id="terms_and_conditions"
                                           checked={this.state.termsAndConditions}
                                           onChange={this.handleTermsAndConditionsChange.bind(this)}/>
                                    <label className="checklab" htmlFor="terms_and_conditions"><Link
                                        to="/pages/terms-and-conditions" target="_blank">I agree with Terms & Conditions</Link></label>
                                </div>
                            </div>

                            <button type="button" className="buttonarrow" onClick={() => {
                                if (this.validateValues())
                                    this.props.onPageChange(4, {
                                        firstname: this.state.firstName,
                                        lastname: this.state.lastName,
                                        username: this.state.username,
                                        zip: this.state.zip,
                                        //gender: this.state.gender,
                                        //bday: this.state.bday,
                                        //bmonth: this.state.bmon,
                                        newsletter: this.state.newsletter
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

SignUpPageTwo.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
};

export default SignUpPageTwo;