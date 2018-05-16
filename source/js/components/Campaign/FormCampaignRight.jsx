import React,{Component} from 'react';
import { connect } from 'react-redux';
import voca from 'voca';
import dummyImg from 'img/site/img-06.jpg';
import coverDummyImg from 'img/site/cover_dummy.jpg';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import instaImg from 'img/site/instagram.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';

class FormCampaignRight extends Component{
    
    constructor(props){
        super(props);
        this.renderImages = this.renderImages.bind(this);
    }

    dummyInspirationalImages(){
        return(
            <ul className="custom_scrollbar">
                <li><a href="javascript:void(0)" style={{"marginRight": "2px"}}><img src={dummyImg} alt=""/></a></li>
                <li><a href="javascript:void(0)" style={{"marginRight": "2px"}}><img src={dummyImg} alt=""/></a></li>
                <li><a href="javascript:void(0)" style={{"marginRight": "2px"}}><img src={dummyImg} alt=""/></a></li>
            </ul>
        );
    }

    renderImages(obj,index){
        return (
            <li key={Math.random()}>
                <a >
                    <img src={obj} alt="" width="135px" height="80px" />
                </a>
            </li>    
        );
    }

    render(){
        
        let { wizardCampaignData } = this.props;
        let {industryName, mediaFormat,hashTagStr,atTagStr,imgStr} = '';
        let imgArr = [];
        let mediaImg = {
            'facebook': fbImg,
            'linkedin': linkedImg,
            'instagram': instaImg,
            'pinterest': pinImg,
            'twitter': twitterImg,
        };

        if(wizardCampaignData.values !== undefined){
            
            if(wizardCampaignData.values.industryName){
                industryName = wizardCampaignData.values.industryName.value;
            }

            if(wizardCampaignData.values.media_format){
                mediaFormat = wizardCampaignData.values.media_format.value;
            }
            
            if(wizardCampaignData.values.tagHash){
                wizardCampaignData.values.tagHash.map((obj,index) => {
                    if(hashTagStr===undefined){
                        hashTagStr = '';
                    }
                    hashTagStr += '#'+obj.value+' , ';
                });
            }

            if(wizardCampaignData.values.tagAt){
                wizardCampaignData.values.tagAt.map((obj,index) => {
                    if(atTagStr===undefined){
                        atTagStr = '';
                    }
                    atTagStr += '@'+obj.value+' , ';
                });
            }

            if(wizardCampaignData.values.images){
                if((wizardCampaignData.values.images).length > 0){
                    imgStr = wizardCampaignData.values.images[0].preview
                }else{
                    imgStr = '';
                }
                
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
                    {
                        (wizardCampaignData.values!== undefined && imgStr!==undefined) ? 
                            <img src={imgStr} alt="" />
                        :
                            <img src={coverDummyImg} alt="" />
                    }
                </div>
                <div className="create-campaign-r-summer d-flex">
                    <h4>
                        <b>{(wizardCampaignData.values !== undefined) ? wizardCampaignData.values.campaignName:'' }</b><br/><br />
                        <a style={{"fontSize":"11px","fontWeight":"600"}}> <img src={mediaImg[`${industryName}`]} alt="" style={{"margin-top":"-2px","width":"15px"}}/> {industryName}</a>
                    </h4>
                    <h5>${(wizardCampaignData.values !== undefined) ? wizardCampaignData.values.how_much:'' }</h5>
                </div>
                <div className="create-campaign-r-responses">
                    <p style={{"word-wrap": "break-word","min-height": "10em"}}>{(wizardCampaignData.values !== undefined) ? voca.truncate(wizardCampaignData.values.short_desc, 200):'' } </p>
                    <h6><i className="fa fa-heart"></i> 0 Responses</h6>
                </div>
                <div className="create-campaign-r-media-format">
                    <ul>
                        <li>
                            <a><b>Media Format</b></a>
                            <p>{mediaFormat}</p>                            
                        </li>
                        <li>
                            <a><b>What not to do?</b></a>
                            <p>Feature Competitors products.</p>
                        </li>
                        <li>
                            <a><b>Use @tags</b></a>
                            <p>{voca.trimRight(atTagStr, ', ')}</p>
                        </li>
                        <li>
                            <a><b>Use #tags</b></a>
                            <p>{voca.trimRight(hashTagStr, ', ')}</p>
                        </li>
                    </ul>
                </div>
                <div className="inspirations-img">
                    <h3><b>Inspirational Images</b></h3>
                    {
                        (wizardCampaignData.values !== undefined && imgArr.length > 0) ? 
                            <ul className="custom_scrollbar">
                                { imgArr.map((obj,index) => (this.renderImages(obj)) ) }
                            </ul>
                        :
                            this.dummyInspirationalImages()
                    }                    
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    wizardCampaignData: state.form.wizardCampaign,
}))(FormCampaignRight);