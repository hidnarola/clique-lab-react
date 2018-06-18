import React, { Component } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import img1 from 'img/big-img01.jpg';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import imgPlus from 'img/site/plus-01.png';
import closeImg2 from 'img/site/close-2.png';
import Pagination from "react-js-pagination";
import { puchasedPostSend } from '../../actions/purchasedPosts';
import { downloadCampaignImg,resetDownload} from '../../actions/campaign';
import { isImageExists } from '../../constants/helper';
import { imgRoutes } from '../../constants/img_path';
import { sendReq, moreFilterReq, fetchDropDownReq, resetVal, addUserReq, bulkUserReq } from '../../actions/everyDay';
import { getGroups, addGroups, resetGroupVal } from '../../actions/groups';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {
    renderFieldCampaign, renderFieldDatePicker, SelectField_ReactSelect, SelectField_ReactSelectMulti
} from '../../components/Forms/RenderFormComponent/EveryComponent';
import ReactSelect from 'react-select';

class AddToModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedOption: '',
            saveFor: '',
            userId: '',
            filter: ''
        };
        this.toggle = this.toggle.bind(this);
        this.setSaveFor = this.setSaveFor.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillMount() {
        this.props.onRef(undefined);
    }

    setDefaultVal = () => {
        this.setState({ selectedOption: '' });
    }

    setSaveFor = (val, userId, filter = null) => {
        this.setState({ saveFor: val, userId: userId, filter: filter });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

        if (selectedOption === null) {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid red !important");
            jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        } else {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid rgb(220, 223, 229) !important");
            jQuery('.add_grp_popup_select_errorMsg').html('');
        }
    }

    saveResult = () => {
        let { selectedOption, saveFor, userId, filter } = this.state;

        // if (selectedOption === '') {
        //     alert('Select the option');
        // } else {
        //     this.props.saveResult(saveFor, selectedOption, userId, filter);
        // }

        if (selectedOption === '' || selectedOption === null) {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid red !important");
            jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        } else {
            this.props.saveResult(saveFor, selectedOption, userId, filter);
        }

    }

    render() {
        let dropArr = [];
        const { selectedOption } = this.state;

        if (this.props.dropdownList !== null) {
            let resultStatus = this.props.dropdownList.status;
            if (resultStatus === 1) {
                this.props.dropdownList.results.map((obj) => {
                    dropArr.push({ value: obj._id, label: obj.name });
                });
            }
        }

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClosed={this.props.resetDropVal} id="congratulations">
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Which Campaign/Group would you like to Offer the Selected People ? </h2>
                            <p>Please Select the Campaign/Group from the Dropdownlist,<br /> then click Accept and Continue.</p>
                            <div className="select-wrap">
                                <ReactSelect
                                    className='add_grp_popup_select campaign_form_step2_dropdown'
                                    name="form-field-name"
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={dropArr}
                                    placeholder="Please select from the dropdown"
                                />
                                <label className="add_grp_popup_select_errorMsg" style={{ "color": "red", "marginTop": "5px", "textAlign": "left" }}></label>
                            </div>
                            <a href="javascript:void(0)" className="round-btn" onClick={this.saveResult}>Accept & Continue</a>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const PlusAction = (props) => {
    return (
        <UncontrolledDropdown className="festival-ftr-r dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={imgPlus} alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void(0)" onClick={() => { props.downloadPost(); }} >Download</a>
                <a className="dropdown-item" href="javascript:void(0)" onClick={() => { props.addGroup(); }} >Add user to Group</a>
                <a className="dropdown-item" href="javascript:void(0)" onClick={() => { props.addCampaign(); }} >Add user to Campaign</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class PurchasedPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            modal: false,
            is_inserted: 0,
            groupId: '',

            messagePopup: false,
            messagePopupSuccessMsg: null,
            messagePopupErrorMsg: null,
            load:false,
            isdownload:false,
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        const { dispatch } = this.props;
        if (pageNumber !== this.state.activePage) {
            dispatch(puchasedPostSend({ "page_size": 8, "page_no": pageNumber }));
        }
    }

    messagePopupToggle = () => { this.setState({ messagePopup: !this.state.messagePopup }); }

    componentWillMount() {
        const { dispatch, match } = this.props;
        this.setState({ groupId: '' });
        if (match.params.grpId) {
            this.setState({ groupId: match.params.grpId });
        }
        dispatch(puchasedPostSend({ "page_size": 8, "page_no": 1 }));
    }

    downloadPost = (campaignId) => {
        const { dispatch } = this.props;
        dispatch(downloadCampaignImg(campaignId));

        this.setState({
            isdownload:true
        })
    }

    addCampaign = (obj) => {
        const { dispatch } = this.props;

        // this.setState({load:true},()=>{
        //     setTimeout(()=>{
        //         this.setState({load:false})
        //     },300);
        // })

        this.child.setSaveFor('campaign', obj.users._id);
        dispatch(fetchDropDownReq({ "sendReqFor": "campaign", "uId": obj.users._id }));

        setTimeout(() => {
            if (this.props.dropdownList === null && this.props.loading === false) {
                //alert('You don’t have a campaign yet.')
                this.setState({
                    messagePopupSuccessMsg: null,
                    messagePopupErrorMsg: 'You don’t have a campaign yet.'
                });
                this.messagePopupToggle();
            }
        }, 2000) //2000

        this.setState({
            finalMsg : 'User has been added in '
        })
    }

    addGroup = (obj) => {
        const { dispatch } = this.props;

        
        // this.setState({load:true},()=>{
        //     setTimeout(()=>{
        //         this.setState({load:false})
        //     },300);
        // })

        this.child.setSaveFor('group', obj.users._id);
        dispatch(fetchDropDownReq({ "sendReqFor": "group", "uId": obj.users._id }));

        setTimeout(() => {
            if (this.props.dropdownList === null && this.props.loading === false) {
                //alert('You don’t have a campaign yet.')
                this.setState({
                    messagePopupSuccessMsg: null,
                    messagePopupErrorMsg: 'You don’t have a group yet.'
                });
                this.messagePopupToggle();
            }
        }, 2000)// 2000
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidUpdate() {
        let { showDrop, userAdded, dispatch, inserted_group, group_status,userAddedMsg,filename} = this.props;
        let { is_inserted,isdownload } = this.state;
        if (showDrop) {
            this.child.toggle();
        }

        if (inserted_group != null && is_inserted == 1) {
            this.setState({ is_inserted: 0 });
            this.setState({ modal: false });

            let param1 = 'add_to_group';
            let param2 = { value: inserted_group._id, label: inserted_group.name };
            let param3 = null;
            let param4 = this.state.appliedFilter[0];
            let param5 = this.state.groupId;
            this.saveResult(param1, param2, param3, param4, param5);
        }

        if (userAdded) {
            //alert('User Has been Added');
            this.setState({
                // messagePopupSuccessMsg: 'User Has been Added',
                messagePopupSuccessMsg: userAddedMsg,
                messagePopupErrorMsg: null
            });
            this.messagePopupToggle();
            dispatch(resetVal({ 'userAdded': false }));
            dispatch(resetGroupVal());
        }

        if(filename && isdownload === true)
        {
            dispatch(resetDownload());
            this.setState({
                isdownload:false
            });
        }

    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetVal({ 'userListing': false }));
        dispatch(resetDownload());
    }

    resetDropVal = () => {
        const { dispatch } = this.props;
        this.child.setDefaultVal();
        dispatch(resetVal(null));
    }


    saveResult = (param1, param2, param3, param4, param5) => {
        let data = {
            param1,
            param2,
            param3,
            param4,
            param5: this.state.groupId
        }
        const { dispatch } = this.props;
        dispatch(addUserReq(data));
    }

    render() {
        let { allPosts, total, loading, filename, dropdownList } = this.props;
        if (loading) { return (<div className="loader"></div>) }
        // if (loading || this.state.load === true) { return (<div className="loader"></div>) }

        if (filename !== null) {
            let path = imgRoutes.CAMPAIGN_IMG_ZIP_PATH + filename;
            window.open(path);
        }
        let mediaImg = {
            'facebook': fbImg,
            'linkedin': linkedImg,
            'instagram': instaImg,
            'pinterest': pinImg,
            'twitter': twitterImg,
        };
        return (
            <div className="every-people">
                <div className="all-people">
                    <ul className="fan-festival d-flex">
                        {
                            (allPosts) ?
                                allPosts.map((obj) => {
                                    let imgUrl = imgRoutes.CAMPAIGN_POST_IMG_PATH + obj.applied_campaign.image;
                                    return (<li key={Math.random()}>
                                        <div className="fan-festival-box">
                                            <div className="festival-head d-flex">
                                                <div className="festival-head-l">
                                                    <span style={{ "background": "url('" + imgRoutes.USER_IMG_PATH + obj.users.image + "') center 0 / auto 50px no-repeat", "height": "50px" }}>
                                                        {/* <img src={imgRoutes.USER_IMG_PATH + obj.users.image} /> */}
                                                    </span>
                                                    <h3>
                                                        <big>{obj.users.name}</big>
                                                        <small>{obj.location !== undefined && obj.location}</small>
                                                    </h3>
                                                </div>
                                                <div className="festival-head-r">
                                                    <h3>$ {(obj.price).toFixed(2)}</h3>
                                                </div>
                                            </div>
                                            <div className="festival-img" style={{ "background": "url('" + imgUrl + "') no-repeat 100%", "backgroundSize": "100%", "height": "215px", "width": "100%" }}></div>
                                            <div className="festival-body" style={{ "min-height": "50px" }}>
                                                <h2>{obj.applied_campaign.desription}</h2>
                                            </div>
                                            <div className="festival-ftr d-flex">
                                                <div className="festival-ftr-l">
                                                    <a href="javascript:void(0)" style={{ cursor: "default" }}>
                                                        <i><img src={mediaImg[obj.social_media_platform]} alt="" /></i>
                                                        {/* <strong>0</strong> */}
                                                        <strong>
                                                        {
                                                            obj.social_media_platform === 'facebook' ? obj.users.facebook.no_of_friends :
                                                            obj.social_media_platform === 'linkedin' ? obj.users.linkedin.no_of_friends :
                                                            obj.social_media_platform === 'instagram' ? obj.users.instagram.no_of_friends :
                                                            obj.social_media_platform === 'pinterest' ? obj.users.pinterest.no_of_friends :
                                                            obj.social_media_platform === 'twitter' ? obj.users.twitter.no_of_friends : ''
                                                        }
                                                        </strong>
                                                    </a>
                                                </div>
                                                <div className="festival-ftr-r dropdown">
                                                    <PlusAction
                                                        downloadPost={() => { this.downloadPost(obj._id) }}
                                                        addCampaign={() => { this.addCampaign(obj) }}
                                                        addGroup={() => { this.addGroup(obj) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                }) : ""
                        }
                    </ul>

                    {(total > 8) ?
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={8}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        /> : ''}
                </div>
                    
                <AddToModal onRef={ref => (this.child = ref)}
                    dropdownList={dropdownList}
                    resetDropVal={this.resetDropVal}
                    saveResult={this.saveResult} />

                {/* ---DM----- */}
                <Modal isOpen={this.state.messagePopup} toggle={this.messagePopupToggle} className={this.props.className} id="congratulations" style={{ width: "550px" }}>
                    <div className="custom_modal_btn_close" style={{ padding: "15px 20px" }}>
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.messagePopupToggle()} />
                    </div>
                    <ModalBody>
                        {
                            (this.state.messagePopupSuccessMsg) ?
                                <div className="terms-conditions">
                                    <h2>Operation successfully completed...! </h2>
                                    <p>{this.state.messagePopupSuccessMsg}</p>
                                    <a href="javascript:void(0)" className="round-btn" onClick={() => this.messagePopupToggle()}>Ok</a>
                                </div>
                                :
                                <div className="terms-conditions">
                                    <h2 style={{ color: "red" }}>Opps something went wrong...! </h2>
                                    <p>{this.state.messagePopupErrorMsg}</p>
                                    <a href="javascript:void(0)" className="round-btn" onClick={() => this.messagePopupToggle()}>Ok</a>
                                </div>
                        }
                    </ModalBody>
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { purchasedPosts, campaign, everyDay, groups } = state;
    return {
        loading: purchasedPosts.get('loading'),
        error: purchasedPosts.get('error'),
        total: purchasedPosts.get('total'),
        allPosts: purchasedPosts.get('allPosts'),

        filename: campaign.get('filename'),

        group_status: groups.get('status'),
        inserted_group: groups.get('inserted_group'),

        dropdownList: everyDay.get('dropdownList'),
        showDrop: everyDay.get('showDrop'),

        userAdded: everyDay.get('userAdded'),
        userAddedMsg: everyDay.get('userAddedMsg'),
    }
}

export default connect(mapStateToProps)(PurchasedPosts)