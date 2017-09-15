import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './LandingPage.css';

import PlayerNews from "./PlayerNews";
import NewsCarousel from "./NewsCarousel";

class LandingPage extends React.Component {

    componentDidMount() {
        window.$("body").addClass('website');
    }

    componentWillUnmount() {
        window.$("body").removeClass('website');
    }

    render(props) {

        return (
            <div className="Comp-LandingPage website">
                <section className="podhead">
                    <div className="container">
                        <h1>Unmatched relevance. stats you deserve.</h1>
                        {!this.props.user.loggedIn && <div>
                            <p>SIGN UP FOR A FREE TRIAL</p>
                            <Link to="/sign-up" className="cta_blue"><span>Sign Up Today!</span></Link>
                        </div>}
                    </div>
                </section>

                <section className="redline">
                    <div className="container">
                        <h2>Welcome to the New Standard for Stats Delivery</h2>
                        <p>
                            StatRoute will allow millions of Fantasy Football Participants to locate any data point, for
                            any player or team in 7-seconds or less.<br/>
                            Now, for the first time ever, you can make decisions based on relevance and real data.
                        </p>
                    </div>
                </section>

                <section className="intro_schedule">
                    <div className="container">
                        <h2 className="h2_blueico">Our youtube channel</h2>
                        <div className="sto">
                            <div className="iframe-yotuube-wrapper">
                                <iframe width="100%" height="450" src="https://www.youtube.com/embed/6sSdaQVZtP0?rel=0"
                                        frameBorder="0" allowFullScreen title="Our youtube channel"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="news">
                    <div className="container">
                        <h2 className="h2_blueico">StatRoute News</h2>

                        <NewsCarousel/>

                        <PlayerNews/>

                    </div>
                </section>

                <section className="adv hidden">
                    <div className="container">
                        <div style={{float: 'left', width: '100%', height: '200px', background: '#edf0f5'}}/>
                    </div>
                </section>
            </div>
        );
    }
}

LandingPage.propTypes = {
    user: PropTypes.object.isRequired
};

export default LandingPage;
