import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ClassNames from 'classnames';
import axios from 'axios';

import Filters from "./Filters/Filters";
import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader/TableHeader";

import './IP.css';

class IP extends React.Component {

    constructor() {
        super();
        this.state = {
            tableData: {
                columns: [
                    {
                        "title": "Rank",
                        "field": "rownum"
                    },
                    {
                        "title": "Player",
                        "field": "player"
                    },
                    {
                        "title": "Position",
                        "field": "positions"
                    },
                    {
                        "title": "Team",
                        "field": "teams"
                    },
                    {
                        "title": "Age",
                        "field": "age"
                    },
                    {
                        "title": "Bye Week",
                        "field": "bye"
                    },
                    {
                        "title": "Games",
                        "field": "gamesplayed"
                    },
                    {
                        "title": "Fantasy PPG",
                        "field": "fantasyppg"
                    },
                    {
                        "title": "Fantasy PTS",
                        "field": "ffp"
                    },
                    {
                        "title": "Ceiling",
                        "field": "pceiling"
                    },
                    {
                        "title": "Floor",
                        "field": "pfloor"
                    },
                    {
                        "title": "TD's",
                        "field": "tds"
                    },
                    {
                        "title": "Scrim. Yards",
                        "field": "scrimmageyards"
                    },
                    {
                        "title": "Scrim. YPG",
                        "field": "passyardsscrimmageypg"
                    },
                    {
                        "title": "Pass Yards",
                        "field": "pyd"
                    },
                    {
                        "title": "Rush YDS/GM",
                        "field": "ruyd"
                    },
                    {
                        "title": "REC. Yards",
                        "field": "reyd"
                    },
                    {
                        "title": "Receptions",
                        "field": "receptions"
                    },
                    {
                        "title": "Actions",
                        "field": "actions"
                    },
                    {
                        "title": "20+",
                        "field": "twentyplus"
                    },
                    {
                        "title": "40+",
                        "field": "fortyplus"
                    },
                    {
                        "title": "FUM",
                        "field": "fumbles"
                    },
                    {
                        "title": "FUML",
                        "field": "fumbleslost"
                    }
                ], rows: []
            },
            filters: this._getInitialFilters(),
            parameters: this._getInitialParameters(),
            nflp: true,
            compare: [],
            savedFilters: []
        };
    }

    _getInitialParameters() {
        return {
            '_page': 0,
            order: 'DESC',
            orderBy: false,
        };
    }

    _getInitialFilters() {
        return {
            search: '',
            searchName: '',
            team: '',
            positions: [],
            season: '1_SEASON',
            splits: {
                WEEKS: [],
                QUARTERS: ['ALL'],
            },
            weather: {
                TEMPERATURES: ['ALL'],
                CONDITIONS: ['ALL']
            },
            fields: ['ALL'],
            versus: '',
            versus_val: '',
            versus_team: '',
        };
    }

    componentDidMount() {
        this._getRows();
    }

    _getRows() {
        const parameters = Object.assign({}, this.state.filters, this.state.parameters);
        parameters.positions = JSON.stringify(parameters.positions);
        parameters.splits = JSON.stringify(parameters.splits);
        parameters.weather = JSON.stringify(parameters.weather);
        parameters.fields = JSON.stringify(parameters.fields);
        if (parameters.orderBy === false) {
            delete parameters.orderBy;
            delete parameters.order;
        }
        delete parameters.searchName;
        delete parameters.versus_team;

        axios.get('/api/ip/' + ((this.state.nflp) ? 'players' : 'teams'), {
            params: parameters
        }).then((data) => {
            const pages = Math.ceil(data.data.data.count / 50);
            if (this.state.parameters._page > pages) {
                this.handleParametarsChange({
                    '_page': 0
                });
            }
            this.setState({
                tableData: data.data.data
            });
        }).catch(() => {
            this.handleClearFilters();
        });
    }

