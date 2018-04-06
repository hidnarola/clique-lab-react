import React, { Component } from 'react';

import FormStep1 from '../components/Campaign/FormStep1';
import FormStep2 from '../components/Campaign/FormStep2';
import FormStep3 from '../components/Campaign/FormStep3';
import FormStep4 from '../components/Campaign/FormStep4';


import { connect } from 'react-redux';


class Campaign extends Component {
    
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
            <div className='Campaign'>                                 
                {page === 1 && <FormStep1 onSubmit={this.nextPage} />}
                
                {page === 2 && <FormStep2 
                                    previousPage={this.previousPage}
                                    onSubmit={this.nextPage} />}
                                
                {page === 3 && <FormStep3
                                    previousPage={this.previousPage}
                                    onSubmit={this.nextPage} />}
                
                {page === 4 && <FormStep4
                                    previousPage={this.previousPage}
                                    onSubmit={this.nextPage} />}
            </div>
        );
    }
}

export default connect(state => ({
    
}))(Campaign)
