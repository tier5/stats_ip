import React from 'react';
import PropTypes from 'prop-types';

import fieldsParameters from '../../../utils/parameters/fields';
import IndoorFieldPopup from "../Popups/IndoorFieldPopup";

class Fields extends React.Component {

    resetWeatherFilterAndFieldsChange(fields) {
        const newFilters = Object.assign({}, this.props.filters, {
            weather: {
                CONDITIONS: ['ALL'],
                TEMPERATURES: ['ALL']
            },
            fields: fields
        });
        this.props.onFiltersChange(newFilters);
    }

    handleFieldsChange(fields) {
        const newFilters = Object.assign({}, this.props.filters, {
            fields: fields
        });

        if(fields.includes('REDZONE') && this.props.filters.positions.includes('K')) {
            const positions = this.props.filters.positions.slice();
            positions.splice(positions.indexOf('K'), 1);
            newFilters.positions = positions;
        }

        this.props.onFiltersChange(newFilters);
    }

    handleInputFieldsChange(evt) {
        const fields = this.props.filters.fields.slice();

        if (fields.length >= 0 && fields.includes('ALL')) {
            fields.splice(fields.indexOf('ALL'), 1);
        }

        if (fields.includes(evt.target.value)) {
            if (!evt.target.checked) {
                fields.splice(fields.indexOf(evt.target.value), 1);
            }
        } else if (evt.target.checked) {
            if (evt.target.value === 'ALL') {
                fields.splice(0, fields.length);
            }
            // check if indoor is being selected and weather filter is present
            if(evt.target.value === 'INDOOR'
                && ((this.props.filters.weather.TEMPERATURES.length > 1 || this.props.filters.weather.TEMPERATURES[0] !== 'ALL')
                    || (this.props.filters.weather.CONDITIONS.length > 1 || this.props.filters.weather.CONDITIONS[0] !== 'ALL'))) {
                window.popesOpen('pop_error');
            } else {
                fields.push(evt.target.value);
            }
        }
        fields.sort((a, b) => {
            const keys = Object.keys(fieldsParameters);
            return keys.indexOf(a) - keys.indexOf(b);
        });

        if (fields.length === 0) {
            fields.push('ALL');
        }

        this.handleFieldsChange(fields);
    }

    render() {
        const splitAfter = 4;

        return (
            <div>
                <div className="navwrap">
                    <a className="navwrap_main-a">FIELD</a>
                    <div className="navcontent_1 seasons-1 halfline">
                        <div className="col">
                            {Object.keys(fieldsParameters).map((fieldKey, index) => {
                                //if (fieldKey === 'ALL') return false;
                                if (index > splitAfter) return false;
                                return (
                                    <div key={fieldKey}>
                                        <input checked={this.props.filters.fields.includes(fieldKey)}
                                               id={'fields_' + fieldKey} value={fieldKey} type="checkbox"
                                               name="fields[]" onChange={this.handleInputFieldsChange.bind(this)}/>
                                        <label htmlFor={'fields_' + fieldKey}>{fieldsParameters[fieldKey]}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col">
                            {Object.keys(fieldsParameters).map((fieldKey, index) => {
                                //if (fieldKey === 'ALL') return false;
                                if (index <= splitAfter) return false;
                                return (
                                    <div key={fieldKey}>
                                        <input checked={this.props.filters.fields.includes(fieldKey)}
                                               id={'fields_' + fieldKey} value={fieldKey} type="checkbox"
                                               name="fields[]" onChange={this.handleInputFieldsChange.bind(this)}/>
                                        <label htmlFor={'fields_' + fieldKey}>{fieldsParameters[fieldKey]}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="ok-button">OK
                        </button>
                    </div>
                </div>
                {!this.props.filters.fields.includes('ALL')
                && <span className="leftfilter">Clear field
                    <a onClick={() => {
                        this.handleFieldsChange(['ALL']);
                    }}><span className="sr-only">Remove Filter</span></a>
                </span>
                }

                <IndoorFieldPopup onFieldChange={() => {
                    const fields = this.props.filters.fields.slice();
                    if (fields.length >= 0 && fields.includes('ALL')) {
                        fields.splice(fields.indexOf('ALL'), 1);
                    }
                    fields.push('INDOOR');
                    fields.sort((a, b) => {
                        const keys = Object.keys(fieldsParameters);
                        return keys.indexOf(a) - keys.indexOf(b);
                    });
                    this.resetWeatherFilterAndFieldsChange(fields);
                }}/>
            </div>
        );
    }
}

Fields.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired
};

export default Fields;