import ZendeskSupport from 'react-native-zendesk-support';
import Config from './config';

export function zendeskInitialize() {
    ZendeskSupport.initialize(Config.ZENDESK_CONFIG);
}

export function zendeskHelpCenter() {
    const customFields = {};
    ZendeskSupport.callSupport(customFields);
}

export function zendeskIdentiy(customerEmail, customerName) {
    const identity = {
        customerEmail,
        customerName
    };
    ZendeskSupport.setupIdentity(identity);
}
