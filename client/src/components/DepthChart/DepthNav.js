import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import axios from 'axios';

import teams from '../../utils/parameters/teams';

import './DepthNav.css';

class DepthNav extends Component {

    constructor() {
        super();

        this.state = {
            weekGames: [],
        };
    }

    componentDidMount() {
        this._loadGames(this.props.week);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.week !== this.props.week)
            this._loadGames(this.props.week);
    }

    _loadGames(week) {
        axios.get('/api/depth/games', {
            params: {
                week: week
            }
        }).then((res) => {
            const newState = {
                weekGames: res.data.data.games
            };

            if (newState.weekGames.length > 0) {
                newState.offTeam = res.data.data.games[0].offTeam;
                newState.offLineTeam = res.data.data.games[0].offTeam;
                newState.defTeam = res.data.data.games[0].defTeam;
            }
            this.setState(newState, () => {
                this.props.onTeamsChange(this.state.defTeam, this.state.offTeam, this.state.offLineTeam);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <nav className="Comp-DepthNav depth-nav">
                {this.state.weekGames.map((weekGame, index) => {
                    const isActive = (weekGame.defTeam === this.props.defTeam
                        && weekGame.offTeam === this.props.offTeam)
                        || (weekGame.defTeam === this.props.offTeam
                            && weekGame.offTeam === this.props.defTeam);

                    const classes = classnames({
                        active: isActive
                    });

                    if (!teams[weekGame.offTeam]) console.log(weekGame);
                    if (!teams[weekGame.defTeam]) console.log(weekGame);

                    return (
                        <a key={index} className={classes} onClick={() => {
                            this.props.onTeamsChange(weekGame.defTeam, weekGame.offTeam, weekGame.offTeam);
                        }}>
                            {teams[weekGame.offTeam].fullName} @ {teams[weekGame.defTeam].fullName}

                            {isActive && <span className="switch" onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                const temp = weekGame.defTeam;
                                weekGame.defTeam = weekGame.offTeam;
                                weekGame.offTeam = temp;

                                this.props.onTeamsChange(weekGame.defTeam, weekGame.offTeam, weekGame.offTeam);
                            }}><span
                                className="sr-only">Switch defensive and offensive</span></span>}
                        </a>
                    );
                })}
            </nav>
        );
    }
}

DepthNav.propTypes = {
    week: PropTypes.number.isRequired,
    offTeam: PropTypes.string.isRequired,
    offLineTeam: PropTypes.string.isRequired,
    defTeam: PropTypes.string.isRequired,
    onTeamsChange: PropTypes.func.isRequired
};

export default DepthNav;