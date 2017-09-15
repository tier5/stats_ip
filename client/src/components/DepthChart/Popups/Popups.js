import React from 'react';
//import PropTypes from 'prop-types';

import twitter from '../../../resources/basic/images/socials/twitter.png';

class Popups extends React.Component {

    componentDidMount() {
        window.jQuery( "#tabs" ).tabs();
    }

    render() {
        return (
            <div className="popes-content" id="playercard_malik-jackson">
                <div className="pop-inner pop-playercard">
                    <a className="popes-close"><span className="sr-only">Close popup</span></a>
                    <div className="head">
                        <span className="health healthy">Healthy</span> {/* .healthy, .injured */}
                        <span className="name">Malik Jackson</span>
                        <span className="position">DT #90</span>
                        <span className="team"><strong>Jacksonville jaguars</strong> bye - 9</span>
                        <div className="player-maindata">
                            <div className="item">
                                <span className="name">height</span><br/>
                                <span className="data">6'5"</span><br/>
                            </div>
                            <div className="item">
                                <span className="name">WEIGHT</span><br/>
                                <span className="data">300 lbs</span><br/>
                            </div>
                            <div className="item">
                                <span className="name">SEASON</span><br/>
                                <span className="data">6th Season</span><br/>
                            </div>
                            <div className="item">
                                <span className="name">city</span><br/>
                                <span className="data">Tennessee</span><br/>
                            </div>
                        </div>
                        <span className="socials"><a href="#twitter"><img src={twitter}
                                                                   alt="Twitter"/> @TheMalikJackson</a></span>
                    </div>
                    <div className="tabs" id="tabs">
                        <ul className="tab_ul">
                            <li className="tab_li"><a href="#tabs-1">STATS IP</a></li>
                            <li className="tab_li"><a href="#tabs-2">PLAYER NEWS</a></li>
                            <li className="tab_li"><a href="#tabs-3">INJURY NEWS</a></li>
                        </ul>
                        <div className="tabitem tab_statip" id="tabs-1">
                            <div className="half">

                                <span className="offdef">Upcoming: @ Tennessee Titans</span>

                                <div className="twocoldata">
                                    <div className="dataheader">
                                        Past 5 Seasons, Vs. TENN
                                    </div>
                                    <div className="sto">
                                        <ul>
                                            <li>
                                                <span className="dleft">Tackles:</span>
                                                <span className="dright">6</span>
                                            </li>
                                            <li>
                                                <span className="dleft">Assists:</span>
                                                <span className="dright">2</span>
                                            </li>
                                            <li>
                                                <span className="dleft">TD's:</span>
                                                <span className="dright">0.0</span>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span className="dleft">Rushes:</span>
                                                <span className="dright">4</span>
                                            </li>
                                            <li>
                                                <span className="dleft">Sacks:</span>
                                                <span className="dright">1.5</span>
                                            </li>
                                            <li>
                                                <span className="dleft">F. Fumble:</span>
                                                <span className="dright">1</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="twocoldata">
                                    <div className="dataheader">
                                        Past 5 Seasons, Vs. DC, J. Michael
                                    </div>
                                    <div className="sto">
                                        <ul>
                                            <li>
                                                <span className="dleft">Tackles:</span>
                                                <span className="dright">6</span>
                                            </li>
                                            <li>
                                                <span className="dleft">Assists:</span>
                                                <span className="dright">2</span>
                                            </li>
                                            <li>
                                                <span className="dleft">TD's:</span>
                                                <span className="dright">0.0</span>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span className="dleft">Rushes:</span>
                                                <span className="dright">4</span>
                                            </li>
                                            <li>
                                                <span className="dleft">Sacks:</span>
                                                <span className="dright">1.5</span>
                                            </li>
                                            <li>
                                                <span className="dleft">F. Fumble:</span>
                                                <span className="dright">1</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className="half">
                            </div>
                        </div>
                        <div className="tabitem" id="tabs-2">

                        </div>
                        <div className="tabitem" id="tabs-3">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Popups.propTypes = {};

export default Popups;