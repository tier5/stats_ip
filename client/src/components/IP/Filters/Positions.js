import React from 'react';
import PropTypes from 'prop-types';

import positionsParameters from '../../../utils/parameters/positions';

class Positions extends React.Component {

    componentDidUpdate() {
        const filters = this.props.filters;
        window.$('#positionsForm input[type=checkbox]').each(function () {
            window.$(this).prop('checked', filters.positions.includes(window.$(this).attr('value')));
        });
    }

    handlePositionsChange(positions) {
        const newFilters = Object.assign({}, this.props.filters, {
            positions: positions
        });

        if(this.props.filters.fields.includes('REDZONE') && positions.includes('K')) {
            const fields = this.props.filters.fields.slice();
            fields.splice(fields.indexOf('REDZONE'), 1);
            if(fields.length === 0) {
                fields.push('ALL');
            }
            newFilters.fields = fields;
        }

        this.props.onFiltersChange(newFilters);
    }

    handleInputPositionChange(evt) {
        const positions = this.props.filters.positions.slice();

        if (positions.includes(evt.target.value)) {
            if (!evt.target.checked) {
                positions.splice(positions.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            positions.push(evt.target.value);
        }
        positions.sort((a, b) => {
            const keys = Object.keys((this.props.nflp) ? positionsParameters.nflp : positionsParameters.nflt);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        this.handlePositionsChange(positions);
    }

    render() {
        const positions = ((this.props.nflp) ? positionsParameters.nflp : positionsParameters.nflt);

        return (
            <div>
                <div className="navwrap">
                    <a className="navwrap_main-a">POSITIONS</a>
                    <div className="navcontent_1 positions-1">
                        <div className="col">
                            <form id="positionsForm">
                                {Object.keys(positions).map((positionKey) => {
                                    if (positionKey === 'ALL') return false;
                                    return (
                                        <div key={positionKey}>
                                            <input checked={this.props.filters.positions.includes(positionKey)}
                                                   id={positionKey} value={positionKey} type="checkbox"
                                                   name="positions[]"
                                                   onChange={this.handleInputPositionChange.bind(this)}/>
                                            <label htmlFor={positionKey}>{positions[positionKey]}</label>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <button onClick={() => {

                        }} className="ok-button">OK
                        </button>
                    </div>
                </div>
                {this.props.filters.positions.length !== 0
                && <span className="leftfilter">Clear positions
                    <a onClick={() => {
                        this.handlePositionsChange([]);
                    }}><span className="sr-only">Remove Filter</span></a>
                </span>
                }
            </div>
        );
    }
}

Positions.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    nflp: PropTypes.bool.isRequired,
};

export default Positions;