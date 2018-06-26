import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { imgRoutes } from '../../../constants/img_path';
// import { getCheckoutList, removeCartItems } from '../../../actions/Checkout';
import { getCheckoutList, removeCartItems, modifyStatusReset } from '../../../actions/Checkout';

import { resetVal } from '../../../actions/Checkout';
import trashImg from 'img/site/trash-icon.png';
import nodataImg from 'img/site/no_data/08.png';
import noCampaignImg from 'img/site/no_data/no_campaign.png';

import { ToastContainer, toast, Slide } from 'react-toastify';
import '../../../../css/campaign/ReactToastify.css';

class Cart extends React.Component {
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
		this.setState({ listAfterDel: true });
	}

	componentDidUpdate() {
		const { dispatch, removeItems, modifyStatusPurchase } = this.props;
		const { listAfterDel } = this.state;
		if (removeItems.status === 1 && listAfterDel === true) {
			dispatch(getCheckoutList());
			dispatch(resetVal({ 'removeCart': false }));
			this.setState({ listAfterDel: false });
		}

		if (modifyStatusPurchase === true) {
			toast.success('Campaign has been added in cart', {
				className: 'success-custom-tostify'
			});

			dispatch(modifyStatusReset());
		}

	}

	// renderTr = (obj) => {
	// 	let applied_post_img = '';
	//     if(obj.applied_post.image==undefined){
	//         applied_post_img = noCampaignImg;
	//     }else{
	//         applied_post_img = imgRoutes.CAMPAIGN_POST_IMG_PATH + obj.applied_post.image;
	//     }
	// 	return (
	// 		<tr key={Math.random()}>
	// 			<td><img src={applied_post_img} alt="" /></td>
	// 			<td>
	// 				{/* <b>{obj.campaign.name}</b><br /> */}
	// 				{obj.applied_post.desription}
	// 			</td>
	// 			<td>{obj.user.name}</td>
	// 			{/* <td>{(obj.campaign.social_media_platform).toLowerCase()}</td> */}
	// 			<td>{(obj.campaign.social_media_platform.charAt(0).toUpperCase() + obj.campaign.social_media_platform.slice(1))}</td>
	// 			<td>${(obj.campaign.price).toFixed(2)}</td>
	// 			<td>
	// 				<a href="javascript:void(0)" onClick={() => this.removeCart(obj._id)}><img src={trashImg} alt="img" /></a>
	// 			</td>
	// 		</tr>
	// 	);
	// }

	renderTr = (obj) => {
		// let applied_post_img = '';
		// let inspire_post_img = '';
		let post_img = '';

		if (obj.applied_post) {
			if (obj.applied_post.image == undefined) {
				post_img= noCampaignImg;
			} else {
				post_img = imgRoutes.CAMPAIGN_POST_IMG_PATH + obj.applied_post.image;
			}
		}
		else if(obj.inspired_post)
		{
			if (obj.inspired_post.image == undefined) {
				post_img = noCampaignImg;
			} else {
				post_img = imgRoutes.CAMPAIGN_INSPIRED_IMG_PATH + obj.inspired_post.image;
			}
		}
		// if(obj.applied_post.image==undefined){
		//     applied_post_img = noCampaignImg;
		// }else{
		//     applied_post_img = imgRoutes.CAMPAIGN_POST_IMG_PATH + obj.applied_post.image;
		// }
		return (
			<tr key={Math.random()}>
				{/* <td><img src={applied_post_img} alt="" /></td> */}
				<td><img src={post_img} alt="" /></td>
				<td>
					{/* <b>{obj.campaign.name}</b><br /> */}
					{(obj.applied_post) ? obj.applied_post.desription : obj.inspired_post.text }
				</td>
				<td>{obj.user.name}</td>
				<td>
					{
						obj.applied_post ? (obj.campaign.social_media_platform.charAt(0).toUpperCase() + obj.campaign.social_media_platform.slice(1)):
						obj.inspired_post.social_media_platform.charAt(0).toUpperCase() +obj.inspired_post.social_media_platform.slice(1)
					}
				</td>
				<td>${obj.applied_post ? (obj.campaign.price).toFixed(2) : (obj.inspired_post.price).toFixed(2) }</td>
				<td>
					<a href="javascript:void(0)" onClick={() => this.removeCart(obj._id)}><img src={trashImg} alt="img" /></a>
				</td>
			</tr>
		);
	}

	render() {
		const { carts, loading } = this.props;

		// if (loading )  {
		//     return (
		//         <div className="loader"></div>
		//     )
		// }

		return (
			<div>
				{(carts.status === 1 && (carts.data).length > 0) ?
					<div className="all-people-head">
						{/* <h3>Total {(carts.status === 1 && (carts.data).length > 0 ) ? (carts.data).length : 0} products in Cart</h3> */}
						<h3>Total {(carts.data).length} products in Cart</h3>
					</div>
					:
					''
				}
				{/* {carts.data === null ? <div className="no_data_found"></div> : */}
				{carts.data === null ?
					<div className="no_data_found">
						<img src={nodataImg} />
						<p>No product in cart.</p>
					</div> :
					<div className="analytics-body content-box">
						<div className="cart-table">
							<table className="table">
								<thead>
									<tr>
										<th style={{ "width": "13%" }}>Image Preview</th>
										<th style={{ "width": "42%" }}>Text Description</th>
										<th style={{ "width": "18%" }}>Person</th>
										<th style={{ "width": "12%" }}>Flatform</th>
										<th style={{ "width": "13%" }}>Price</th>
										<th style={{ "width": "5%" }}> </th>
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
		removeItems: checkout.get('removeItems'),

		modifyStatusPurchase: checkout.get('modify_status_purchase')
	}
}

export default connect(mapStateToProps)(Cart)
