import React,{Component} from 'react';
import { routeCodes } from '../../constants/routes';
import {Redirect} from 'react-router-dom';
import  {SERVER_BASE_URL} from '../../constants/consts';
import { withRouter } from 'react-router'

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
                this.props.history.push(routeCodes.LOGIN);
                // return <Redirect to={routeCodes.LOGIN} />;
            }
        
            // Examine the text in the response
            response.json().then(function(data) {
                this.props.history.push(routeCodes.LOGIN);
                // return <Redirect to={routeCodes.LOGIN} />;
            });
        })
    }

    componentDidUpdate(){
        
    }

    render(){
        if(this.state.status){
            // <Redirect to={routeCodes.LOGIN} />
            this.props.history.push(routeCodes.LOGIN)
        }else{
            // <Redirect to={routeCodes.REGISTER} />
            this.props.history.push(routeCodes.LOGIN)
        }
        return(
            <div>
                {/* Hello World */}
            </div>
        );
    }
}

export default withRouter(EmailVerify);