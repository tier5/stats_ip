import React from 'react';
import PropTypes from 'prop-types';

import teams from '../../../utils/parameters/teams';

const DefensiveHeader = (props) => {
        const coord = (props.defTeam.players.length > 0) ? props.defTeam.players[0].defcoordweek : 'No Players';

        return (
            <div className="Comp-DefensiveHeader team-header">
                <span className={'team teamFontColor-'+props.defTeam.abbr}>{teams[props.defTeam.abbr].fullName}</span>
                DC
                <span className={'teamCoordinator'}>{coord}</span>
                @
                <span className={'team teamFontColor-'+props.offTeam.abbr}>{teams[props.offTeam.abbr].fullName}</span>
            </div>
        )
    }
;

DefensiveHeader.propTypes = {
    defTeam: PropTypes.object.isRequired,
    offTeam: PropTypes.object.isRequired
};

export default DefensiveHeader;