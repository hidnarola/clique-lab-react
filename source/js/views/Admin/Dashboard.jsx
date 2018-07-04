import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import cx from "classnames";
import { getTransaction, resetTransactionVal } from '../../actions/admin/transaction';
import ContentLoader from 'react-content-loader';

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
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: 0
        }
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch(getTransaction({ "page_size": 10, "page_no": 1 }));
        this.setState({ isRender: 1 });
    }

    componentWillUnmount = () => {
        const { dispatch } = this.props;
        dispatch(resetTransactionVal({ getTransaction: false }));
        this.setState({ isRender: 0 });
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

    render() {
        const { getTransactionData } = this.props;
        return (
            <div className='dashboard-page'>
                <div className="admin_subheading d-flex">
                    <h3>Recent Transactions</h3>
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
                                            getTransactionData.data.map((obj, index) => (this.renderTr(obj,index)))
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
export default connect(mapStateToProps)(Dashboard)