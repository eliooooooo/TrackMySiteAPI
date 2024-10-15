import { sendInfos } from './function.js';
import { cookieConsent } from './cookieConsent.js'

// Send infos only one time per sessions
//if (!sessionStorage.getItem('isFirstConnection')) {
    sendInfos( '1234' );
//    sessionStorage.setItem('isFirstConnection', 'true');
//}



const request = async () => {
    const opt_in = cookieConsent();
    console.log(opt_in);
};

request();


//! beforeunload
//TODO: at client connection, créeate the request, at the unload, save the timestamp. The user time on the website will be calculated from the connection and disconnect timestamp