import { PushNotificationIOS, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Config from '../utility/config';

export function pushNotificationService(props, data) {
    return new Promise((resolve) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister(token) {
                resolve(token.token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification(notification) {
                if (Platform.OS === 'ios') {
                    const message = notification.data ? notification.data : '';
                    const promptid = message.journal.promptid ? message.journal.promptid : '';
                    const id = message.journal.id ? message.journal.id : '';
                    const length = data ? data.length : '';
                    let count = 0;
                    let item = [];
                    const section = message.journal.section ? message.journal.section : '';
                    const subSection = message.journal.subsection ? message.journal.subsection : '';
                    if (message) {
                        for (count = 0; count < length; count += 1) {
                            if (id === data[count]._id) {
                                item = data[count];
                            }
                        }
                        props.navigation.navigate('JournalScreen', {
                            item,
                            section,
                            subSection,
                            count: 1,
                            id,
                            promptid
                        });
                    } else {
                        props.navigation.navigate('DashboardScreenNavigator');
                    }
                } else {
                    const message = JSON.parse(notification.journal);
                    const promptid = message.promptid ? message.promptid : '';
                    const id = message.id ? message.id : '';
                    const length = data ? data.length : '';
                    let count = 0;
                    let item = [];
                    const section = message.section ? message.section : '';
                    const subSection = message.subsection ? message.subsection : '';
                    if (message) {
                        for (count = 0; count < length; count += 1) {
                            if (id === data[count]._id) {
                                item = data[count];
                            }
                        }
                        props.navigation.navigate('JournalScreen', {
                            item,
                            section,
                            subSection,
                            count: 1,
                            id,
                            promptid
                        });
                    } else {
                        props.navigation.navigate('DashboardScreenNavigator');
                    }
                }

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: Config.GCM_SENDER_ID,

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });
        // PushNotificationIOS.setApplicationIconBadgeNumber(0);
    });
}
