import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from "classnames";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
    }

    render() {
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
                                    <th style={{ "width": "8%" }}>Transaction Number</th>
                                    <th style={{ "width": "11%" }}>Date</th>
                                    <th style={{ "width": "23%" }}>Campaign Name</th>
                                    <th style={{ "width": "6%" }}>Brand</th>
                                    <th style={{ "width": "10%" }}>Everyday People</th>
                                    <th style={{ "width": "11%" }}>Promoter</th>
                                    <th style={{ "width": "10%" }}>Transaction</th>
                                    <th style={{ "width": "8%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-grey">Refunded</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-purple">In Progress</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-purple">In Progress</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-purple">In Progress</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-grey">Refunded</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-blue">Paid</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>70000052</td>
                                    <td>18 Jun 2018</td>
                                    <td>I love the way this jacket looks @sweetwear @london</td>
                                    <td>Adidas</td>
                                    <td>John Doe</td>
                                    <td>Judith Douglas</td>
                                    <td>$3420</td>
                                    <td>
                                        <label className="bg-blue">Paid</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps)(Dashboard)