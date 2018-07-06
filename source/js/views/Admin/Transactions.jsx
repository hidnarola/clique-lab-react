import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import cx from "classnames";
import { getTransaction } from '../../actions/admin/transaction';
import ContentLoader from 'react-content-loader';
import Pagination from "react-js-pagination";
import jQuery from 'jquery';

const TableContentLoader = () => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="5" y="0" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="20" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="40" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="60" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="80" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="100" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="120" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="140" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="160" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="180" rx="3" ry="3" width="395" height="8" />
        <rect x="5" y="200" rx="3" ry="3" width="395" height="8" />
    </ContentLoader>
);
class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: 0,
            activePage: 1,
            perPageItem: 10,
            transaction_search_params: '',
        }
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        const { perPageItem, activePage } = this.state;
        dispatch(getTransaction({ "page_size": perPageItem, "page_no": activePage }));
        this.setState({ isRender: 1 });
    }

    renderTr = (obj, index) => {
        let className = '';
        if (obj.status == 'Refunded') { className = 'bg-grey'; }
        else if (obj.status == 'In Progress') { className = 'bg-purple'; }
        else if (obj.status == 'Paid') { className = 'bg-blue'; }
        return (
            <tr key={index}>
                <td>{obj._id}</td>
                <td>{moment(obj.date).format('DD MMM YYYY')}</td>
                <td>{obj.campaign_description}</td>
                <td>{obj.brand}</td>
                <td>{obj.user}</td>
                <td>{obj.promoter}</td>
                <td>${(obj.price).toFixed(2)}</td>
                <td>
                    <label className={className}>{obj.status}</label>
                </td>
            </tr>
        )
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        const { dispatch } = this.props;
        // let sortDropArr = _.find(this.state.allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        let arrayFilter = {
            //"sort": [{ "field": "name", "value": parseInt(sortDropArr['value']['value']) }],
            "page_size": this.state.perPageItem,
            "page_no": pageNumber,
            "search": this.state.transaction_search_params
        }
        if (pageNumber !== this.state.activePage) {
            dispatch(getTransaction(arrayFilter));
            this.setState({ isRender: 1 });
        }
    }
    transactionSearch = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        let search_param = jQuery('#txt_transaction_search').val();
        this.setState({ transaction_search_params: search_param });
        let arrayFilter = {
            "page_size": this.state.perPageItem,
            "page_no": 1,
            "search": search_param
        }
        dispatch(getTransaction(arrayFilter));
        this.setState({ isRender: 1 });
    }

    render() {
        const { getTransactionData } = this.props;
        return (
            <div className='dashboard-page transactions-history'>
                <div className="admin_subheading d-flex">
                    <h3>All Transactions</h3>
                    <form method="post" style={{ "top": "-12px" }} onSubmit={this.transactionSearch}>
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search Transaction"
                            id="txt_transaction_search"
                            name="transaction_search_params"
                            aria-label="Search"
                            value={this.state.transaction_search_params}
                            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            autoComplete="off"
                            style={{ "paddingRight": "20px" }}
                        />
                        <button type="submit"></button>
                    </form>
                </div>
                <div className="content-box">
                    <div className="admin_dasboard_transaction cart-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ "width": "22%" }}>Transaction Number</th>
                                    <th style={{ "width": "11%" }}>Date</th>
                                    <th style={{ "width": "19%" }}>Campaign Name</th>
                                    <th style={{ "width": "8%" }}>Brand</th>
                                    <th style={{ "width": "10%" }}>Everyday People</th>
                                    <th style={{ "width": "10%" }}>Promoter</th>
                                    <th style={{ "width": "10%" }}>Transaction</th>
                                    <th style={{ "width": "10%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (getTransactionData.loading === true) ?
                                        <tr>
                                            <td colSpan="8">
                                                <TableContentLoader />
                                            </td>
                                        </tr>
                                        :
                                        (getTransactionData.status == 1) ?
                                            getTransactionData.data.map((obj, index) => (this.renderTr(obj, index)))
                                            :
                                            <tr>
                                                <td colSpan="8" style={{ "textAlign": "center", "padding": "30px" }}>
                                                    <h4 style={{ "fontSize": "30px", "fontWeight": "600", "color": "#ddd" }}>No Data Available</h4>
                                                </td>
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    (getTransactionData.total > 10) ?
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={getTransactionData.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemsCountPerPage={this.state.perPageItem}
                        /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminTransaction } = state;
    return {
        getTransactionData: adminTransaction.get('getTransaction'),
    }
}
export default connect(mapStateToProps)(Transactions)