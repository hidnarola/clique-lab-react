import React,{Component} from 'react';

class EmailVerify extends Component{
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { refId } = this.props.match.params;
        
        fetch(`http://192.168.1.186:3200/promoter_email_verify/${refId}`)
        .then((data) => {
            console.log(data);
        })

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