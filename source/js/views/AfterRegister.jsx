import React, { Component } from 'react';
import RegisterStepFirst from '../components/Common/RegisterStepFirst';
import RegisterStepSecond from '../components/Common/RegisterStepSecond';
import { connect } from 'react-redux';
import {afterRegisterSend} from '../actions/afterRegister';
import {reactLocalStorage} from 'reactjs-localstorage';

class AfterRegister extends Component {
    
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page:1,
        };
        this.submitForm = this.submitForm.bind(this);        
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    submitForm(values){
        const { dispatch } = this.props;
        
        let afterRegisterData = {
            industry_category: values.industryname,
            industry_description: values.description,
        }

        dispatch(afterRegisterSend(afterRegisterData));        
        // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        
        return (
            <div className='afterRegister'>                
                {page === 1 && <RegisterStepFirst onSubmit={this.nextPage} />}
                {page === 2 && <RegisterStepSecond 
                                    previousPage={this.previousPage}
                                    onSubmit={this.submitForm} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        user: login.get('user'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
    }
}

export default connect(mapStateToProps)(AfterRegister)
