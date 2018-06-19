import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { imgRoutes } from '../../../constants/img_path';
import { getCheckoutList, removeCartItems } from '../../../actions/Checkout';
import { resetVal } from '../../../actions/everyDay';
import trashImg from 'img/site/trash-icon.png';
import nodataImg from 'img/site/nodata.png';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAfterDel: false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ listAfterDel: true })
        dispatch(getCheckoutList());
    }

    removeCart = (item_id) => {
        const { dispatch } = this.props;
        dispatch(removeCartItems(item_id));
        this.setState({ listAfterDel : true }); // dm
    }

    componentDidUpdate() {
        const { dispatch, removeItems } = this.props;
        const { listAfterDel } = this.state;
        if (removeItems.status === 1 && listAfterDel === true) {
            this.setState({ listAfterDel: false });
            dispatch(getCheckoutList());
            dispatch(resetVal({'removeCart': false})); // dm
        }
        // dispatch(resetVal({ 'userAdded': false }));
    }

    renderTr = (obj) => {
        return (
            <tr key={Math.random()} className="order_cart">
                <td><img src={`${imgRoutes.CAMPAIGN_POST_IMG_PATH}${obj.applied_post.image}`} alt="" style={{"width":"60px"}} /></td>
                <td>
                    {/* <h3>I love the way this Jacket <br />Looks @Streetwear ...</h3> */}
                    <h3>{(obj.applied_post.desription).substring(0,40) + '...'}</h3>
                    {/* <h4>John Doe</h4> */}
                    <h4>{obj.user.name}</h4>
                    {/* <h4>Facebook</h4> */}
                    <h4>{obj.campaign.social_media_platform.charAt(0).toUpperCase() + obj.campaign.social_media_platform.slice(1)}</h4>
                </td>
                <td>${(obj.campaign.price).toFixed(2)}</td>
                <td> <a href="javascript:void(0)" onClick={() => this.removeCart(obj._id)}><img src={trashImg} alt="Delete" style={{"width": "15px","margin-top": "-5px"}}/></a> </td>
            </tr>
        );
    }

    render() {
        const { carts } = this.props;
        return (
            <div className="checkout-r">
                <div className="cart-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="4">Your order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(carts.status === 1) ? carts.data.map((obj, index) => (this.renderTr(obj))) : <tr><td colSpan="6"></td></tr>}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6">
                                    <div className="subtotal">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <th>$ {(carts.subtotal).toFixed(2)}</th>
                                                </tr>
                                                <tr>
                                                    <th>GST</th>
                                                    <th>$ {(carts.gst).toFixed(2)}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>$ {(carts.total).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { checkout } = state;

    return {
        loading: checkout.get('loading'),
        error: checkout.get('error'),
        carts: checkout.get('carts'),
        removeItems: checkout.get('removeItems')
    }
}

export default connect(mapStateToProps)(OrderDetails)
