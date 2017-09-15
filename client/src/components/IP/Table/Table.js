import React from 'react';
import PropTypes from 'prop-types';

import TableRow from "./TableRow";

import './Table.css';
import ComparePopup from "../Popups/ComparePopup";
import Pagination from "./Pagination";

const jQuery = window.$;

class Table extends React.Component {


    componentDidMount() {
        const jTable = jQuery(this.table);

        jQuery('.mainright').add(window).on('scroll.statiptable', jQuery.throttle( 100, (evt) => {
            const mainrightTable = jQuery('.mainright').get(0);
            const allScroll = window.pageYOffset || document.documentElement.scrollTop;
            const offset = Math.max(0, allScroll - 81) + mainrightTable.scrollTop - (this.table.offsetTop - parseInt(jQuery(this.table).css("margin-top"), 10));
            const isFixed = (offset > 0);

            jQuery(this.headRow).find('th').css('top', (isFixed) ? offset - 1 : 0);
            jTable.toggleClass('fixed', isFixed);
        }));
        this.computeHeader();
    }

    componentDidUpdate() {
        this.computeHeader();
        window.$('.maintable td').hover(function () {
            const self = window.$(this);
            self.parents('table').find('td:nth-child(' + (self.index() + 1) + ')').addClass('colhover');
        }, function () {
            const self = window.$(this);
            self.parents('table').find('td:nth-child(' + (self.index() + 1) + ')').removeClass('colhover');
        });
    }

    componentWillUnmount() {
        jQuery('.mainright').add(window).off('scroll.statiptable');
    }

    computeHeader() {
        const jHeadRow = jQuery(this.headRow);
        const onOrderChange = this.props.onOrderChange;

        jHeadRow.find('th').each(function () {
            const self = jQuery(this);
            const span = self.find('> div > span:not(.background)');

            self.css({
                minWidth: span.outerHeight() + 25
            });

            span.css({
                transform: 'translate3d(0, 0, 0) translate(0, -50%) rotate(315deg)',
            });
        });

        jHeadRow.off('.table-header');
        jHeadRow.on('mouseleave.table-header', function () {
            jHeadRow.find('th').removeClass('hover');
            jQuery('.maintable td').removeClass('ordered-by-hover');
        }).on("mousemove.table-header", function (event) {
            let x = event.pageX - (90 - event.offsetY) - window.pageXOffset;
            let y = event.pageY - window.pageYOffset;

            if (typeof event.originalEvent === 'undefined' || event.offsetY <= 0) {
                return;
            }

            let th = jQuery(document.elementFromPoint(x, y)).closest('th');
            if (th.length === 0) {
                th = jHeadRow.find('th').first();
            }

            const index = th.index();
            const colgroup = jQuery('.maintable td:nth-child(' + (index + 1) + ')');
            colgroup.addClass('ordered-by-hover');
            colgroup.siblings('td').removeClass('ordered-by-hover');

            th.addClass('hover');
            th.siblings('th').removeClass('hover');
        }).on('click.table-header', function (event) {
            const x = event.pageX - (90 - event.offsetY) - window.pageXOffset;
            let y = event.pageY - window.pageYOffset;
            const th = jQuery(document.elementFromPoint(x, y)).closest('th');
            const key = th.data('key');
            if (key) {
                onOrderChange(key);
            }
            event.stopPropagation();
        });

        jHeadRow.trigger('mousemove');
    }

    render() {
        return (
            <div className="Comp-Table">
                <div className="tablewrap">
                    <table className="maintable" ref={(table) => this.table = table}>
                        <colgroup/>
                        {this.props.tableData.columns.map((column) => {
                            return (
                                <colgroup key={column.field} data-key={column.field}/>
                            );
                        })}
                        <thead>
                        <tr className="tr-header" ref={(headRow) => this.headRow = headRow}>
                            <th>
                                <span className="filler"/>
                                <div><span className="background"/><span>FREEZE</span></div>
                            </th>
                            {this.props.tableData.columns.map((column, index) => {
                                let classNames = null;
                                if (column.field === this.props.parameters.orderBy) {
                                    classNames = 'active ' + this.props.parameters.order.toLocaleLowerCase();
                                }
                                return (
                                    <th key={column.field + '_' + index} data-key={column.field} className={classNames}>
                                        <div><span className="background"/><span>{column.title}</span></div>
                                    </th>
                                );
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.tableData.rows.map((row, index) => {
                            return <TableRow key={row.rownum + '_' + index} columns={this.props.tableData.columns}
                                             rowObject={row}
                                             premium={this.props.premium}
                                             compare={this.props.compare} onCompareChange={this.props.onCompareChange}
                                             filters={this.props.filters} parameters={this.props.parameters}/>
                        })}
                        </tbody>
                    </table>

                </div>
                <ComparePopup premium={this.props.premium}
                              compare={this.props.compare}
                              onCompareChange={this.props.onCompareChange}
                />
                <Pagination parameters={this.props.parameters} onParametersChange={this.props.onParameterChange}
                            count={this.props.tableData.count}/>
            </div>
        );
    }
}

Table.propTypes = {
    premium: PropTypes.bool.isRequired,
    tableData: PropTypes.object.isRequired,
    compare: PropTypes.array.isRequired,
    parameters: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    onOrderChange: PropTypes.func.isRequired,
    onCompareChange: PropTypes.func.isRequired,
    onParameterChange: PropTypes.func.isRequired,
};

export default Table;