import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import ClassNames from 'classnames';

import GenerateTitleFromFilter from '../../../../utils/GenerateTitleFromFilter';
import PresetPopup from "../../Popups/PresetPopup";

class SavedFiltres extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            savedFilters: Cookies.getJSON('st_ip_saved') || {},
            name: this._truncateText(GenerateTitleFromFilter(this.props.currentFilter, this.props.nflp), 25),
            nameChanged: false
        }
    }

    _truncateText(text, size) {
        if (text.length > size)
            return text.substring(0, size - 3) + '...';
        else
            return text;
    }

    componentWillReceiveProps(nextProps) {
        if (window._.isEqual(nextProps.currentFilter, this.props.currentFilter)
            && window._.isEqual(nextProps.nflp, this.props.nflp)) return;

        this.setState((oldState) => {
            const generatedTitle = this._truncateText(GenerateTitleFromFilter(nextProps.currentFilter, nextProps.nflp), 25);
            console.log(generatedTitle + ' !== ' + oldState.name);
            if (oldState.nameChanged && generatedTitle !== oldState.name) {
                return {};
            }
            return {
                name: generatedTitle
            };
        });
    }

    handleAddFilter(filters) {
        window.popesClose();
        this.setState((oldState) => {
            const newSavedFilters = Object.assign({}, oldState.savedFilters);
            const name = (oldState.name.trim()) ? oldState.name : this._truncateText(GenerateTitleFromFilter(this.props.currentFilter, this.props.nflp), 25);
            newSavedFilters[name] = filters;
            Cookies.set('st_ip_saved', newSavedFilters);
            return {
                savedFilters: newSavedFilters,
                name: name,
                nameChanged: false
            }
        });
    }

    handleRemoveFilter(filterName) {
        this.setState((oldState) => {
            const newSavedFilters = Object.assign({}, oldState.savedFilters);
            delete newSavedFilters[filterName];
            Cookies.set('st_ip_saved', newSavedFilters);
            return {
                savedFilters: newSavedFilters
            }
        });
    }

    handleNameChange(evt) {
        if (evt.target.value.length > 25) return;
        this.setState({
            name: evt.target.value,
            nameChanged: true
        })
    }

    render() {
        const classes = ClassNames('selectwrap', 'saved', {
            'selectwrap_get_premium': !this.props.premium
        });

        return (
            <div className={classes}>
                <div className="nice-select" tabIndex="0">
                    {/*<input type="text" className="current" value={this.state.name}
                           readOnly={true}/>*/}
                    <span className="current">{this.state.name}</span>

                    <ul className="list">
                        {Object.keys(this.state.savedFilters).map((savedFilterName) => {
                            const savedFilter = this.state.savedFilters[savedFilterName];
                            const isCurrent = window._.isEqual(savedFilter, {
                                filter: this.props.currentFilter,
                                nflp: this.props.nflp
                            });
                            let classNames = 'option';
                            if (isCurrent) {
                                classNames += ' selected';
                            }

                            return (
                                <li key={savedFilterName} data-value={savedFilterName} className={classNames}
                                    onClick={() => {
                                        this.props.onLoadFilter(savedFilter.filter, savedFilter.nflp);
                                        this.setState({
                                            name: savedFilterName
                                        })
                                    }}>{savedFilterName}
                                    <span className="remove" onClick={(evt) => {
                                        evt.stopPropagation();
                                        this.handleRemoveFilter(savedFilterName);
                                    }}>&times;<span className="sr-only">Remove settings</span></span>
                                </li>
                            )
                        })}
                        {Object.keys(this.state.savedFilters).length === 0 && <li className="option">
                            No filter memorized
                        </li>}
                    </ul>
                </div>
                {this.props.premium && <a className="memorize popes-open" data-popid="pop-name-preset">memorize
                    current settings</a>}

                <PresetPopup onAddFilter={this.handleAddFilter.bind(this, {
                    filter: this.props.currentFilter,
                    nflp: this.props.nflp
                })}
                             onNameChange={this.handleNameChange.bind(this)}
                             name={this.state.name}
                             placeholder={GenerateTitleFromFilter(this.props.currentFilter).slice(0, 25)}/>
            </div>
        );
    }
}


SavedFiltres.propTypes = {
    currentFilter: PropTypes.object.isRequired,
    nflp: PropTypes.bool.isRequired,
    onLoadFilter: PropTypes.func.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default SavedFiltres;