import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import { getCampaign } from '../actions/calendar';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import _ from 'lodash';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';

class PopoverItem extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <span>
                <Button className="mr-1" color="secondary" id={this.props.item.id} onClick={this.toggle}>
            {this.props.item.text}
          </Button>
                <Popover placement="top" isOpen={this.state.popoverOpen} target={this.props.item.id} toggle={this.toggle}>
                    {/* <PopoverHeader>Popover Title</PopoverHeader> */}
                    <PopoverBody>
                        {this.props.item.title}

                    </PopoverBody>
                </Popover>
            </span>
        );
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: '',
            getCampaign: 0,
            popoverOpen: false
            // events:[
            //     {
            //         title: 'All Day Event',
            //         start: '2018-04-01',
            //     },
            //     {
            //         title: 'Long Event',
            //         start: '2017-05-07',
            //         end: '2017-05-10'
            //     },
            //     {
            //         id: 999,
            //         title: 'Repeating Event',
            //         start: '2017-05-09T16:00:00'
            //     },
            //     {
            //         id: 999,
            //         title: 'Repeating Event',
            //         start: '2017-05-16T16:00:00'
            //     },
            //     {
            //         title: 'Conference',
            //         start: '2017-05-11',
            //         end: '2017-05-13'
            //     },
            //     {
            //         title: 'Meeting',
            //         start: '2017-05-12T10:30:00',
            //         end: '2017-05-12T12:30:00'
            //     },
            //     {
            //         title: 'Birthday Party',
            //         start: '2017-05-13T07:00:00'
            //     },
            //     {
            //         title: 'Click for Google',
            //         url: 'http://google.com/',
            //         start: '2017-05-28'
            //     }
            // ],
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let arrayFilter = {
            'start_date': "2017-03-10",
            'end_date': "2018-10-09",
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

        if (getCampaign === 0 && campaign_data.status === 1) {
            campaign_data.data.map((data, key) => {
                eventsArr.push({
                    id: 'Popover-' + data._id,
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
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        const { events } = this.state;
        return (
            <div id="calendar-component">
                <div class="profile-head d-flex campaigns-links" style={{"margin":"0px","border-bottom":"none"}}>
                    <ul>
                        <li><a class="cursor_pointer active" aria-current="false" href="javascript:void(0)">All Platforms</a></li>
                        <li><a class="cursor_pointer" aria-current="false" href="javascript:void(0)"><img src={fbImg} /> Facebook</a></li>
                        <li><a class="cursor_pointer" aria-current="false" href="javascript:void(0)"><img src={linkedImg} /> Linkedin</a></li>
                        <li><a class="cursor_pointer" aria-current="false" href="javascript:void(0)"><img src={instaImg} /> Instagram</a></li>
                        <li><a class="cursor_pointer" aria-current="false" href="javascript:void(0)"><img src={pinImg} /> Pinterest</a></li>
                        <li><a class="cursor_pointer" aria-current="false" href="javascript:void(0)"><img src={twitterImg} /> Twitter</a></li>
                    </ul>
                    {/* <div class="new-permission"><a class="cursor_pointer" href="/campaign">Create New Campaign</a></div> */}
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
                    navLinks={true} // can click day/week names to navigate views
                    editable={false}
                    eventLimit={false} // allow "more" link when too many events
                    events={this.state.events}
                    // eventClick={(calEvent, jsEvent, view) =>
                    //     this.toggle
                    // }
                />
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
