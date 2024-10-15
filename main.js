import { sendInfos } from './function.js';
import { cookieConsent } from './cookieConsent.js'

// Send infos only one time per sessions
if (!sessionStorage.getItem('isFirstConnection') && localStorage.getItem('cookieConsent') == 'accepted') {
    sendInfos( '1234' );
    sessionStorage.setItem('isFirstConnection', 'true');
}



// Vérifiez si l'utilisateur a déjà donné son consentement
if (!localStorage.getItem('cookieConsent')) {
    cookieConsent();
}


//! beforeunload
//TODO: at client connection, créeate the request, at the unload, save the timestamp. The user time on the website will be calculated from the connection and disconnect timestamp