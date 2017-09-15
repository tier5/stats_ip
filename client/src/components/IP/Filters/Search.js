import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ClassNames from 'classnames';

import './Search.css';

const jQuery = window.jQuery;

class Search extends React.Component {

    constructor() {
        super();

        this.state = {
            searchResults: [],
            search: '',
            selected: 0
        }
    }

    componentDidMount() {
    }

    handleInputKeyDown(evt) {
        const container = jQuery(this.searchResultsContainer);
        let change = false;
        if (evt.keyCode === 40) {
            change = 1;
        } else if (evt.keyCode === 38) {
            change = -1;
        }

        if (change !== false) {
            this.setState((oldState) => {
                let newSelected = oldState.selected + change;
                let current = container.find('a:nth-child(' + (newSelected + 1) + ')');
                if (current.length === 0) {
                    newSelected = 0;
                }

                container.scrollTo(current, {
                    axis: 'y',
                    offset: {
                        top: -350 + 35
                    },
                    duration: 100,
                    interrupt: true,
                });
                return {
                    selected: newSelected
                }
            });
        } else if (evt.keyCode === 13) {
            container.find('a:nth-child(' + (this.state.selected + 1) + ')').get(0).click();
        }
    }

    handleSearchChange(result, hide = false) {
        this.setState({
            search: result.player
        });

        if (result.player.trim().length > 0 && !hide) {
            axios.get('/api/ip/players/search/' + encodeURIComponent(result.player)).then((res) => {
                if (this.state.search.trim().length !== 0) {
                    this.setState({
                        searchResults: res.data.data.rows,
                        selected: 0
                    });
                }
            });
            this.handleSearchFilterChange('', '', false);
        } else if (!hide) {
            this.handleSearchFilterChange('', '', false);
            this.setState({
                searchResults: []
            });
        } else {
            this.handleSearchFilterChange(result.player, result.playerid, true);
            this.setState({
                searchResults: []
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (window._.isEqual(nextProps.filters, this.props.filters)) return;
        if (nextProps.filters.search !== this.state.search) {
            this.setState({
                search: nextProps.filters.searchName
            });
        }
    }

    handleSearchFilterChange(newPlayerName, newPlayerID, reset) {
        const newFilters = Object.assign({}, (reset) ? {} : this.props.filters, {
            search: newPlayerID,
            searchName: newPlayerName
        });
        this.props.onFiltersChange(newFilters, reset);
    }

    render() {
        return (

            <div className="search">
                <input type="text" value={this.state.search} onChange={(evt) => {
                    this.handleSearchChange({ player: evt.target.value});
                }} onKeyDown={this.handleInputKeyDown.bind(this)} placeholder="Search Player"/>
                {this.state.search.length > 0 && <span className="remove" onClick={(evt) => {
                    evt.stopPropagation();
                    this.handleSearchChange({player: ''}, false);
                }}>&times;<span className="sr-only">Remove settings</span></span>}

                {this.state.searchResults.length > 0
                && <div className="naseptavac"
                        ref={(searchResultsContainer) => this.searchResultsContainer = searchResultsContainer}>
                    {this.state.searchResults.map((result, index) => {

                        const classNames = ClassNames({
                            'selected': index === this.state.selected
                        });

                        return <a key={index} className={classNames} onClick={(evt) => {
                            this.handleSearchChange(result, true);
                            evt.preventDefault();
                        }}>{result.player}</a>;
                    })}
                </div>}

            </div>
        );
    }
}

Search.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
};

export default Search;