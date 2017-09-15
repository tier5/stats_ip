import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import weatherStatipRozmaz from '../../../resources/basic/images/wether-statip-rozmaz.jpg';
import DefensiveTeamStats from "./DefensiveTeamStats";
import OffensiveTeamStats from "./OffensiveTeamStats";

import './DepthMoreData.css';

class DepthMoreData extends Component {

    render() {
        return (
            <div className="Comp-DepthMoreData moredata">

                {this.props.premium && <div className="datawrap" id="moredata">

                    <DefensiveTeamStats team={this.props.defTeam} vsTeam={this.props.offTeam}/>
                    <OffensiveTeamStats team={this.props.offTeam} vsTeam={this.props.defTeam}/>

                </div>}


                {!this.props.premium && <div className="datawrap getpremium">
                    <img alt="Background" src={weatherStatipRozmaz}/>
                    <div className="getpremiumbox">
                        <div className="box">
                            <p>This awesome feature is available for <strong>Premium Users</strong> only.
                                Want access?
                            </p>
                            <Link to="/sign-up">GET FREE TRIAL</Link>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

DepthMoreData.propTypes = {
    premium: PropTypes.bool.isRequired,
    defTeam: PropTypes.string.isRequired,
    offTeam: PropTypes.string.isRequired
};

export default DepthMoreData;