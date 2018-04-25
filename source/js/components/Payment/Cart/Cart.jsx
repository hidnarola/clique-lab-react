import React from 'react';
import {Link} from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { pageImgRoutes } from '../../../constants/img_path';
//import img1 from '../../../../assets/img/site/cart-01.jpg'

//`${pageImgRoutes.IMG_CART1}`

class Cart extends React.Component {
  render() {
    return (
      <div>
        <div className="all-people-head">
			<h3>Total 2 producs in Cart</h3>
			</div>	
			<div className="analytics-body content-box">
				<div className="cart-table">
					<table className="table">
						<thead>
							<tr>
								<th>Image Preview</th>
								<th>Text Description</th>
								<th>Person</th>
								<th>Flatform</th>
								<th>Price</th>
								<th> </th>
							</tr>	
						</thead>
						<tbody>
							<tr>
								<td><a href=""><img src={`${pageImgRoutes.IMG_CART1}`} alt=""/></a></td>
								<td><h3>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</h3></td>
								<td>John Doe</td>
								<td>Facebook</td>
								<td>$320</td>
								<td><a href=""><img src="../../assets/img/site/trash-icon.png" alt="img" /> </a></td>
							</tr>
							<tr>
								<td><a href=""><img src="../../assets/img/site/cart-02.jpg" alt=""/></a></td>
								<td><h3>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</h3></td>
								<td>Angelina Smith</td>
								<td>Facebook</td>
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
											<tfoot>
												<tr>
													<td colSpan="2"><Link to={routeCodes.CHECKOUT} className="round-btn">Checkout</Link></td>
												</tr>
											</tfoot>
										</table>
									</div>	
								</td>
							</tr>
						</tfoot>
					</table> 
				</div>
			</div>
      </div>
    )
  }
}
export default Cart;
