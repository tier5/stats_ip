import React from 'react';
import PropTypes from 'prop-types';

import GenerateTitleFromFilter from '../../../../utils/GenerateTitleFromFilter';
// import SavedFiltres from "./SavedFilters";
// import ScoringInputs from "./ScoringInputs";

import './TableHeader.css';

class TableHeader extends React.Component {

    render() {
        const title = GenerateTitleFromFilter(this.props.filters, this.props.nflp);

        return (
            <div className="Comp-TableHeader">
                {/*<div className="sto">
                    <div className="headselects">

                        <SavedFiltres currentFilter={this.props.filters} nflp={this.props.nflp} premium={this.props.premium} onLoadFilter={(newFilters, nflp) => {
                            if(this.props.nflp !== nflp) this.props.onModeChange(false);
                            this.props.onFiltersChange(newFilters);
                        }}/>

                        <ScoringInputs premium={this.props.premium}/>
                    </div>
                </div>*/}

                <h1 className="ip-header" title={title}>{title.toLocaleUpperCase()}</h1><a
                onClick={this.props.onClearFilters} className="clear_all">[ CLEAR ALL ]</a>
            </div>
        );
    }
}

TableHeader.propTypes = {
    filters: PropTypes.object.isRequired,
    nflp: PropTypes.bool.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    onModeChange: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default TableHeader;