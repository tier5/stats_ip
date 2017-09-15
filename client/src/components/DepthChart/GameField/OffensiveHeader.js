import React from 'react';
import PropTypes from 'prop-types';

import teams from '../../../utils/parameters/teams';

const OffensiveHeader = (props) => {
        const coord = (props.offTeam.players.length > 0) ? props.offTeam.players[0].offcoordweek : 'No Players';

        return (
            <div className="Comp-OffensiveHeader team-header">
                <span className={'team teamFontColor-'+props.offTeam.abbr}>{teams[props.offTeam.abbr].fullName}</span>
                OC
                <span className={'teamCoordinator'}>{coord}</span>
                vs.
                <span className={'team teamFontColor-'+props.defTeam.abbr}>{teams[props.defTeam.abbr].fullName}</span>
            </div>
        )
    }
;

OffensiveHeader.propTypes = {
    defTeam: PropTypes.object.isRequired,
    offTeam: PropTypes.object.isRequired
};

export default OffensiveHeader;