import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom';
import { routeCodes } from 'constants/routes';


import FormStep1 from '../components/Payment/Checkout/FormStep1';
import FormStep2 from '../components/Payment/Checkout/FormStep2';
import FormStep3 from '../components/Payment/Checkout/FormStep3';

class Checkout extends Component {

constructor(props)
{
    super(props);
    this.state = {
        page : 1,
        modal: false
    }
    this.toggle = this.toggle.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.submitForm = this.submitForm.bind(this);
}

toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

submitForm(values){
    //alert('ok');
    this.setState({
        modal : true
    })
}

nextPage()
{
    this.setState({
        page : this.state.page + 1
    });
}

previousPage()
{
    this.setState({
        page : this.state.page - 1
    });
}

  render() {
    const { page } = this.state;
    return (
        
      <div>
      {/* <FormStep1 onSubmit={this.nextPage}/> */}
        {page === 1  && <FormStep1 onSubmit={this.nextPage}/>}
        {page === 2  && <FormStep2 onSubmit={this.nextPage} previousPage={this.previousPage}/>}
        {page === 3  && <FormStep3 onSubmit={this.submitForm} previousPage={this.previousPage}/>}

        <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Payment Done</ModalHeader>
          <ModalBody>
            Thank you for your payment! Your order has been successfully placed.
          </ModalBody>
          <ModalFooter>
            <div className="submit-btn d-flex">
                <Link to={routeCodes.CAMPAIGN_PURCHASED_POSTS}><button type="button" className="round-btn next-btn">Purchased Post</button></Link>
            </div>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    )
  }
}

export default Checkout;