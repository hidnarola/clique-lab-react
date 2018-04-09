import React,{Component} from 'react';
import { connect } from 'react-redux';
import voca from 'voca';

class FormCampaignRight extends Component{
    
    constructor(props){
        super(props);
        this.renderImages = this.renderImages.bind(this);
    }

    renderImages(obj,index){
        return (
            <li key={Math.random()}>
                <a >
                    <img src={obj} alt="" width="100px" height="100px" />
                </a>
            </li>    
        );
    }

    render(){
        
        let { wizardCampaignData } = this.props;        
        let {mediaFormat,hashTagStr,atTagStr,imgStr} = '';
        let imgArr = []; 

        if(wizardCampaignData.values !== undefined){

            if(wizardCampaignData.values.media_format){
                let mediaFormat = wizardCampaignData.values.media_format.value;
            }
            
            if(wizardCampaignData.values.tagHash){
                wizardCampaignData.values.tagHash.map((obj,index) => {                    
                    hashTagStr += '#'+obj.value+' , ';
                });
            }

            if(wizardCampaignData.values.tagAt){
                wizardCampaignData.values.tagAt.map((obj,index) => {                    
                    atTagStr += '@'+obj.value+' , ';
                });
            }

            if(wizardCampaignData.values.images){
                imgStr = wizardCampaignData.values.images[0].preview
            }

            if(wizardCampaignData.values.imagesNew){                
                for(let i=0; i<Object.keys(wizardCampaignData.values.imagesNew).length; i++){                    
                    imgArr.push(wizardCampaignData.values.imagesNew[i].preview)
                }                                
            }
        }        

        return(
            <div className="create-campaign-r">
                <div className="create-campaign-r-head">
                    <h4>Campaign Details</h4>
                </div>
                <div className="create-campaign-r-img">
                    {(wizardCampaignData.values !== undefined) ? <img src={imgStr} alt="" />:'' }
                </div>
                <div className="create-campaign-r-summer d-flex">
                    <h4>{(wizardCampaignData.values !== undefined) ? wizardCampaignData.values.campaignName:'' }
                        <a >
                            {/* <img src="images/facebook.jpg" alt="" /> */}
                        </a>
                    </h4>
                    <h5>${(wizardCampaignData.values !== undefined) ? wizardCampaignData.values.how_much:'' }</h5>
                </div>
                <div className="create-campaign-r-responses">
                    <p>{(wizardCampaignData.values !== undefined) ? voca.truncate(wizardCampaignData.values.short_desc, 200):'' } </p>
                    <h6>
                        <i className="fa fa-heart"></i> 0 Responses</h6>
                </div>
                <div className="create-campaign-r-media-format">
                    <ul>
                        <li>
                            <a >Media Format</a>
                            <p>{mediaFormat}</p>                            
                        </li>
                        <li>
                            <a >What not to do?</a>
                            <p>Feature Competitors products.</p>
                        </li>
                        <li>
                            <a >Use @tags</a>
                            <p>{voca.trimRight(atTagStr, ', ')}</p>
                        </li>
                        <li>
                            <a >Use #tags</a>
                            <p>{voca.trimRight(hashTagStr, ', ')}</p>
                        </li>
                    </ul>
                </div>
                <div className="inspirations-img">
                    <h3>Inspirational Images</h3>
                    <ul>
                        {(wizardCampaignData.values !== undefined) ? imgArr.map((obj,index) => (this.renderImages(obj)) ):'' }
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    wizardCampaignData: state.form.wizardCampaign,
}))(FormCampaignRight);