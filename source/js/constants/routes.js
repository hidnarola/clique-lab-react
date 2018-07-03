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
    CAMPAIGNS:`${publicPath}campaigns`,
    CAMPAIGN_ACTIVE:`${publicPath}campaigns/active_list`,
    CAMPAIGN_FUTURE:`${publicPath}campaigns/future_list`,
    CAMPAIGN_PAST:`${publicPath}campaigns/past_list`,
    CAMPAIGN_INSPIRED_SUB: `${publicPath}campaigns/inspired_submission`,
    CAMPAIGN_PURCHASED_POSTS: `${publicPath}campaigns/purchased_posts`,

    // Analytics
    ANALYTICS:`${publicPath}analytics`,
    ANALYTICS_STATS:`${publicPath}analytics/stats`,
    ANALYTICS_DEMOGRAPHICS:`${publicPath}analytics/demographics`,

    EVERYDAYPEOPLE:`${publicPath}every-day-people`,

    // Groups
    LISTGROUPS:`${publicPath}groups`,

    //Calendar
    CALENDAR:`${publicPath}calendar`,

    //My Profile
    MY_PROFILE:`${ publicPath }profile`,
    PARTNERSHIP_PROGRAM:`${ publicPath }partnership_program`,
    WALLET:`${ publicPath }wallet`,
    PERMISSION:`${ publicPath }permission`,

    //Payment
    MY_CART:`${ publicPath }cart`,
    CHECKOUT:`${ publicPath }checkout`,

    //Admin Module
    ADMIN_LOGIN: `${ publicPath }admin`,
    ADMIN_DASHBOARD: `${ publicPath }admin/dashboard`,
};
