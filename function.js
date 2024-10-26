/**
 * Define the params and send the requests to the API
 * 
 * @param { params } params 
 */
export const sendInfos = ( apiKey, { includePage = true, includeUtms = true , includeUserAgent = true, includePlatform = true, includeLanguage = true, includeGeolocation = true } = {}) => {
    let page = "";
    if (includePage) {
        page = window.location.pathname;
    }
    
    let query = window.location.search;
    let urlParams = new URLSearchParams(query);
    
    let source = "";
    let campaign = "";
    let content = "";
    let term = "";
    let medium = "";
    
    if (includeUtms) {
        source = urlParams.get("utm_source");
        campaign = urlParams.get("utm_campaign");
        content = urlParams.get("utm_content");
        term = urlParams.get("utm_term");
        medium = urlParams.get("utm_medium");
    }
    
    let user = {};

    if (includeUserAgent) {
        user.userAgent = navigator.userAgent;
    }
    if (includePlatform) {
        user.platform = navigator.platform;
    }
    if (includeLanguage) {
        user.language = navigator.language;
    }

    const sendRequest = () => {
        fetch('http://127.0.0.1:3000/log-connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'x-origin': window.location.origin
            },
            body: JSON.stringify({ 
                page: page,
                source: source,
                campaign: campaign,
                content: content,
                term: term,
                medium: medium,
                user: user
            })
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    if (includeGeolocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            user.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            sendRequest();
        }, error => {
            console.error('Geolocation error:', error);
            sendRequest();
        });
    } else {
        sendRequest();
    }
};