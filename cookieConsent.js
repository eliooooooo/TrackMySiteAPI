export const cookieConsent = () => {

    const cookieConsentContainer = document.createElement('div');
    cookieConsentContainer.innerHTML = `
        <div class='cookie-consent' style='position: absolute; right: 0; top: 100vh; transform: translateY(-100%); background-color: black; color: white; padding: 15px 30px; width: fit-content;'>
            <svg xmlns="http://www.w3.org/2000/svg" id="cookie-consent-close" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" style="margin-left: auto; margin-right:0; display: block; cursor: pointer;">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <button id='cookie-consent-accept' style='background-color: white; border: 2px solid white; padding: 10px; cursor: pointer;'>Accept</button>
            <button id='cookie-consent-decline' style='background-color: black; color: white; border: none; padding: 10px; border: 2px solid white; cursor: pointer;'>Decline</button>
            <button id='cookie-consent-more' style='background-color: transparent; color: white; border: none; cursor: pointer;'>More options</button>
        </div>
    `;

    const cookieConsentMore = document.createElement('div');
    cookieConsentMore.innerHTML = `
        <div class='cookie-consent-more' style='background-color: black; color: white; padding: 15px 30px; width: fit-content;'>
            <svg xmlns="http://www.w3.org/2000/svg" id="cookie-consent-close-more" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" style="margin-left: auto; margin-right:0; display: block; cursor: pointer;">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            <p>Here are the informations collected :</p>
            <ul>
                <li>First info</li>
                <li>Second info</li>
                <li>Third info</li>
            </ul>
        </div>
    `;

    document.body.appendChild(cookieConsentContainer);
    const closeButton = document.getElementById('cookie-consent-close');
    const acceptButton = document.getElementById('cookie-consent-accept');
    const declineButton = document.getElementById('cookie-consent-decline');
    const moreButton = document.getElementById('cookie-consent-more');

    moreButton.addEventListener('click', () => {
        document.body.appendChild(cookieConsentMore);
        const closeMoreButton = document.getElementById('cookie-consent-close-more');
        closeMoreButton.addEventListener('click', () => {
            document.body.removeChild(cookieConsentMore);
        });
    });
    closeButton.addEventListener('click', () => {
        document.body.removeChild(cookieConsentContainer);
    })
    acceptButton.addEventListener('click', () => {
        document.body.removeChild(cookieConsentContainer);
        localStorage.setItem('cookieConsent', 'accepted');
        return true;
    });
    declineButton.addEventListener('click', () => {
        document.body.removeChild(cookieConsentContainer);
        localStorage.setItem('cookieConsent', 'declined');
        return false;
    });
}