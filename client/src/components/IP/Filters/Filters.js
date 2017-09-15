import React from 'react';
import PropTypes from 'prop-types';

import Search from "./Search";
import Teams from "./Teams";
import Positions from "./Positions";
import Seasons from "./Seasons";
import Splits from "./Splits";
import Weather from "./Weather";
import Fields from "./Fields";
import Versus from "./Versus";

import './Filters.css';

const jQuery = window.jQuery;

class Filters extends React.Component {

    constructor() {
        super();

        this.state = {
            searchResults: []
        }
    }

    componentDidMount() {
        const cont = jQuery('.leftnav');
        cont.on('click.navwrap', '.navwrap > .navwrap_main-a, .navwrap2 > .navwrap_main-a', function (evt) {
            const self = jQuery(this);
            const parent = self.parent('.navwrap, .navwrap2');
            parent.parent().siblings().find('.navwrap, .navwrap2').removeClass('navclicked');
            parent.siblings().removeClass('navclicked');
            parent.toggleClass('navclicked');
            parent.find('.navwrap, .navwrap2').removeClass('navclicked');
        });

        cont.on('click.navwrap', '.navwrap .ok-button', function (event) {
            jQuery('.navwrap, .navwrap2').removeClass('navclicked');
        });

        jQuery(document).on('click.navwrap', function (event) {
            if (jQuery(event.target).closest('.navwrap, .navwrap2').length === 0) {
                jQuery('.navwrap, .navwrap2').removeClass('navclicked');
            }
        });

        jQuery('.navcontent_1, .navcontent_2').on('scroll.filters', (evt) => evt.stopPropagation());

        /* jQuery(document).on('scroll.filters', () => {
            const scrollTop = document.body.scrollTop || document.documentElement || 0;
            jQuery('body').toggleClass('filters-fixes', scrollTop > 76);
        }); */
    }

    componentWillUnmount() {
        jQuery(document).off('click.navwrap');
        jQuery(document).off('scroll.filters');
    }

    render() {
        return (
            <div className="Comp-Filters mainleft">

                <div className="players_teams">
                    <a onClick={() => {
                        if (!this.props.nflp) this.props.onModeChange()
                    }} className={'players' + ((this.props.nflp) ? ' active' : '')}>
                        <span className="img"/>
                        <span>Players</span>
                    </a>
                    <a onClick={() => {
                        if (this.props.nflp) this.props.onModeChange()
                    }} className={'teams' + ((!this.props.nflp) ? ' active' : '')}>
                        <span className="img"/>
                        <span>Teams</span>
                    </a>
                </div>

                {false && this.props.nflp &&
                <Search filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}/>}

                <nav className="leftnav">

                    {this.props.nflp && <Teams filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}/>}

                    <Positions nflp={this.props.nflp} filters={this.props.filters}
                               onFiltersChange={this.props.onFiltersChange}/>

                    <Seasons filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}/>

                    <Splits filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}/>

                    <Weather filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}
                             premium={this.props.premium}
                    />

                    <Fields filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}/>

                    <Versus filters={this.props.filters} onFiltersChange={this.props.onFiltersChange}
                            premium={this.props.premium}
                    />
                </nav>

            </div>
        );
    }
}

Filters.propTypes = {
    filters: PropTypes.object.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    onModeChange: PropTypes.func.isRequired,
    nflp: PropTypes.bool.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default Filters;