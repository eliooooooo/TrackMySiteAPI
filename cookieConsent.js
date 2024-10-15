export const cookieConsent = () => {

    const cookieConsentContainer = document.createElement('div');
    cookieConsentContainer.innerHTML = `
        <div class='cookie-consent'>
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <button id='cookie-consent-accept'>Accept</button>
            <button id='cookie-consent-decline'>Decline</button>
        </div>
    `;

    document.body.appendChild(cookieConsentContainer);

    const acceptButton = document.getElementById('cookie-consent-accept');
    const declineButton = document.getElementById('cookie-consent-decline');
    acceptButton.addEventListener('click', () => {
        document.body.removeChild(cookieConsentContainer);
        return true;
    });
    declineButton.addEventListener('click', () => {
        document.body.removeChild(cookieConsentContainer);
        return false;
    });
}