import React,{Component} from 'react';
import { routeCodes } from '../../constants/routes';
import {Redirect} from 'react-router-dom';
import  {SERVER_BASE_URL} from '../../constants/consts';

class EmailVerify extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            status:false
        }
    }

    componentDidMount(){
        const { refId } = this.props.match.params;
        let that = this;
        
        fetch(`${SERVER_BASE_URL}promoter_email_verify/${refId}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +response.status);                  
                this.props.history.push(routeCodes.LOGIN)
            }
        
            // Examine the text in the response
            response.json().then(function(data) {
                this.props.history.push(routeCodes.REGISTER)
            });
        })
    }

    componentDidUpdate(){
        if(this.state.status){
            <Redirect to={routeCodes.LOGIN} />
        }else{
            <Redirect to={routeCodes.REGISTER} />
        }
    }

    render(){
        return(
            <div>
                Hello World
            </div>
        );
    }
}

export default EmailVerify;