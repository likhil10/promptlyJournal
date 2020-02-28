import Mixpanel from 'react-native-mixpanel';
import Config from './config';

Mixpanel.sharedInstanceWithToken(Config.MIX_PANEL_TOKEN);

// Function to track the events
export function mixpanelTrack(message, email) {
    Mixpanel.identify(email);
    Mixpanel.track(message);
}

// Function to track with properties
export function mixpanelTrackWithProperties(email, message, property) {
    Mixpanel.identify(email);
    Mixpanel.trackWithProperties(message, property);
}

// Function to set properties
export function mixpanelSetProperties(key, email) {
    Mixpanel.identify(email);
    Mixpanel.set(key);
}

// Function to set Subscription price
export function setProductId(productId, email) {
    Mixpanel.identify(email);
    Mixpanel.increment('Total Revenue ($)', productId === 'app499m' ? 4.99 : productId === 'app999m' ? 9.99 : 99.99);
    const today = new Date();
    const date = parseInt(today.getMonth() + 1, 10) < 10 ? `0${parseInt(today.getMonth() + 1, 10)}/${today.getDate()}/${today.getFullYear()}` : `${parseInt(today.getMonth() + 1, 10)}/${today.getDate()}/${today.getFullYear()}`;
    Mixpanel.set({
        'Plan Name': productId === 'app499m' ? 'Starter Monthly' : productId === 'app999m' ? 'Standard Monthly' : 'Standard Yearly',
        'Product Id': productId,
        'Plan Amount': productId === 'app499m' ? '$4.99' : productId === 'app999m' ? '$9.99' : '$99.99',
        'Bought Subscription On': date,
    });
}

// Function to set sign up data
export function setSignupData(data, email) {
    const today = new Date();
    const date = parseInt(today.getMonth() + 1, 10) < 10 ? `0${parseInt(today.getMonth() + 1, 10)}/${today.getDate()}/${today.getFullYear()}` : `${parseInt(today.getMonth() + 1, 10)}/${today.getDate()}/${today.getFullYear()}`;
    Mixpanel.identify(email);

    Mixpanel.set({
        $name: `${data.firstName} ${data.lastName}`,
        'First Name': data.firstName,
        'Last Name': data.lastName,
        'Registered On': date
    });
}

// Function to increment Journal Count
export function incrementJournalCount(email) {
    Mixpanel.identify(email);
    Mixpanel.increment('Number of Journals', 1);
}

// Function to increment Journal Count
export function incrementLoginCount(email) {
    Mixpanel.identify(email);
    Mixpanel.increment('Login', 1);
}

// Function to set email
export function setMail(email) {
    Mixpanel.identify(email);
    Mixpanel.setOnce({ $email: email });
}

