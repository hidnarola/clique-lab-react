import React, { Component } from 'react';
import RegisterStepFirst from '../components/Common/RegisterStepFirst';
import RegisterStepSecond from '../components/Common/RegisterStepSecond';
import { connect } from 'react-redux';
import {afterRegisterSend,industryFetch} from '../actions/afterRegister';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Redirect} from 'react-router-dom';
import { routeCodes } from '../constants/routes';

class AfterRegister extends Component {
    
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page:1,
            lastVisitedPage:1,
        };
        this.submitForm = this.submitForm.bind(this);

    }

    changePage = (pageNo) => {
        this.setState({page:pageNo});
    }
    
    nextPage() {
        if(this.state.lastVisitedPage<(this.state.page + 1)){
            this.setState({lastVisitedPage: this.state.page + 1});
        }
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(industryFetch());
    }

    submitForm(values){
        const { dispatch } = this.props;

        const formData = new FormData();
        formData.append("industry_category", values.industryName.value);
        formData.append("industry_description", values.description);        
        formData.append('avatar', values.images[0]);                         
        dispatch(afterRegisterSend(formData));
        // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        this.props.history.push("/dashboard");
        // <Redirect to={routeCodes.DASHBOARD} />
    }

    render() {
        const { onSubmit } = this.props;
        const { page, lastVisitedPage } = this.state;
        
        return (
            <div className='afterRegister'>                
                {page === 1 && <RegisterStepFirst onSubmit={this.nextPage} changePage={this.changePage} lastVisitedPage={lastVisitedPage} />}
                {page === 2 && <RegisterStepSecond
                                    lastVisitedPage={lastVisitedPage} 
                                    changePage={(i) =>this.changePage(i)}
                                    previousPage={this.previousPage}
                                    onSubmit={this.submitForm} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { afterRegister } = state;
    return {
        loading: afterRegister.get('loading'),
        error: afterRegister.get('error'),
        industryList:afterRegister.get('after_register_data').industryList,
        videoUrl:afterRegister.get('after_register_data').videoUrl,
    }
}

export default connect(mapStateToProps)(AfterRegister)
