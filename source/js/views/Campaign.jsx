    import React, { Component } from 'react';

    import FormStep1 from '../components/Campaign/FormStep1';
    import FormStep2 from '../components/Campaign/FormStep2';
    import FormStep3 from '../components/Campaign/FormStep3';
    import FormStep4 from '../components/Campaign/FormStep4';
    import FormStep5 from '../components/Campaign/FormStep5';
    import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
    import { Link, Redirect } from 'react-router-dom';

    import ModalPopUp from '../components/Common/ModalPopUp';
    import { connect } from 'react-redux';
    import { createCampaign } from '../actions/campaign';
    import { routeCodes } from '../constants/routes';
    import { reset, initialize, untouch} from 'redux-form';
    import closeImg from 'img/site/close-2.png';

    class Campaign extends Component {

        constructor(props) {
            super(props);
            this.nextPage = this.nextPage.bind(this);
            this.previousPage = this.previousPage.bind(this);
            this.state = {
                page: 1,
                contentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                modal: false,
                submit_disabled: false,
                popUp: '',
                multipleImages: [],
            };
            this.submitForm = this.submitForm.bind(this);
            // const formField2 = [
            //     'call_to_action',
            //     'discount_code'
            // ];
        }

        toggle() {
            this.setState({
                modal: !this.state.modal
            });
        }


        nextPage() {
            this.setState({ page: this.state.page + 1 })
        }

        previousPage() {
            this.setState({ page: this.state.page - 1 });
        }

        componentWillUnmount() {
            const { dispatch } = this.props;
            this.props.dispatch(untouch('wizardCampaign','call_to_action'));
            dispatch(initialize('wizardCampaign', {}))

            // dispatch(reset('wizardCampaign'));
        }

        resetFormData() {
            const { dispatch } = this.props;
            dispatch(initialize('wizardCampaign', {}))
            // dispatch(reset('wizardCampaign'));
        }

        multipleImagesFun = (allImgs) => {
            this.setState({ multipleImages: allImgs });
        }

        submitForm(values, actionGenerator, props) {
            //console.log(this.state.multipleImages);
            //console.log(JSON.parse(values.board_images));
            //return;
            this.setState({ submit_disabled: true }, () => {
                const { dispatch } = this.props;
                let hashTagArr = [];
                let atTagArr = [];

                values.tagHash.map((obj, index) => {
                    hashTagArr.push(obj.value);
                });
                values.tagAt.map((obj, index) => {
                    atTagArr.push(obj.value);
                });
                let public_or_private = 'public';
                if (values.public_or_private === undefined) {
                    public_or_private = 'public';
                } else {
                    public_or_private = values.public_or_private.value;
                }

                const formData = new FormData();
                formData.append("name", values.campaignName);
                formData.append("start_date", values.campaignStartDate);
                formData.append("end_date", values.campaignEndDate);
                formData.append("call_to_action", values.call_to_action);
                formData.append("discount_code", values.discount_code);
                formData.append("description", values.short_desc);
                formData.append("social_media_platform", values.industryName.value);
                formData.append("hash_tag", JSON.stringify(hashTagArr));
                formData.append("at_tag", JSON.stringify(atTagArr));
                formData.append("privacy", public_or_private);
                formData.append("media_format", values.media_format.value);
                formData.append("location", values.location);
                formData.append("price", values.how_much);
                formData.append("currency", values.currency.value);
                formData.append("cover_image", values.images[0]);
                if (this.state.multipleImages) {
                    _.forEach(this.state.multipleImages, (file) => {
                        formData.append('board_image', file);
                    });
                }
                this.setState({ popUp: public_or_private }, () => {
                    dispatch(createCampaign(formData))
                });
                this.setState({ isRedirect: true });
            });
        }


        componentDidUpdate() {
            const { campaign } = this.props;
            if (campaign && this.state.isRedirect === true) {
                if (campaign['status']) {
                    this.setState({ isRedirect: false });
                    this.resetFormData();
                    this.toggle();
                }
            }
        }

        closeModal() {
            this.props.history.push('/every-day-people');
        }

        changePage = (pageNo) => {
            this.setState({ page: pageNo });
        }

        render() {
            const { onSubmit, loading } = this.props;
            const { page } = this.state;
            if (loading) { return (<div className="loader"></div>) }
            return (
                <div className='Campaign'>
                    {page === 1 && <FormStep1 
                        onSubmit={this.nextPage} changePage={this.changePage} 
                        multipleImagesFun={this.multipleImagesFun}
                        prevImg={this.state.multipleImages} 
                    />}
                    {page === 2 && <FormStep2
                        changePage={(i) => this.changePage(i)}
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage} 
                        multipleImagesFun={this.multipleImagesFun}
                        prevImg={this.state.multipleImages} 
                        />}

                    {page === 3 && <FormStep3
                        changePage={(i) => this.changePage(i)}
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                        multipleImagesFun={this.multipleImagesFun}
                        prevImg={this.state.multipleImages} 
                        />}

                    {page === 4 && <FormStep4
                        changePage={(i) => this.changePage(i)}
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage} 
                        multipleImagesFun={this.multipleImagesFun}
                        prevImg={this.state.multipleImages}  
                        />}

                    {page === 5 && <FormStep5
                        changePage={(i) => this.changePage(i)}
                        previousPage={this.previousPage}
                        submitDisabled={this.state.submit_disabled}
                        multipleImagesFun={this.multipleImagesFun}
                        prevImg={this.state.multipleImages}
                        onSubmit={this.submitForm} />}
                        
                    <ModalPopUp
                        onRef={ref => (this.childCampaign = ref)}
                        contentBody={this.state.contentBody}
                        onClosed={() => {
                            console.log('Closed');
                            this.toggle
                        }
                        }
                    />

                    <div>
                        {(this.props.loading === true) ? <div className="loader" style={{ "zIndex": "999999999" }}></div> :
                            <Modal isOpen={this.state.modal} toggle={false} className={this.props.className} id="congratulations" className={this.props.className}>
                                <ModalBody style={{ "padding": "40px 80px 40px" }}>
                                    {(this.state.popUp === 'invite') ?
                                        <div className="terms-conditions">
                                            <h2>Congratulations, your Campaign has been started!</h2>
                                            <p>Lets go ahead and add some Everyday People to your Campaign.Click the button below to add people to your Campaign.You can add people at any time using the 'Everyday People' Navigation</p>
                                            <Link className="round-btn" to={routeCodes.EVERYDAYPEOPLE} >Select People</Link>
                                        </div>
                                        :
                                        <div className="terms-conditions">
                                            <h2>Congratulation, your campaign has been started!</h2>
                                            <p>You can review all your campaigns on the Campaigns page.</p>
                                            <Link className="round-btn" to={routeCodes.CAMPAIGN_ACTIVE} >Campaigns</Link>
                                        </div>
                                    }
                                </ModalBody>
                            </Modal>
                        }
                    </div>
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        const { campaign } = state;
        return {
            loading: campaign.get('loading'),
            error: campaign.get('error'),
            campaign: campaign.get('campaign')
        }
    }

    export default connect(mapStateToProps)(Campaign)
