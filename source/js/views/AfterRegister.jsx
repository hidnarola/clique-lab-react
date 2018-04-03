import React, { Component } from 'react';
import RegisterStepFirst from '../components/Common/RegisterStepFirst';
import RegisterStepSecond from '../components/Common/RegisterStepSecond';
import { connect } from 'react-redux';


class AfterRegister extends Component {
    
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page:1,
        };
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        
        return (
            <div className='afterRegister'>                                 
                {page === 1 && <RegisterStepFirst onSubmit={this.nextPage} />}
                {page === 2 && <RegisterStepSecond 
                                    previousPage={this.previousPage}
                                    onSubmit={onSubmit} />}
            </div>
        );
    }
}

export default connect(state => ({
    
}))(AfterRegister)
