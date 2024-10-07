import { sendInfos } from './function.js';

// Send infos only one time per sessions
if (!sessionStorage.getItem('isFirstConnection')) {
    sendInfos();
    sessionStorage.setItem('isFirstConnection', 'true');
}



//! beforeunload
//TODO: at client connection, créeate the request, at the unload, save the timestamp. The user time on the website will be calculated from the connection and disconnect timestamp