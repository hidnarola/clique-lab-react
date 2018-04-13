export const publicPath = '/';

export const routeCodes = {
    HOME: publicPath,
    PEOPLE: `${ publicPath }people`,
    
    DASHBOARD:`${ publicPath }dashboard`,

    SELECT_INDUSTRY:`${ publicPath }select_indutry`,

    LOGIN: `${ publicPath }login`,
    FORGOT: `${ publicPath }forgot_password`,
    RESET: `${ publicPath }reset_password`,
    REGISTER: `${ publicPath }register`,
    AFTERREGISTER: `${ publicPath }after-register`,

    // Campaign
    CAMPAIGN:`${publicPath}campaign`,
    CAMPAIGN_ACTIVE:`${publicPath}campaign/active_list`,
    CAMPAIGN_FUTURE:`${publicPath}campaign/future_list`,
    CAMPAIGN_PAST:`${publicPath}campaign/past_list`,

    EVERYDAYPEOPLE:`${publicPath}every-day-people`,

    // Groups
    LISTGROUPS:`${publicPath}groups`,

    CALENDAR:`${publicPath}calendar`,

    //My Profile
    MY_PROFILE:`${ publicPath }profile`,
    PARTNERSHIP_PROGRAM:`${ publicPath }partnership_program`,
    WALLET:`${ publicPath }wallet`,
    PERMISSION:`${ publicPath }permission`,
};
