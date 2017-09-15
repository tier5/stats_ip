import React from 'react';
import PropTypes from 'prop-types';

import seasons from '../../../utils/parameters/seasons';

class Seasons extends React.Component {

    handleSeasonChange(season) {
        let splits = this.props.filters.splits;
        if(!season.includes('SEASON') || season === 'THIS_SEASON') {
            splits.WEEKS = [];
        }

        const newFilters = Object.assign({}, this.props.filters, {
            season: season,
            splits: splits
        });
        this.props.onFiltersChange(newFilters);
    }

    render() {
        return (
            <div>
                <div className="navwrap">
                    <a className="navwrap_main-a">SEASONS</a>
                    <div className={'navcontent_1 seasons-1 halfline'}>
                        <div className="col">
                            {Object.keys(seasons).map((seasonAbr) => {
                                if (seasonAbr.includes('SEASON') && seasonAbr !== 'THIS_SEASON') return false;
                                return (
                                    <div key={seasonAbr}>
                                        <input checked={this.props.filters.season === seasonAbr}
                                               id={'season_' + seasonAbr} value={seasonAbr} type="checkbox"
                                               onChange={() => this.handleSeasonChange(seasonAbr)}/>
                                        <label htmlFor={'season_' + seasonAbr}>{seasons[seasonAbr]}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col">
                            {Object.keys(seasons).map((seasonAbr) => {
                                if (!seasonAbr.includes('SEASON') || seasonAbr === 'THIS_SEASON') return false;
                                return (
                                    <div key={seasonAbr}>
                                        <input checked={this.props.filters.season === seasonAbr}
                                               id={'season_' + seasonAbr} value={seasonAbr} type="checkbox"
                                               onChange={() => this.handleSeasonChange(seasonAbr)}/>
                                        <label htmlFor={'season_' + seasonAbr}>{seasons[seasonAbr]}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={() => {

                        }} className="ok-button">OK
                        </button>
                    </div>
                </div>
                {this.props.filters.season &&
                    <span className="leftfilter">{seasons[this.props.filters.season]} <a onClick={() => {
                        this.handleSeasonChange('');
                    }}><span className="sr-only">Remove Filter</span></a></span>
                }
            </div>
        );
    }
}

Seasons.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
};

export default Seasons;