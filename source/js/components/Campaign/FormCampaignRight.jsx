import React,{Component} from 'react';

class FormCampaignRight extends Component{
    render(){
        return(
            <div className="create-campaign-r">
                <div className="create-campaign-r-head">
                    <h4>Campaign Details</h4>
                </div>
                <div className="create-campaign-r-img">
                    {/* <img src="images/img-05.jpg" alt="" /> */}
                </div>
                <div className="create-campaign-r-summer d-flex">
                    <h4>The Grocer - Summer
                        <a href="">
                            {/* <img src="images/facebook.jpg" alt="" /> */}
                        </a>
                    </h4>
                    <h5>$69.94</h5>
                </div>
                <div className="create-campaign-r-responses">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. </p>
                    <h6>
                        <i className="fa fa-heart"></i> 0 Responses</h6>
                </div>
                <div className="create-campaign-r-media-format">
                    <ul>
                        <li>
                            <a href="">Media Format</a>
                            <p>Photograph</p>
                        </li>
                        <li>
                            <a href="">What not to do?</a>
                            <p>Feature Competitors products.</p>
                        </li>
                        <li>
                            <a href="">Use @tags</a>
                            <p>@TheGrocer</p>
                        </li>
                        <li>
                            <a href="">Use #tags</a>
                            <p>#thegrocer</p>
                        </li>
                    </ul>
                </div>
                <div className="inspirations-img">
                    <h3>Inspirational Images</h3>
                    <ul>
                        <li>
                            <a href="">
                                {/* <img src="images/img-06.jpg" alt="" /> */}
                            </a>
                        </li>
                        <li>
                            <a href="">
                                {/* <img src="images/img-06.jpg" alt="" /> */}
                            </a>
                        </li>
                        <li>
                            <a href="">
                                {/* <img src="images/img-06.jpg" alt="" /> */}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default FormCampaignRight;