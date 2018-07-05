import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import cx from "classnames";
import { getMembers, removeMembers, suspendMembers, resetMembersVal } from '../../actions/admin/members';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';
import { ToastContainer, toast, Slide } from 'react-toastify';
import '../../../css/campaign/ReactToastify.css';
import ContentLoader from 'react-content-loader';
import Pagination from "react-js-pagination";
import jQuery from 'jquery';
import ReactSelect from 'react-select';

const TableContentLoader = () => (
    <ContentLoader
        height={200}
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

const PlusAction = (props) => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle className="btn_members_action">
                <label className="member_action_label">...</label>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.membersAction('email') }}> Email </DropdownItem>
                <DropdownItem onClick={() => { props.membersAction('remove') }}> Remove </DropdownItem>
                <DropdownItem onClick={() => { props.membersAction('suspend') }}> Suspend </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: 0,

            activePage: 1,
            perPageItem: 10,
            transaction_search_params: '',
            sort_wise_pagination: '',
        }
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        const { perPageItem, activePage } = this.state;
        dispatch(getMembers({ "page_size": perPageItem, "page_no": activePage }));
    }

    componentDidUpdate = () => {
        const { dispatch, removeMembersData, suspendMembersData } = this.props;
        const { isRender, perPageItem, activePage, sort_wise_pagination } = this.state;
        let selected_value;
        if (sort_wise_pagination.value === 'sort_by_name_az') { selected_value = 1; }
        else if (sort_wise_pagination.value === 'sort_by_name_za') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_most') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_least') { selected_value = 1; }
        let arrayFilter = {
            "page_size": perPageItem,
            "page_no": activePage,
            "search": this.state.transaction_search_params
        }
        if(selected_value){
            arrayFilter["sort"] = [{ "field": sort_wise_pagination.column, "value": parseInt(selected_value) }];
        }
        if(isRender==1){
            if(removeMembersData.status==1){
                dispatch(resetMembersVal({ getMembers: false, removeMembers: false, suspendMembers: false }));
                dispatch(getMembers(arrayFilter));
                toast.success(removeMembersData.message, {
					className: 'success-custom-tostify'
				});
                this.setState({ isRender: 0 });
            }

            if(suspendMembersData.status==1){
                dispatch(resetMembersVal({ getMembers: false, removeMembers: false, suspendMembers: false }));
                dispatch(getMembers(arrayFilter));
                toast.success(suspendMembersData.message, {
					className: 'success-custom-tostify'
				});
                this.setState({ isRender: 0 });
            }
        }
    }

    membersAction = (action, obj) => {
        const { dispatch } = this.props;
        if(action=='email'){
            window.open( 'mailto:'+obj.email, '_blank' );
        } else if(action=='remove'){
            dispatch(removeMembers({'memberData': obj}));
            this.setState({ isRender: 1 });
        } else if(action=='suspend'){
            dispatch(suspendMembers({'memberData': obj}));
            this.setState({ isRender: 1 });
        }
    }

    renderTr = (obj, index) => {
        let className='';
        if(obj.status===false){
            className='custom_tbl_disabled_row';
        }
        return (
            <tr className={className} key={index}>
                <td style={{ "textAlign": "center" }}>
                    {
                        (this.state.activePage == 1) ?
                            index + 1
                            :
                            (this.state.perPageItem * (this.state.activePage - 1)) + index + 1
                    }
                </td>
                <td>{obj.name}</td>
                <td>
                    {
                        (obj.type=='user') ? 'Everyday Person'
                        : (obj.type=='promoter') ? 'Brand' : ''
                    }
                </td>
                <td>{moment(obj.created_at).format('DD MMM YYYY')}</td>
                <td style={{ "textAlign": "center" }}>
                    <PlusAction 
                        membersAction={(action) => { this.membersAction(action, obj); }}
                        membersData = {obj}
                    />
                </td>
            </tr>
        )
    }
    handleSorting = (selectedOption) => {
        const { dispatch } = this.props;
        this.setState({ sort_wise_pagination: selectedOption });
        let selected_value;
        if (selectedOption.value === 'sort_by_name_az') { selected_value = 1; }
        else if (selectedOption.value === 'sort_by_name_za') { selected_value = -1; }
        else if (selectedOption.value === 'sort_by_since_most') { selected_value = -1; }
        else if (selectedOption.value === 'sort_by_since_least') { selected_value = 1; }
        let arrayFilter = {
            "sort": [{ "field": selectedOption.column, "value": parseInt(selected_value) }],
            "page_size": this.state.perPageItem,
            "page_no": 1,
            "search": this.state.transaction_search_params
        }
        dispatch(getMembers(arrayFilter));
        this.setState({ activePage: 1 });
        this.setState({ isRender: 1 });
    }

    handlePageChange = (pageNumber) => {
        const { sort_wise_pagination } = this.state;
        const { dispatch } = this.props;
        this.setState({ activePage: pageNumber });
        let selected_value;
        if (sort_wise_pagination.value === 'sort_by_name_az') { selected_value = 1; }
        else if (sort_wise_pagination.value === 'sort_by_name_za') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_most') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_least') { selected_value = 1; }
        let arrayFilter = {
            "page_size": this.state.perPageItem,
            "page_no": pageNumber,
            "search": this.state.transaction_search_params
        }
        if(selected_value){
            arrayFilter["sort"] = [{ "field": sort_wise_pagination.column, "value": parseInt(selected_value) }];
        }

        if (pageNumber !== this.state.activePage) {
            dispatch(getMembers(arrayFilter));
            this.setState({ isRender: 1 });
        }
    }
    transactionSearch = () => {
        const { sort_wise_pagination } = this.state;
        const { dispatch } = this.props;
        let search_param = jQuery('#txt_transaction_search').val();
        this.setState({ transaction_search_params: search_param });
        let selected_value;
        if (sort_wise_pagination.value === 'sort_by_name_az') { selected_value = 1; }
        else if (sort_wise_pagination.value === 'sort_by_name_za') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_most') { selected_value = -1; }
        else if (sort_wise_pagination.value === 'sort_by_since_least') { selected_value = 1; }
        let arrayFilter = {
            //"sort": [{ "field": sort_wise_pagination.column, "value": parseInt(selected_value) }],
            "page_size": this.state.perPageItem,
            "page_no": 1,
            "search": search_param
        }
        if(selected_value){
            arrayFilter["sort"] = [{ "field": sort_wise_pagination.column, "value": parseInt(selected_value) }];
        }
        dispatch(getMembers(arrayFilter));
        this.setState({ activePage: 1 });
        this.setState({ isRender: 1 });
    }

    render() {
        const { getMembersData } = this.props;
        const { sort_wise_pagination } = this.state;
        return (
            <div className='dashboard-page transactions-history'>
                <div className="admin_subheading d-flex">
                    <h3>All Members</h3>
                    <div className="group-head-r sort-date-btn">
                        <ul>
                            <li>
                                <ReactSelect
                                    name="form-field-name"
                                    value={sort_wise_pagination.value}
                                    onChange={this.handleSorting}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    placeholder="Sort"
                                    className="dropdown-inr admin_transaction_sortBy"
                                    options={[
                                        { value: 'sort_by_name_az', label: 'Name (a-z)', column: 'name' },
                                        { value: 'sort_by_name_za', label: 'Name (z-a)', column: 'name' },
                                        { value: 'sort_by_since_most', label: 'Member Since (Most Recent)', column: 'created_at' },
                                        { value: 'sort_by_since_least', label: 'Member Since (Least Recent)', column: 'created_at' },
                                    ]}
                                />
                            </li>
                        </ul>
                    </div>
                    <form style={{ "top": "-12px", "marginLeft": "inherit" }}>
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search Member"
                            id="txt_transaction_search"
                            name="transaction_search_params"
                            aria-label="Search"
                            value={this.state.transaction_search_params}
                            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            autoComplete="off"
                            style={{ "paddingRight": "20px" }}
                        />
                        <button type="button" onClick={() => this.transactionSearch()}></button>
                    </form>
                </div>
                <div className="content-box">
                    <div className="admin_dasboard_transaction cart-table" style={{ "padding": "30px 30px 30px" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ "width": "10%", "textAlign": "center" }}>Sr</th>
                                    <th style={{ "width": "30%" }}>Member Name</th>
                                    <th style={{ "width": "30%" }}>Member Type</th>
                                    <th style={{ "width": "20%" }}>Member Since</th>
                                    <th style={{ "width": "10%", "textAlign": "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (getMembersData.loading === true) ?
                                        <tr>
                                            <td colSpan="5">
                                                <TableContentLoader />
                                            </td>
                                        </tr>
                                        :
                                        (getMembersData.status == 1) ?
                                            getMembersData.data.map((obj, index) => (this.renderTr(obj, index)))
                                            :
                                            <tr>
                                                <td colSpan="5" style={{ "textAlign": "center", "padding": "30px" }}>
                                                    <h4 style={{ "fontSize": "30px", "fontWeight": "600", "color": "#ddd" }}>No Data Available</h4>
                                                </td>
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    (getMembersData.total > 10) ?
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={getMembersData.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemsCountPerPage={this.state.perPageItem}
                        /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminMembers } = state;
    return {
        getMembersData: adminMembers.get('getMembers'),
        removeMembersData: adminMembers.get('removeMembers'),
        suspendMembersData: adminMembers.get('suspendMembers'),
    }
}
export default connect(mapStateToProps)(Members)