    handleFiltersChange(newFilters, reset = false) {
        if (reset) {
            newFilters = Object.assign({}, this._getInitialFilters(), newFilters);
        } else {
            //newFilters.search = '';
        }
        this.setState({
            filters: newFilters
        }, () => {
            this._getRows();
        });

    }

    handleParametarsChange(newParameter) {
        this.setState((oldState) => {
            const newParameters = Object.assign({}, oldState.parameters, newParameter);
            return {
                parameters: newParameters
            };
        }, () => {
            this._getRows();
        });
    }

    handleClearFilters(forceReload = false) {
        if (!window._.isEqual(this.state.filters, this._getInitialFilters()) || forceReload) {
            this.handleFiltersChange(this._getInitialFilters());
        }

        if (!window._.isEqual(this.state.parameters, this._getInitialParameters()) || forceReload) {
            this.handleParametarsChange(this._getInitialParameters());
        }
    }

    handleModeChange(clearFilters = true) {
        this.setState((oldState) => {
            return {
                nflp: !oldState.nflp,
            };
        }, () => {
            if (clearFilters)
                this.handleClearFilters(true);
        });
    }

    handleCompareChange(playerObject, isInCompare = false) {
        this.setState((oldState) => {
            const compare = oldState.compare.slice();
            const isChecked = compare.reduce((res, rowObject) => {
                return res || window._.isEqual(rowObject, playerObject);
            }, false);

            if (isInCompare && !isChecked) {
                compare.push(playerObject);
            } else if (!isInCompare && isChecked) {
                compare.splice(compare.indexOf(playerObject), 1);
            } else return {};

            if (compare.length === 0 && !isInCompare) {
                window.popesClose();
            }

            return {
                compare: compare
            };
        })
    }

    handleOrderChange(key) {
        this.setState((oldState) => {
            let order = oldState.parameters.order;
            let orderBy = oldState.parameters.orderBy;

            if (!key) {
                order = 'DESC';
                orderBy = false;
            } else if (orderBy === key) {
                if (order === 'DESC') {
                    order = 'ASC';
                } else {
                    order = 'DESC';
                    orderBy = false;
                }
            } else {
                order = 'DESC';
                orderBy = key;
            }

            return {
                parameters: Object.assign({}, oldState.parameters, {
                    order: order,
                    orderBy: orderBy
                })
            }
        }, () => {
            this._getRows();
        });
    }

    render() {
        const classes = ClassNames('compare-button', {
            'popes-open': (this.state.compare.length >= 2),
            'disabled': !(this.state.compare.length >= 2) && this.props.user.premium,
            'compare-button_get_premium': !this.props.user.premium
        });

        const title = ((this.props.user.premium) ?
            ((this.state.compare.length < 2) ? 'You must select at least two players for compare function to work.' : null)
            : 'Compare functionality is for premium users only.');

        return (
            <DocumentTitle title="Stats IP - StatRoute">
                <div className="mainwrap stat-ip">
                    <a className={classes} data-original-title={title} data-toggle="tooltip" data-placement="left"
                       data-popid="pop-compare">COMPARE selected</a>

                    <Filters filters={this.state.filters} nflp={this.state.nflp} premium={this.props.user.premium}
                             onModeChange={this.handleModeChange.bind(this)}
                             onFiltersChange={this.handleFiltersChange.bind(this)}/>
                    <div className="mainright">
                        <TableHeader filters={this.state.filters} nflp={this.state.nflp}
                                     premium={this.props.user.premium}
                                     onClearFilters={this.handleClearFilters.bind(this)}
                                     onModeChange={this.handleModeChange.bind(this)}
                                     onFiltersChange={this.handleFiltersChange.bind(this)}
                        />
                        <Table tableData={this.state.tableData} compare={this.state.compare}
                               filters={this.state.filters} premium={this.props.user.premium}
                               parameters={this.state.parameters}
                               onCompareChange={this.handleCompareChange.bind(this)}
                               onOrderChange={this.handleOrderChange.bind(this)}
                               onParameterChange={this.handleParametarsChange.bind(this)}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

IP.propTypes = {
    user: PropTypes.object.isRequired
};

export default IP;

