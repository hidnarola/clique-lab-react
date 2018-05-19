import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { imgRoutes } from '../../../constants/img_path';
import { getCheckoutList, removeCartItems } from '../../../actions/Checkout';
import { resetVal } from '../../../actions/everyDay';
import trashImg from 'img/site/trash-icon.png';
import nodataImg from 'img/site/nodata.png';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listAfterDel : true
		}
	}

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(getCheckoutList());
	}

	removeCart = (item_id) => {
		const { dispatch } = this.props;
		dispatch(removeCartItems(item_id));
	}

	componentDidUpdate(){
		const { dispatch, removeItems } = this.props;
		const { listAfterDel } = this.state;
		if(removeItems.status===1 && listAfterDel===true){
			this.setState({
				listAfterDel : false
			});
			dispatch(getCheckoutList());
		}
		dispatch(resetVal({ 'userAdded': false }));
	}

	renderTr = (obj) => {
		console.log(">++>>",obj);
		return (
			<tr key={Math.random()}>
				<td><img src={`${imgRoutes.CAMPAIGN_IMG_PATH}${obj.campaign.cover_image}`} alt="" /></td>
				<td>
					{/* <b>{obj.campaign.name}</b><br /> */}
					{obj.campaign.description}
				</td>
				<td>{/*obj.user_name*/}</td>
				<td>{obj.campaign.social_media_platform}</td>
				
				<td>${(obj.campaign.price).toFixed(2)}</td>
				<td>
					<a href="javascript:void(0)" onClick={() => this.removeCart(obj._id)}><img src={trashImg} alt="img" /></a>
				</td>
			</tr>
		);
	}

	render() {
		const { carts } = this.props;
		
		return (
			<div>
				<div className="all-people-head">
					<h3>Total {(carts.status === 1) ? (carts.data).length : 0} products in Cart</h3>
				</div>
				{carts.data === null ? <div className="no_data_found"><img src={nodataImg} /></div> :
				<div className="analytics-body content-box">
					<div className="cart-table">
						<table className="table">
							<thead>
								<tr>
									<th style={{ "width": "14%" }}>Image Preview</th>
									<th style={{ "width": "50%" }}>Text Description</th>
									<th style={{ "width": "20%" }}>Person</th>
									<th style={{"width":"15%"}}>Flatform</th>
									<th style={{ "width": "11%" }}>Price</th>
									<th> </th>
								</tr>
							</thead>
							<tbody>
								{(carts.status === 1) ? carts.data.map((obj, index) => (this.renderTr(obj))) : <tr><td colSpan="6"></td></tr>}
								{/* <tr>
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
								</tr> */}
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
				}
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

export default connect(mapStateToProps)(Cart)
