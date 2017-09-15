import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import splits from '../../../utils/parameters/splits';

import './Splits.css';

class Splits extends React.Component {

    handleWeeksChange(weeks) {
        // if (weeks.length > 0) this.handleQuartersChange(['ALL']);

        let season = this.props.filters.season;
        if (weeks.length > 0 && (!season.includes('SEASON') || season === 'THIS_SEASON')) {
            season = '';
        }

        const newFilters = Object.assign({}, this.props.filters, {
            splits: Object.assign(this.props.filters.splits, {WEEKS: weeks}),
            season: season
        });
        this.props.onFiltersChange(newFilters);
    }

    handleQuartersChange(quarters) {
        // if (quarters.length > 0) this.handleWeeksChange([]);
        const newFilters = Object.assign({}, this.props.filters, {
            splits: Object.assign(this.props.filters.splits, {QUARTERS: quarters})
        });
        this.props.onFiltersChange(newFilters);
    }

    handleInputWeeksChange(evt) {
        const weeks = this.props.filters.splits.WEEKS.slice();

        if(weeks.length >= 0 && weeks.includes('ALL')) {
            weeks.splice(weeks.indexOf('ALL'), 1);
        }

        if (weeks.includes(evt.target.value)) {
            if (!evt.target.checked) {
                weeks.splice(weeks.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            if(evt.target.value === 'ALL') {
                weeks.splice(0, weeks.length);
            }
            weeks.push(evt.target.value);
        }
        weeks.sort((a, b) => {
            const keys = Object.keys(splits.WEEKS);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        this.handleWeeksChange(weeks);
    }

    handleInputQuartersChange(evt) {
        const quarters = this.props.filters.splits.QUARTERS.slice();

        if(quarters.length >= 0 && quarters.includes('ALL')) {
            quarters.splice(quarters.indexOf('ALL'), 1);
        }

        if (quarters.includes(evt.target.value)) {
            if (!evt.target.checked) {
                quarters.splice(quarters.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            if(evt.target.value === 'ALL') {
                quarters.splice(0, quarters.length);
            }
            quarters.push(evt.target.value);
        }
        quarters.sort((a, b) => {
            const keys = Object.keys(splits.QUARTERS);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        if(quarters.length === 0) {
            quarters.push('ALL');
        }

        this.handleQuartersChange(quarters);
    }

    render() {
        return (
            <div className="Comp-Splits">
                <div className="navwrap">
                    <a className="navwrap_main-a">Splits</a>
                    <div className="navcontent_1 weather-1 halfline">
                        <div className="col">
                            <form id="weeksForm">
                                {Object.keys(splits.WEEKS).map((weekKey) => {
                                    let disabled = false;
                                    if (this.props.filters.season.includes('THIS_SEASON')) {
                                        disabled = true;
                                    }

                                    const classNames = ClassNames({
                                        'disabled': disabled
                                    });

                                    return (
                                        <div key={weekKey}>
                                            <input checked={this.props.filters.splits.WEEKS.includes(weekKey)}
                                                   id={weekKey} value={weekKey} type="checkbox"
                                                   name="weeks[]" onChange={(evt) => {
                                                if (disabled) {
                                                    evt.target.checked = false;
                                                }
                                                this.handleInputWeeksChange(evt);
                                            }}/>
                                            <label className={classNames} htmlFor={weekKey}>{splits.WEEKS[weekKey]}</label>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="col">
                            <form id="quartersForm">
                                {Object.keys(splits.QUARTERS).map((quarterKey) => {
                                    let disabled = false;

                                    const quarters = this.props.filters.splits.QUARTERS;

                                    if (quarterKey !== 'ALL' && !quarters.includes(quarterKey)) {

                                        if (quarterKey !== 'OT' && quarters.includes('OT')) {
                                            disabled = true;
                                        }

                                        if (quarterKey !== '2_QUATER' && quarters.includes('1_QUATER')) {
                                            disabled = true;
                                        }
                                        if (quarterKey !== '1_QUATER' && quarters.includes('2_QUATER')) {
                                            disabled = true;
                                        }

                                        if (quarterKey !== '3_QUATER' && quarters.includes('4_QUATER')) {
                                            disabled = true;
                                        }
                                        if (quarterKey !== '4_QUATER' && quarters.includes('3_QUATER')) {
                                            disabled = true;
                                        }
                                    }

                                    const classNames = ClassNames({
                                       'disabled': disabled
                                    });
                                    return (
                                        <div key={quarterKey}>
                                            <input
                                                checked={this.props.filters.splits.QUARTERS.includes(quarterKey)}
                                                id={'quarters_' + quarterKey} value={quarterKey} type="checkbox"
                                                name="quarters[]" onChange={(evt) => {
                                                if (!evt.target) return;

                                                if (disabled) {
                                                    evt.target.checked = false;
                                                }
                                                this.handleInputQuartersChange(evt);
                                            }}/>
                                            <label className={classNames}
                                                htmlFor={'quarters_' + quarterKey}>{splits.QUARTERS[quarterKey]}</label>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <button onClick={() => {
                            // close
                        }} className="ok-button">OK
                        </button>
                    </div>
                </div>
                {(this.props.filters.splits.WEEKS.length !== 0 || !this.props.filters.splits.QUARTERS.includes('ALL'))
                && <span className="leftfilter">Clear splits
                    <a onClick={() => {
                        this.handleWeeksChange([]);
                        this.handleQuartersChange(['ALL']);
                    }}><span className="sr-only">Remove Filter</span></a>
                </span>
                }
            </div>
        );
    }
}

Splits.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
};

export default Splits;