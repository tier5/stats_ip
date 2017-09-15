import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';

import './Header.css';

import myacc from '../../resources/basic/images/myacc.png';
import refer from '../../resources/basic/images/refer.png';
import logout from '../../resources/basic/images/logout.png';


const HeaderLink = (props) => {

    if (props.soon) {
        return (
            <a className="comingSoon"
               data-comingribbon="Coming soon!">
                {props.children}
            </a>
        );
    }

    return (
        <div className="Comp-HeaderLink">
            {props.user.loggedIn && <NavLink
                to={props.to}
                exact={true}
                activeClassName="active">
                {props.children}
            </NavLink>}
            {!props.user.loggedIn && <Link
                to={props.logoutTo}>
                {props.children}
            </Link>}
        </div>
    );
};

class Header extends React.Component {

    componentDidUpdate() {
        window.seh();
        window.seh2();
    }

    render() {
        return (
            <header className="Comp-Header">
                <Link to="/" className="logo"/>
                <nav className="topnav">
                    <HeaderLink to="/stats-ip" logoutTo="/sign-up" user={this.props.user}>
                        Stats Ip
                    </HeaderLink>
                    <HeaderLink to="/weather-report" logoutTo="/sign-up" user={this.props.user}>
                        Weather report
                    </HeaderLink>
                    <HeaderLink to="/depth-chart" logoutTo="/sign-up" user={this.props.user}>
                        Depth chart
                    </HeaderLink>
                </nav>
                <div className="rightsec">
                    {this.props.user.loggedIn &&
                    <span className="hello_user">Hello, <strong>{this.props.user.data.firstname}</strong></span>}

                    {!this.props.user.premium &&
                    <Link to="/sign-up" className="getpremium hidden-under-600">GET FREE TRIAL</Link>}
                    {!this.props.user.premium && <span className="line hidden-under-600"/>}

                    {!this.props.user.loggedIn && <Link to="/sign-in" className="login"><span>Login</span></Link>}
                    {this.props.user.loggedIn && <span className="line"/>}

                    {this.props.user.loggedIn && <div className="rightmenuwrap">
                        <a className="menu seh" data-seh="hesshow">
                            <span className="sr-only">Open menu</span>
                        </a>
                        <div className="hes hesshow" id="hesshow">
                            {false && <a href="#account"><img src={myacc} alt=""/> My Account</a>}
                            {false && <a href="#refer"><img src={refer} alt=""/> Refer a Friend</a>}
                            <Link to="/log-out"><img src={logout} alt=""/> Log-Out</Link>
                        </div>
                    </div>}
                </div>
                <div className="visible-under-600 rightsec rightsec-lower">
                    {!this.props.user.premium &&
                    <Link to="/sign-up" className="getpremium">GET FREE TRIAL</Link>}
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object.isRequired
};

export default Header;