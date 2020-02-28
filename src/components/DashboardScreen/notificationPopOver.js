import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import ToggleSwitch from 'toggle-switch-react-native';
import Popover from 'react-native-popover-view';
import Constant from '../../utility/constants';
import Icon from '../../utility/iconConstant';
import commonStyle from '../Common/commonStyle';
import styles from './dashboardStyle';


export default class NotificationPopOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popOverToggle: this.props.item ? this.props.item.isPushNotificationSet : false,
        };
    }

    callToAction = (action) => {
        const { item, closeOptionsPopover } = this.props;
        const { popOverToggle } = this.state;
        switch (action) {
        case 'EDIT': {
            this.props.navigateToEditJournal(item);
            closeOptionsPopover();
            break;
        }
        case 'DELETE': {
            this.props.openDeleteJournalModal(item._id);
            closeOptionsPopover();
            break;
        }
        case 'NOTIFICATION': {
            this.setState(
                { popOverToggle: !popOverToggle },
                () => {
                    setTimeout(() => {
                        this.props.changeNotificationStatus(item, !item.isPushNotificationSet);
                        closeOptionsPopover();
                    }, 1000);
                }
            );
            break;
        }
        default: {
            closeOptionsPopover();
        }
        }
    };

    render() {
        const {
            item, isVisible, touchable, closeOptionsPopover
        } = this.props;
        const { popOverToggle } = this.state;
        return (
            <Popover
                isVisible={isVisible}
                fromView={touchable}
                showBackground={false}
                popoverStyle={{ backgroundColor: Constant.TEXT_COLOR, }}
                arrowStyle={{ backgroundColor: Constant.TEXT_COLOR }}
                onClose={closeOptionsPopover}
            >
                <View style={[commonStyle.padding10, commonStyle.flexRow, {
                    alignItems: 'center',
                    backgroundColor: Constant.TEXT_COLOR,
                }]}
                >
                    {
                        (item.journalType === 'childhood' && !(item.setting.childhood.childBirthDate)) &&
                        <TouchableOpacity onPress={() => this.callToAction('EDIT')} style={{ marginTop: 15 }} >
                            <Image
                                source={Icon.EDIT_ICON}
                                style={styles.optionsIconStyle}
                            />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => this.callToAction('DELETE')} style={{ marginTop: 20 }}>
                        <Image
                            source={Icon.TRASH_ICON}
                            style={styles.deleteIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.optionsTextStyle}>NOTIFICATION</Text>
                        <ToggleSwitch
                            isOn={popOverToggle}
                            icon={<Text style={styles.iconTextStyle} >{popOverToggle ? 'ON' : 'OFF'}</Text>}
                            onColor="#ada3a5"
                            offColor="#ada3a5"
                            size="large"
                            onToggle={() => this.callToAction('NOTIFICATION')}
                        />
                    </View>
                </View>
            </Popover>
        );
    }
}

NotificationPopOver.propTypes = {
    closeOptionsPopover: PropTypes.func.isRequired,
    navigateToEditJournal: PropTypes.func.isRequired,
    openDeleteJournalModal: PropTypes.func.isRequired,
    changeNotificationStatus: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    touchable: PropTypes.object,
    item: PropTypes.object.isRequired,
};
NotificationPopOver.defaultProps = {
    touchable: {},
};
