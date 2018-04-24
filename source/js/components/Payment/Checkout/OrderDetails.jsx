import React from 'react';

class OrderDetails extends React.Component {
    render() {
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
                            <tr>
                                <td><a href=""><img src="../../assets/img/site/cart-01.jpg" alt="" /></a></td>
                                <td>
                                    <h3>I love the way this Jacket <br />Looks @Streetwear ...</h3>
                                    <h4>John Doe</h4>
                                    <h4>Facebook</h4>
                                </td>
                                <td>$320</td>
                                <td><a href=""><img src="../../assets/img/site/trash-icon.png" alt="" /> </a></td>
                            </tr>
                            <tr>
                                <td><a href=""><img src="../../assets/img/site/cart-02.jpg" alt="" /></a></td>
                                <td>
                                    <h3>I love the way this Jacket <br />Looks @Streetwear ...</h3>
                                    <h4>John Doe</h4>
                                    <h4>Facebook</h4>
                                </td>
                                <td>$250</td>
                                <td><a href=""><img src="../../assets/img/site/trash-icon.png" alt="" /> </a></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6">
                                    <div className="subtotal">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <th>$570</th>
                                                </tr>
                                                <tr>
                                                    <th>GST</th>
                                                    <th>$57</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>$627</td>
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
export default OrderDetails;