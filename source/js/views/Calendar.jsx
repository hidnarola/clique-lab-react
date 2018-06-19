import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import { getCampaign } from '../actions/calendar';
import {
    Popover, PopoverHeader, PopoverBody,
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { routeCodes } from '../constants/routes';
import moment from 'moment';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: '',
            getCampaign: 0,
            modal: false,
            platform: 'all',
            calendarView: 'oneMonth',
            autoViewRender: false,
            campaignDetails: [
               
            ]
        }
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let start_date = moment().format("YYYY-MM-01");
        let end_date = moment().format("YYYY-MM-") + moment().daysInMonth();
        let arrayFilter = {
            'start_date': start_date,
            'end_date': end_date,
        };
        dispatch(getCampaign(arrayFilter));
    }

    componentDidUpdate() {
        const { campaign_data } = this.props;
        const { getCampaign } = this.state;
        let eventsArr = [];
        let eventColor = {
            'facebook': '#3b5999',
            'linkedin': '#0177b5',
            'instagram': '#7236d7',
            'pinterest': '#c8222c',
            'twitter': '#30c2fe',
        };

        // console.log('campaign_data',campaign_data);
        // console.log('getCampaign',getCampaign);
        // console.log('campaign_data.status',campaign_data.status);
        if (getCampaign === 0 && campaign_data.status === 1) {
            campaign_data.data.map((data, key) => {
                eventsArr.push({
                    id: data._id,
                    title: data.name,
                    start: data.start_date,
                    color: eventColor[data.social_media_platform]
                });
            });
            this.setState({ getCampaign: 1 });
            this.setState({ events: eventsArr });
        }

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    changePlatform = (platformId) => {
        this.setState({ platform: platformId, getCampaign: 0 });
        const { dispatch } = this.props;
        if (platformId === 'all') {
            platformId = '';
        }
        let arrayFilter = {
            'social_media_platform': platformId,
            'start_date': "2017-03-10",
            'end_date': "2018-10-09",
        };
        dispatch(getCampaign(arrayFilter));
    }

    handleCalendarView = (calendarView) => {
        const { dispatch } = this.props;
        this.setState({ calendarView: calendarView.value });
        let start_date = moment().format("YYYY-MM-01");
        let end_date = moment().format("YYYY-MM-") + moment().daysInMonth();
        if (calendarView.value == 'quarter') {
            end_date = moment(start_date).add(3, 'months').endOf('month').format('YYYY-MM-DD');
        } else if (calendarView.value == 'year') {
            end_date = moment(start_date).add(11, 'months').endOf('month').format('YYYY-MM-DD');
        }
        let arrayFilter = {
            'start_date': start_date,
            'end_date': end_date,
        };
        dispatch(getCampaign(arrayFilter));
    }

    viewRenderFunc = (start_date, end_date) => {
        const { dispatch } = this.props;
        let arrayFilter = {
            'start_date': start_date,
            'end_date': end_date,
        };
        dispatch(getCampaign(arrayFilter));
    }

    render() {
        const { events, platform, calendarView, autoViewRender } = this.state;
        const { loading, className } = this.props;
        if (loading) { return (<div className="loader"></div>) }
        return (
            <div id="calendar-component">
                <div className="profile-head d-flex campaigns-links" style={{ "margin": "0px", "borderBottom": "none" }}>
                    <ul>
                        <li><a className={`cursor_pointer ${platform === 'all' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('all')}>All Platforms</a></li>
                        <li><a className={`cursor_pointer ${platform === 'facebook' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('facebook')}><img src={fbImg} /> Facebook</a></li>
                        <li><a className={`cursor_pointer ${platform === 'linkedin' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('linkedin')}><img src={linkedImg} /> Linkedin</a></li>
                        <li><a className={`cursor_pointer ${platform === 'instagram' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('instagram')}><img src={instaImg} /> Instagram</a></li>
                        <li><a className={`cursor_pointer ${platform === 'pinterest' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('pinterest')}><img src={pinImg} /> Pinterest</a></li>
                        <li><a className={`cursor_pointer ${platform === 'twitter' && 'active'}`} aria-current="false" href="javascript:void(0)" onClick={() => this.changePlatform('twitter')}><img src={twitterImg} /> Twitter</a></li>
                    </ul>
                    <div className="new-permission group-head-r sort-date-btn">
                        <ul>
                            <li>
                                <ReactSelect
                                    name="txt_calendar_view"
                                    value={calendarView}
                                    onChange={this.handleCalendarView}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    placeholder="View by by Month"
                                    className="dropdown-inr"
                                    options={[
                                        { value: 'oneMonth', label: 'View by by Month' },
                                        { value: 'quarter', label: 'View by by Quarter' },
                                        { value: 'year', label: 'View by by Year' },
                                    ]}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                
                <FullCalendar
                    id="custom_calendar"
                    header={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }}
                    // header = {{
                    //     left: 'prev,next today myCustomButton',
                    //     center: 'title',
                    //     right: 'month,basicWeek,basicDay'
                    // }}
                    defaultDate={Date.now()}
                    navLinks={true}
                    editable={false}
                    eventLimit={false}
                    events={this.state.events}
                    defaultView={this.state.calendarView}
                    views={{
                        oneMonth: {
                            type: 'basic',
                            duration: { months: 1 }
                        },
                        quarter: {
                            type: 'basic',
                            duration: { months: 4 }
                        },
                        year: {
                            type: 'basic',
                            duration: { months: 12 }
                        }
                    }}
                    viewRender={
                        // (view, element) => {
                        //     this.viewRenderFunc(view.intervalStart.format(), view.intervalEnd.format());
                        // }
                        function (view, element) {
                            console.log(element);
                            console.log('classname', element[0].className);
                            console.log(view);
                            //this.viewRenderFunc(view.intervalStart.format(), view.intervalEnd.format());
                            console.log("The view's title is " + view.intervalStart.format());
                            // console.log("The view's title is " + view.intervalEnd.format());
                        }
                    }
                    // selectable={true}
                    // selectHelper={true}
                    // eventRender={
                    //     function (event, element) {
                    //         element.popover({
                    //             animation: true,
                    //             delay: 300,
                    //             content: '<b>Inicio</b>:' + event.start + "<b>Fin</b>:" + event.end,
                    //             trigger: 'hover'
                    //         });
                    //     }
                    // }
                // eventRender= {
                //     function(event, element){
                //         element.qtip({
                //             // animation:true,
                //             // delay: 300,
                //             content: 'Campaign Name',
                //             // trigger: 'hover'
                //         });
                //     }
                // }
                //defaultView= "week"
                eventClick={
                    (calEvent, jsEvent, view) => {
                            console.log(calEvent);
                            // <Popover
                            //     id={calEvent.id}
                            //     placement="right"
                            //     positionLeft={200}
                            //     positionTop={50}
                            //     title="Popover right"
                            // >
                            //     And here's some <strong>amazing</strong> content. It's very engaging. right?
                            // </Popover>
                            this.setState({modal: true})
                    }
                }
                />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="eventPopover_modal">
                    {/* <div class="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.toggle()} />
                    </div> */}
                    <ModalBody>
                        <div className="contents">
                            <h2>Campaign name would be displayed here</h2>
                            <p>
                                <label className="platform">Facebook</label>
                                <label className="days">7 days</label>
                            </p>
                            <p>
                                <a className="cursor_pointer btn_add_user" onClick={() => this.props.history.push(routeCodes.EVERYDAYPEOPLE)}>Add user to campaign</a>
                            </p>
                        </div>
                    </ModalBody>
                </Modal>
                {/* {
                    (events.length > 0) &&
                    this.state.events.map((data, i) => {
                        return <PopoverItem key={i} item={data} id={i} />;
                    })
                } */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { calendar } = state;
    return {
        loading: calendar.get('loading'),
        campaign_data: calendar.get('campaign'),
    }
}

export default withRouter(connect(mapStateToProps)(Calendar));
