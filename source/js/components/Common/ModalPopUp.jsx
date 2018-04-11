import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPopUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
    }

    componentDidMount(){
        this.props.onRef(this);
    }
    componentWillMount(){
        this.props.onRef(undefined);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    createMarkup() {
        return {__html: this.props.contentBody};
    }

    render() {
        return (
            <div id="terms-condition">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} 
                       id="terms-condition" {...this.props}>
                    <ModalBody>
                        <div dangerouslySetInnerHTML={this.createMarkup()} />
                    </ModalBody>                    
                </Modal>
            </div>
        );
    }
}

export default ModalPopUp;